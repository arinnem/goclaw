# S01: Backend Gateway Methods (Cancel & Retry)

**Goal:** Establish the core Go RPC endpoints to safely cancel tasks and perform task-cloning for retries.
**Demo:** We can send RPC requests to `teams.tasks.cancel` and `teams.tasks.retry` using a test script or cURL, successfully updating the SQL database.

## Must-Haves

- `MethodTeamsTaskCancel` and `MethodTeamsTaskRetry` registered in the gateway router.
- `handleTaskCancel` invokes existing `CancelTask` logic.
- `handleTaskRetry` fetches, cancels, cleans struct metadata (drops locks/results, resets status), and creates a new DB record.

## Proof Level

- This slice proves: integration
- Real runtime required: yes
- Human/UAT required: no

## Verification

- `go test ./internal/gateway/...` or `go run ./cmd/...` test scripts to verify the RPC invocation.

## Tasks

- [x] **T01: Define Protocol Methods** `est:10m`
  - Why: Gateway routing requires protocol constants.
  - What: Constants `MethodTeamsTaskCancel` and `MethodTeamsTaskRetry`.
  - Files: `pkg/protocol/methods.go`, `internal/gateway/methods/teams_tasks.go`
  - Do: Add the protocol constants and register them to `handleTaskCancel` and `handleTaskRetry`.
  - Verify: Compile succeeds.
  - Done when: Standard constants exist.

- [x] **T02: Implement handleTaskCancel** `est:15m`
  - Why: Direct gateway bridge to the database `CancelTask` function.
  - What: Extract payload, validate team/task context, call CancelTask, broadcast.
  - Files: `internal/gateway/methods/teams_tasks_mutations.go`
  - Do: Add `handleTaskCancel`. Map `teams.tasks.cancel` to it.
  - Verify: Go build succeeds.
  - Done when: Cancellation works gracefully via RPC.

- [x] **T03: Implement handleTaskRetry** `est:45m`
  - Why: The retry feature requires heavy lifting to clone and recreate tasks without duplicating harmful context.
  - What: Fetch old context, cancel old task, scrub volatile fields, create new task.
  - Files: `internal/gateway/methods/teams_tasks_mutations.go`
  - Do: Ensure cloned fields include Subject, Description, Metadata, channel, priority. Drop Result, Status, locks. Call CreateTask.
  - Verify: Go build succeeds and manual API test passes.
  - Done when: Retry endpoint returns a fresh cloned Task object.

## Files Likely Touched

- `pkg/protocol/methods.go`
- `internal/gateway/methods/teams_tasks.go`
- `internal/gateway/methods/teams_tasks_mutations.go`
