# M001: Task Cancellation and Retry - Detailed Walkthrough

## Milestone Overview
**Status:** Completed
**Goal:** Implement full-stack task cancellation and retry capabilities, enabling both users (via UI) and agents (via tools) to safely abort stalled tasks and seamlessly clone them for a fresh retry.

---

## 🏗️ Slice 01: Backend Gateway Methods

### Objective
Create core RPC endpoints necessary to terminate active tasks safely and duplicate tasks for a clean retry state.

### Implementation Details
1. **Protocol Expansion:**
   - Modified `pkg/protocol/methods.go` to introduce two new string constants: `MethodTeamsTaskCancel` (`teams.tasks.cancel`) and `MethodTeamsTaskRetry` (`teams.tasks.retry`).
   - Registered these constants in the gateway router (`internal/gateway/methods/teams_tasks.go`).

2. **Mutation Handlers (`internal/gateway/methods/teams_tasks_mutations.go`):**
   - **Cancel Context Tracking:** Implemented `handleTaskCancel` to invoke the existing PostgreSQL layer via `teamStore.CancelTask()`. This safely flags the object and unblocks execution loops.
   - **The Clone Strategy (Retry):** Designed `handleTaskRetry` using a "Close & Clone" architecture to prevent corrupted execution logs.
     - Retrieves the old task details (Subject, Description, Metadata, channel constraints).
     - Issues a cancellation to the old task.
     - Spawns a new unassigned, pending task via `CreateTask()` containing identical context blocks but dropping stale locks, tracking pointers, and terminal statuses. Wait states are reset cleanly.

---

## 🤖 Slice 02: Agent Tool Schema Expansion

### Objective
Allow the autonomous Agent ecosystem to access the exact same capability, enabling self-healing behaviors when encountering stuck or invalid task workflows.

### Implementation Details
1. **Definition Updates (`internal/tools/team_tasks_mutations.go`):**
   - Extended the `execute_action` JSON enum tool schemas parameters within the system prompt contexts to include explicit definitions for `"cancel"` and `"retry"` actions.
2. **Behavior Control (`internal/tools/team_tasks_followup.go`):**
   - Upgraded the `executeCancel` method to interface identically to the backend cancel protocol.
   - Remodelled the `executeRetry` function. Previously, retry behavior was a simple (and flawed) `status` toggle. It now matches the identical cloning workflow as `handleTaskRetry`, copying deep contexts over to a pristine new task token.

---

## 🎨 Slice 03: Frontend Integration

### Objective
Expose the backend actions directly onto the TaskCards to give users absolute control over workflow states without needing to enter the chat input loop.

### Implementation Details
1. **Context Alignment (`use-chat-messages.ts`):** 
   - Adjusted websocket parsing hooks so `event.team_id` gets permanently tracked on ActiveTeamTasks as `teamId` alongside `taskId`.
2. **RPC Invocation (`types/chat.ts` & `protocol.ts`):**
   - Expanded typings and injected the `TEAMS_TASK_CANCEL` / `TEAMS_TASK_RETRY` constants into the frontend standard API layer.
3. **UI Delivery (`task-panel.tsx`):**
   - Leveraged Lucide Icons (`<Ban />`, `<RotateCw />`) injected functionally alongside the task progress headers.
   - Placed conditional gating ensuring buttons are only visible when workflows are active (hiding on terminal completed/cancelled tasks).
   - Hooked up exact triggers to `useWsCall` with proper error handling and immediate optimism behaviors. 

### Conclusion
Milestone 1 satisfies all requirements for cross-service, integrated, and reliable workflow cancellation/retry protocols. The GSD loop is successfully verified.
