# S02: Agent Tools Integration

**Goal:** Provide the `cancel` and `retry` capabilities to the LLMs safely.
**Demo:** Agent can dynamically respond to a stuck state in the Sandbox by invoking `action: "retry"` in `team_tasks`.

## Must-Haves

- Update `team_tasks_mutations.go` JSON schema enum.
- Route cases for `"cancel"` and `"retry"` to the backend methods (or directly to DB storage).

## Proof Level

- This slice proves: integration
- Real runtime required: yes
- Human/UAT required: yes (sandbox test)

## Verification

- Run a sandbox agent and ask it to "Retry this task". Verify a new task gets spawned successfully.

## Tasks

- [x] **T01: Expand Tool Schema** `est:10m`
  - Why: The LLM needs to know the feature exists.
  - What: JSON schema additions.
  - Files: `internal/tools/team_tasks_mutations.go`
  - Do: Add `"cancel"` and `"retry"` to action enum string list and description docs.
  - Verify: Go build passes.
  - Done when: Schema matches updated reality.

- [x] **T02: Implement Tool Execution Logic** `est:20m`
  - Why: When the LLM calls the action, it must execute code matching the Gateway endpoints.
  - What: Internal switch statements mapping to internal Store calls.
  - Files: `internal/tools/team_tasks_mutations.go`
  - Do: Invoke `CancelTask` for `cancel`. Mirror `handleTaskRetry` logic for `retry`. Return the new TaskID so the LLM knows it succeeded.
  - Verify: Go build passes.
  - Done when: Actions successfully map to internal DB logic.

## Files Likely Touched

- `internal/tools/team_tasks_mutations.go`
