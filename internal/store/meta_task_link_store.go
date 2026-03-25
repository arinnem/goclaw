package store

import (
	"context"
	"time"

	"github.com/google/uuid"
)

// MetaTaskLinkData represents a link between a meta-team task and a sub-task
// in a sub-team. One meta-task can have N sub-tasks across M teams.
type MetaTaskLinkData struct {
	ID         uuid.UUID `json:"id"`
	MetaTaskID uuid.UUID `json:"meta_task_id"`
	SubTaskID  uuid.UUID `json:"sub_task_id"`
	SubTeamID  uuid.UUID `json:"sub_team_id"`
	Status     string    `json:"status"`
	CreatedAt  time.Time `json:"created_at"`
}

// MetaTaskLinkStore manages cross-team task fan-out links for meta-team orchestration.
type MetaTaskLinkStore interface {
	// CreateLink inserts a new meta-task → sub-task link.
	CreateLink(ctx context.Context, link *MetaTaskLinkData) error

	// UpdateLinkStatus updates the status of a link by sub_task_id.
	UpdateLinkStatus(ctx context.Context, subTaskID uuid.UUID, status string) error

	// ListLinksByMetaTask returns all links for a given meta-task.
	ListLinksByMetaTask(ctx context.Context, metaTaskID uuid.UUID) ([]MetaTaskLinkData, error)

	// GetLinkBySubTask returns the link for a given sub-task (if it exists).
	GetLinkBySubTask(ctx context.Context, subTaskID uuid.UUID) (*MetaTaskLinkData, error)

	// AreAllSubTasksComplete checks whether ALL sub-tasks for a meta-task have status "completed".
	AreAllSubTasksComplete(ctx context.Context, metaTaskID uuid.UUID) (bool, error)
}
