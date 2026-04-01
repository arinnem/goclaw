# S03: Frontend UX Integration

**Goal:** Put shiny buttons on the `TaskCard` so users can instantly kill or retry tasks.
**Demo:** Visual buttons dispatch accurate Redux/WebSocket messages and the UI responds intuitively.

## Must-Haves

- `Cancel` (X) icon only visible on non-terminal tasks.
- `Retry` (Refresh/RotateCw) icon only visible on non-terminal tasks.
- Optimistic rendering or direct websocket alignment as tasks move states.

## Proof Level

- This slice proves: final-assembly
- Real runtime required: yes
- Human/UAT required: yes

## Verification

- Load frontend (`npm run dev`), open a chat, hover task, click buttons, visually confirm state change.

## Tasks

- [x] **T01: UI Buttons in TaskCard** `est:30m`
  - Why: Users need the affordance.
  - What: React UI updates using HeroUI buttons.
  - Files: `ui/web/src/components/chat/task-panel.tsx`
  - Do: Inject icons. Hide buttons if `task.status === "completed" || task.status === "cancelled" || task.status === "failed"`.
  - Verify: ESLint passes. UI renders without crashing.
  - Done when: Icons are visible and properly tooltipped.

- [x] **T02: Dispatch Handlers** `est:15m`
  - Why: Buttons must fire RPC gateway triggers.
  - What: Event dispatch mapped to `teams.tasks.cancel` and `teams.tasks.retry`.
  - Files: `ui/web/src/components/chat/task-panel.tsx`
  - Do: Add websocket dispatch hooks.
  - Verify: Click triggers network event.
  - Done when: UI correctly communicates with Gateway.

## Files Likely Touched

- `ui/web/src/components/chat/task-panel.tsx`
