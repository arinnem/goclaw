# M001: Unblocking Stuck Tasks via Cancel & Retry

**Vision:** Allow humans and agents to safely abort or reboot stuck task workflows without destroying historical data or orphan LLM streams.

## Success Criteria

- User can click 'Cancel' on an active task to grey it out and halt underlying agent processing.
- User can click 'Retry' on an active task, which cancels the original and spawns a new pending duplicate.
- An agent can autonomously use `action: "cancel"` or `action: "retry"` in the `team_tasks` tool with identical backend behavior.

## Key Risks / Unknowns

- DB State Machine Constraints — Modifying tasks that are in terminal states (completed/failed) or improperly parsing `TaskNumber` sequencing during a clone operation could corrupt the display.
- LLM Stream Halting — Ensuring the cloned task doesn't accidentally trigger a race condition where the old LLM stream answers the new task. (Mitigated: Event handlers terminate strictly by sessionKey).

## Proof Strategy

- DB State Machine Constraints → retire in S01 by proving the `handleTaskRetry` clones fields cleanly without transferring locked state context.

## Verification Classes

- Contract verification: Gateway endpoint calls matching protocol definitions.
- Integration verification: Sandbox agent correctly executing the `cancel` tool action.
- UAT / human verification: Clicking UI buttons and validating the visual state change in the task panel sidebar.

## Milestone Definition of Done

This milestone is complete only when all are true:

- All slices are complete and verified.
- The UI exposes both icons on the `TaskCard` cleanly.
- An agent in sandbox successfully demonstrates retry behavior.
- The backend fully prevents cancelled tasks from receiving new tool executions.

## Requirement Coverage

- Covers: R01, R02, R03, R04, R05, R06

## Slices

- [ ] **S01: Backend Gateway Methods (Cancel & Retry)** `risk:high` `depends:[]`
  > After this: We can invoke RPC calls to cancel or retry tasks dynamically, successfully producing DB state changes.
- [ ] **S02: Agent Tools Integration** `risk:medium` `depends:[S01]`
  > After this: Agents can autonomously abort or reboot their tasks using the `team_tasks` tool schema.
- [ ] **S03: Frontend UX Integration** `risk:low` `depends:[S01]`
  > After this: Human users have visual buttons on the task pane to invoke the workflows smoothly.

## Boundary Map

### S01 → S02
Produces:
- Functional backend RPC endpoints (`teams.tasks.cancel`, `teams.tasks.retry`).
Consumes:
- Existing DB layer `CancelTask` logic.

### S01 → S03
Produces:
- Standardized gateway API payload constraints.
Consumes:
- Same backend logic.
