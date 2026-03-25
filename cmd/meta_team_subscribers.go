package cmd

import (
	"context"
	"log/slog"
	"strings"

	"github.com/google/uuid"

	"github.com/nextlevelbuilder/goclaw/internal/bus"
	"github.com/nextlevelbuilder/goclaw/internal/store"
	"github.com/nextlevelbuilder/goclaw/pkg/protocol"
)

// MetaTeamName is the well-known name used to identify the meta-team.
const MetaTeamName = "Thiên Long Hội"

// wireMetaTeamSubscribers registers bus subscribers for meta-team orchestration:
// 1. Auto-add: when a new team is created, add its lead to the meta-team.
// 2. Task cascade: when a meta-team task is assigned, create a sub-task in the lead's team.
// 3. Aggregated completion: when a sub-task completes, check if all sub-tasks are done.
func wireMetaTeamSubscribers(
	msgBus *bus.MessageBus,
	stores *store.Stores,
) {
	if stores.Teams == nil || stores.Agents == nil {
		return
	}

	// --- Subscriber 1: Auto-add new team leads to meta-team ---
	msgBus.Subscribe("meta-team.auto-add", func(evt bus.Event) {
		if evt.Name != protocol.EventTeamCreated {
			return
		}
		payload, ok := evt.Payload.(protocol.TeamCreatedPayload)
		if !ok {
			return
		}

		ctx := store.WithTenantID(context.Background(), evt.TenantID)
		metaTeam := findMetaTeam(ctx, stores.Teams)
		if metaTeam == nil {
			return // no meta-team configured
		}

		// Don't self-reference
		if payload.TeamID == metaTeam.ID.String() {
			return
		}

		leadAgent, err := stores.Agents.GetByKey(ctx, payload.LeadAgentKey)
		if err != nil {
			slog.Warn("meta-team.auto-add: cannot resolve lead", "key", payload.LeadAgentKey, "err", err)
			return
		}

		// Check if already a member (idempotent)
		members, err := stores.Teams.ListMembers(ctx, metaTeam.ID)
		if err == nil {
			for _, m := range members {
				if m.AgentID == leadAgent.ID {
					slog.Debug("meta-team.auto-add: lead already member", "key", payload.LeadAgentKey)
					return
				}
			}
		}

		if err := stores.Teams.AddMember(ctx, metaTeam.ID, leadAgent.ID, store.TeamRoleMember); err != nil {
			slog.Warn("meta-team.auto-add: failed to add member", "key", payload.LeadAgentKey, "err", err)
			return
		}

		// Create delegation link: meta-lead → new lead
		if stores.AgentLinks != nil {
			_ = stores.AgentLinks.CreateLink(ctx, &store.AgentLinkData{
				SourceAgentID: metaTeam.LeadAgentID,
				TargetAgentID: leadAgent.ID,
				Direction:     "outbound",
				TeamID:        &metaTeam.ID,
				Description:   "auto-created by meta-team",
				MaxConcurrent: 3,
				Status:        "active",
				CreatedBy:     "system",
			})
		}

		slog.Info("meta-team.auto-add: added team lead",
			"key", payload.LeadAgentKey,
			"team", payload.TeamName,
			"meta_team", metaTeam.Name,
		)
	})

	// --- Subscriber 2: Aggregated completion ---
	// When a sub-task completes, check if ALL sub-tasks for its meta-task are done.
	if stores.MetaTaskLinks != nil {
		msgBus.Subscribe("meta-team.aggregate-completion", func(evt bus.Event) {
			if evt.Name != protocol.EventTeamTaskCompleted {
				return
			}
			payload, ok := evt.Payload.(protocol.TeamTaskEventPayload)
			if !ok {
				return
			}

			subTaskID, err := uuid.Parse(payload.TaskID)
			if err != nil {
				return
			}

			ctx := store.WithTenantID(context.Background(), evt.TenantID)

			// Is this sub-task part of a meta-task?
			link, err := stores.MetaTaskLinks.GetLinkBySubTask(ctx, subTaskID)
			if err != nil || link == nil {
				return // not a cascaded sub-task
			}

			// Update this link's status
			if err := stores.MetaTaskLinks.UpdateLinkStatus(ctx, subTaskID, store.TeamTaskStatusCompleted); err != nil {
				slog.Warn("meta-team.aggregate: failed to update link status", "sub_task_id", subTaskID, "err", err)
				return
			}

			// Check if ALL sub-tasks for this meta-task are complete
			allDone, err := stores.MetaTaskLinks.AreAllSubTasksComplete(ctx, link.MetaTaskID)
			if err != nil {
				slog.Warn("meta-team.aggregate: check failed", "meta_task_id", link.MetaTaskID, "err", err)
				return
			}

			if !allDone {
				slog.Info("meta-team.aggregate: sub-task completed, waiting for others",
					"sub_task_id", subTaskID,
					"meta_task_id", link.MetaTaskID,
				)
				return
			}

			// All sub-tasks done — aggregate results and complete meta-task
			links, err := stores.MetaTaskLinks.ListLinksByMetaTask(ctx, link.MetaTaskID)
			if err != nil {
				return
			}

			// Collect sub-task IDs for result aggregation
			subTaskIDs := make([]uuid.UUID, len(links))
			for i, l := range links {
				subTaskIDs[i] = l.SubTaskID
			}
			subTasks, err := stores.Teams.GetTasksByIDs(ctx, subTaskIDs)
			if err != nil {
				slog.Warn("meta-team.aggregate: failed to fetch sub-tasks", "err", err)
				return
			}

			// Build aggregated result
			var resultParts []string
			for _, st := range subTasks {
				if st.Result != nil && *st.Result != "" {
					resultParts = append(resultParts, *st.Result)
				}
			}
			aggregatedResult := strings.Join(resultParts, "\n\n---\n\n")
			if len(aggregatedResult) > 100_000 {
				aggregatedResult = aggregatedResult[:100_000] + "\n[truncated]"
			}

			// Find meta-task's team
			metaTask, err := stores.Teams.GetTask(ctx, link.MetaTaskID)
			if err != nil || metaTask == nil {
				return
			}

			if err := stores.Teams.CompleteTask(ctx, link.MetaTaskID, metaTask.TeamID, aggregatedResult); err != nil {
				slog.Warn("meta-team.aggregate: failed to complete meta-task", "meta_task_id", link.MetaTaskID, "err", err)
				return
			}

			slog.Info("meta-team.aggregate: meta-task auto-completed",
				"meta_task_id", link.MetaTaskID,
				"sub_tasks", len(links),
			)
		})

		// --- Subscriber 3: Propagate failure ---
		msgBus.Subscribe("meta-team.propagate-failure", func(evt bus.Event) {
			if evt.Name != protocol.EventTeamTaskFailed {
				return
			}
			payload, ok := evt.Payload.(protocol.TeamTaskEventPayload)
			if !ok {
				return
			}

			subTaskID, err := uuid.Parse(payload.TaskID)
			if err != nil {
				return
			}

			ctx := store.WithTenantID(context.Background(), evt.TenantID)

			link, err := stores.MetaTaskLinks.GetLinkBySubTask(ctx, subTaskID)
			if err != nil || link == nil {
				return
			}

			// Update link status to failed
			if err := stores.MetaTaskLinks.UpdateLinkStatus(ctx, subTaskID, store.TeamTaskStatusFailed); err != nil {
				slog.Warn("meta-team.propagate-failure: update link failed", "sub_task_id", subTaskID, "err", err)
			}

			slog.Warn("meta-team.propagate-failure: sub-task failed",
				"sub_task_id", subTaskID,
				"meta_task_id", link.MetaTaskID,
				"reason", payload.Reason,
			)
		})
	}

	slog.Info("meta-team subscribers wired",
		"auto_add", true,
		"aggregation", stores.MetaTaskLinks != nil,
	)
}

// findMetaTeam locates the meta-team by its well-known name.
func findMetaTeam(ctx context.Context, ts store.TeamCRUDStore) *store.TeamData {
	teams, err := ts.ListTeams(ctx)
	if err != nil {
		return nil
	}
	for _, t := range teams {
		if t.Name == MetaTeamName && t.Status == store.TeamStatusActive {
			return &t
		}
	}
	return nil
}
