# Project: GoClaw Unblocking Stuck Tasks

A systemic enhancement to the GoClaw task lifecycle, introducing `Cancel` and `Retry` capabilities for both human users and AI agents to self-regulate active, blocked, or unrecoverable tasks.

## Objectives
- Implement graceful fail-safe options (Cancel/Retry) as alternatives to hard deletion for active team tasks.
- Empower agents to autonomously abort (`cancel`) or reset (`retry`) their workflows via the `team_tasks` tool when they hit unrecoverable states.
- Ensure all LLM streaming sessions correlate with active tasks and terminate synchronously upon task cancellation/retry.
- Reduce cognitive load for real user workflows by offering simple native UI buttons on `TaskCard`s.
