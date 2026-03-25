package agent

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"

	"github.com/nextlevelbuilder/goclaw/internal/bootstrap"
	"github.com/nextlevelbuilder/goclaw/internal/config"
	"github.com/nextlevelbuilder/goclaw/internal/store"
	"github.com/nextlevelbuilder/goclaw/internal/tools"
)

// contextSetupResult holds the outputs of injectContext that are needed by the main loop.
type contextSetupResult struct {
	ctx                  context.Context
	resolvedTeamSettings json.RawMessage
}

// injectContext enriches the context with agent, tenant, user, workspace, and tool-level
// values needed by the agent loop and tool execution. Also runs input guard and message
// truncation. Returns error only if input guard blocks the message.
func (l *Loop) injectContext(ctx context.Context, req *RunRequest) (contextSetupResult, error) {
	// Inject agent UUID + key into context for tool routing
	if l.agentUUID != uuid.Nil {
		ctx = store.WithAgentID(ctx, l.agentUUID)
	}
	if l.id != "" {
		ctx = store.WithAgentKey(ctx, l.id)
	}
	// Inject tenant into context for tool-level tenant scoping (spawn, MCP, etc.)
	if l.tenantID != uuid.Nil {
		ctx = store.WithTenantID(ctx, l.tenantID)
	}
	// Inject user ID into context for per-user scoping (memory, context files, etc.)
	if req.UserID != "" {
		ctx = store.WithUserID(ctx, req.UserID)
	}
	// Inject agent type into context for interceptor routing
	if l.agentType != "" {
		ctx = store.WithAgentType(ctx, l.agentType)
	}
	// Inject self-evolve flag for predefined agents that can update SOUL.md
	if l.selfEvolve {
		ctx = store.WithSelfEvolve(ctx, true)
	}
	// Inject original sender ID for group file writer permission checks
	if req.SenderID != "" {
		ctx = store.WithSenderID(ctx, req.SenderID)
	}
	// Inject global builtin tool settings for media tools (provider chain)
	if l.builtinToolSettings != nil {
		ctx = tools.WithBuiltinToolSettings(ctx, l.builtinToolSettings)
	}
	// Inject channel type into context for tools (e.g. message tool needs it for Zalo group routing)
	if req.ChannelType != "" {
		ctx = tools.WithToolChannelType(ctx, req.ChannelType)
	}
	// Inject per-agent overrides from DB so tools honor per-agent settings.
	if l.restrictToWs != nil {
		ctx = tools.WithRestrictToWorkspace(ctx, *l.restrictToWs)
	}
	if l.subagentsCfg != nil {
		ctx = tools.WithSubagentConfig(ctx, l.subagentsCfg)
	}
	// Pass the agent's model and provider so subagents inherit the correct combo.
	if l.model != "" {
		ctx = tools.WithParentModel(ctx, l.model)
	}
	if l.provider != nil {
		ctx = tools.WithParentProvider(ctx, l.provider.Name())
	}
	if l.memoryCfg != nil {
		ctx = tools.WithMemoryConfig(ctx, l.memoryCfg)
	}
	if l.sandboxCfg != nil {
		ctx = tools.WithSandboxConfig(ctx, l.sandboxCfg)
	}
	if l.shellDenyGroups != nil {
		ctx = store.WithShellDenyGroups(ctx, l.shellDenyGroups)
	}

	// Workspace scope propagation (delegation origin → workspace tools).
	if req.WorkspaceChannel != "" {
		ctx = tools.WithWorkspaceChannel(ctx, req.WorkspaceChannel)
	}
	if req.WorkspaceChatID != "" {
		ctx = tools.WithWorkspaceChatID(ctx, req.WorkspaceChatID)
	}
	if req.TeamTaskID != "" {
		ctx = tools.WithTeamTaskID(ctx, req.TeamTaskID)
	}

	// Per-user workspace isolation.
	// Workspace path comes from user_agent_profiles (includes channel segment
	// for cross-channel isolation). Cached in userWorkspaces to avoid repeated DB queries.
	isTeamSession := bootstrap.IsTeamSession(req.SessionKey)
	if l.workspace != "" && req.UserID != "" {
		cachedWs, loaded := l.userWorkspaces.Load(req.UserID)
		if !loaded {
			// First request for this user: get/create profile → returns stored workspace.
			// Also seeds per-user context files on first chat.
			// Team-dispatched sessions skip seeding — members process tasks with full
			// capabilities, no bootstrap/user onboarding needed.
			ws := l.workspace
			if l.ensureUserFiles != nil && !isTeamSession {
				var err error
				ws, err = l.ensureUserFiles(ctx, l.agentUUID, req.UserID, l.agentType, l.workspace, req.Channel)
				if err != nil {
					slog.Warn("failed to ensure user context files", "error", err)
					ws = l.workspace
				}
			}
			// Expand ~ and convert to absolute for filesystem operations.
			ws = config.ExpandHome(ws)
			if !filepath.IsAbs(ws) {
				ws, _ = filepath.Abs(ws)
			}
			l.userWorkspaces.Store(req.UserID, ws)
			cachedWs = ws
		}
		effectiveWorkspace := cachedWs.(string)
		if !l.shouldShareWorkspace(req.UserID, req.PeerKind) {
			effectiveWorkspace = filepath.Join(effectiveWorkspace, sanitizePathSegment(req.UserID))
		}
		if l.shouldShareMemory() {
			ctx = store.WithSharedMemory(ctx)
		}
		if l.shouldShareKnowledgeGraph() {
			ctx = store.WithSharedKG(ctx)
		}
		if err := os.MkdirAll(effectiveWorkspace, 0755); err != nil {
			slog.Warn("failed to create user workspace directory", "workspace", effectiveWorkspace, "user", req.UserID, "error", err)
		}
		ctx = tools.WithToolWorkspace(ctx, effectiveWorkspace)
	} else if l.workspace != "" {
		ctx = tools.WithToolWorkspace(ctx, l.workspace)
	}

	// Team workspace handling:
	// - Dispatched task (req.TeamWorkspace set): override default workspace so
	//   relative paths resolve to team workspace. Agent workspace is accessible
	//   via ToolTeamWorkspace for absolute-path access.
	// - Direct chat (auto-resolved): keep agent workspace as default, team
	//   workspace accessible via absolute path.
	if req.TeamWorkspace != "" {
		if err := os.MkdirAll(req.TeamWorkspace, 0755); err != nil {
			slog.Warn("failed to create team workspace directory", "workspace", req.TeamWorkspace, "error", err)
		}
		ctx = tools.WithToolTeamWorkspace(ctx, req.TeamWorkspace)
		ctx = tools.WithToolWorkspace(ctx, req.TeamWorkspace) // default for relative paths
	}
	if req.TeamID != "" {
		ctx = tools.WithToolTeamID(ctx, req.TeamID)
	}

	// Auto-resolve team workspace for agents not dispatched via team task.
	// Lead agents default to team workspace (primary job is team coordination).
	// Non-lead members keep own workspace; team workspace is accessible via absolute path.
	// resolvedTeamSettings caches team settings from workspace resolution
	// to avoid re-querying when checking slow_tool notification config.
	var resolvedTeamSettings json.RawMessage
	if req.TeamWorkspace == "" && l.teamStore != nil && l.agentUUID != uuid.Nil {
		if team, _ := l.teamStore.GetTeamForAgent(ctx, l.agentUUID); team != nil {
			resolvedTeamSettings = team.Settings
			// Shared workspace: scope by teamID only. Isolated (default): scope by chatID too.
			wsChat := req.ChatID
			if wsChat == "" {
				wsChat = req.UserID
			}
			if tools.IsSharedWorkspace(team.Settings) {
				wsChat = ""
			}
			tenantBase := config.TenantWorkspace(l.dataDir, store.TenantIDFromContext(ctx), store.TenantSlugFromContext(ctx))
			if wsDir, err := tools.WorkspaceDir(tenantBase, team.ID, wsChat); err == nil {
				ctx = tools.WithToolTeamWorkspace(ctx, wsDir)
				if team.LeadAgentID == l.agentUUID {
					ctx = tools.WithToolWorkspace(ctx, wsDir)
				}
			}
			if req.TeamID == "" {
				ctx = tools.WithToolTeamID(ctx, team.ID.String())
			}
		}
	}

	// Persist agent UUID + user ID on the session (for querying/tracing)
	if l.agentUUID != uuid.Nil || req.UserID != "" {
		l.sessions.SetAgentInfo(ctx, req.SessionKey, l.agentUUID, req.UserID)
	}

	// Security: scan user message for injection patterns.
	// Action is configurable: "log" (info), "warn" (default), "block" (reject message).
	if l.inputGuard != nil {
		if matches := l.inputGuard.Scan(req.Message); len(matches) > 0 {
			matchStr := strings.Join(matches, ",")
			switch l.injectionAction {
			case "block":
				slog.Warn("security.injection_blocked",
					"agent", l.id, "user", req.UserID,
					"patterns", matchStr, "message_len", len(req.Message),
				)
				return contextSetupResult{}, fmt.Errorf("message blocked: potential prompt injection detected (%s)", matchStr)
			case "log":
				slog.Info("security.injection_detected",
					"agent", l.id, "user", req.UserID,
					"patterns", matchStr, "message_len", len(req.Message),
				)
			default: // "warn"
				slog.Warn("security.injection_detected",
					"agent", l.id, "user", req.UserID,
					"patterns", matchStr, "message_len", len(req.Message),
				)
			}
		}
	}

	// Inject agent key into context for tool-level resolution (multiple agents share tool registry)
	ctx = tools.WithToolAgentKey(ctx, l.id)

	// Security: truncate oversized user messages gracefully (feed truncation notice into LLM)
	maxChars := l.maxMessageChars
	if maxChars <= 0 {
		maxChars = config.DefaultMaxMessageChars
	}
	if len(req.Message) > maxChars {
		originalLen := len(req.Message)
		req.Message = req.Message[:maxChars] +
			fmt.Sprintf("\n\n[System: Message was truncated from %d to %d characters due to size limit. "+
				"Please ask the user to send shorter messages or use the read_file tool for large content.]",
				originalLen, maxChars)
		slog.Warn("security.message_truncated",
			"agent", l.id, "user", req.UserID,
			"original_len", originalLen, "truncated_to", maxChars,
		)
	}

	// Build RunContext from all resolved values and inject as single context key.
	// This provides a typed, inspectable snapshot of all loop-injected context.
	// Individual With* keys above remain for backward compat during transition.
	providerName := ""
	if l.provider != nil {
		providerName = l.provider.Name()
	}
	rc := &store.RunContext{
		AgentID:             l.agentUUID,
		AgentKey:            l.id,
		TenantID:            l.tenantID,
		UserID:              req.UserID,
		AgentType:           l.agentType,
		SenderID:            req.SenderID,
		SelfEvolve:          l.selfEvolve,
		SharedMemory:        store.IsSharedMemory(ctx),
		SharedKG:            store.IsSharedKG(ctx),
		RestrictToWorkspace: l.restrictToWs != nil && *l.restrictToWs,
		BuiltinToolSettings: l.builtinToolSettings,
		ChannelType:         req.ChannelType,
		SubagentsCfg:        l.subagentsCfg,
		ParentModel:         l.model,
		ParentProvider:      providerName,
		MemoryCfg:           l.memoryCfg,
		SandboxCfg:          l.sandboxCfg,
		ShellDenyGroups:     l.shellDenyGroups,
		Workspace:           tools.ToolWorkspaceFromCtx(ctx),
		TeamWorkspace:       tools.ToolTeamWorkspaceFromCtx(ctx),
		TeamID:              tools.ToolTeamIDFromCtx(ctx),
		WorkspaceChannel:    req.WorkspaceChannel,
		WorkspaceChatID:     req.WorkspaceChatID,
		TeamTaskID:          req.TeamTaskID,
		AgentToolKey:        l.id,
	}
	ctx = store.WithRunContext(ctx, rc)

	return contextSetupResult{
		ctx:                  ctx,
		resolvedTeamSettings: resolvedTeamSettings,
	}, nil
}
