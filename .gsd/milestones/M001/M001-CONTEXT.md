# Milestone 1: Unblocking Stuck Tasks via Cancel & Retry

## Scope
Introduce graceful failure recovery mechanisms for active tasks (pending, in_progress, blocked) through two new primitives: `Cancel` and `Retry`.

## Goals
1. Provide a `Cancel` action to hard-stop the backing LLM stream and mark the task as `cancelled` without destroying the historical record.
2. Provide a `Retry` action that cancels the current stuck task and clones its core context into a brand new `pending` task to restart the workflow cleanly.
3. Expose these capabilities to Human users via the Frontend UI (`TaskCard`).
4. Expose these capabilities to Agent pipelines via the backend `team_tasks` tool.

## Constraints
- **Preserve Audit Trail:** Do not perform DB-level `DELETE` on tasks unless strictly required (which it's not here).
- **Graceful Termination:** Agents' execution loops must be halted immediately when a task is cancelled. This is already supported natively by `cmd/gateway_consumer.go` listening to `EventTeamTaskCancelled`.
- **Stateless Retry:** Auto-reassigning the retried task back to the identical bot might be risky if the task requires lead delegation, so newly cloned tasks must land in the `pending` backlog securely stripped of runtime locks, statuses, or assignee metadata unless functionally essential. Ensure TaskNumber ticks up.
