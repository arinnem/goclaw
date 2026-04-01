# Requirements Contract

## Active
- [ ] R01: Human users can cancel non-terminal tasks from the Task Panel UI using a Cancel 'X' icon.
- [ ] R02: Human users can retry tasks from the Task Panel UI using a Refresh 'RotateCw' icon.
- [ ] R03: Bot agents can invoke `action: "cancel"` via the `team_tasks` tool for tasks they own.
- [ ] R04: Bot agents can invoke `action: "retry"` via the `team_tasks` tool for tasks they own.
- [ ] R05: A retry operation cancels the current task and creates a new identical task in the `pending` backlog.
- [ ] R06: Backend explicitly terminates LLM execution when a task is cancelled.

## Validated
None yet.

## Deferred
None yet.

## Blocked
None yet.

## Out of Scope
- Hard deletion bypassing status checks.
- Modifying previously completed or failed tasks.
