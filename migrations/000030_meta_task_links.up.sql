-- meta_task_links: tracks 1:N relationship between meta-team tasks and sub-tasks.
-- When the meta-team orchestrator assigns a task, it can fan-out to N sub-tasks
-- across M different teams. The parent meta-task only completes when ALL sub-tasks
-- from ALL teams are finished.
CREATE TABLE IF NOT EXISTS meta_task_links (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meta_task_id UUID NOT NULL REFERENCES team_tasks(id) ON DELETE CASCADE,
    sub_task_id  UUID NOT NULL REFERENCES team_tasks(id) ON DELETE CASCADE,
    sub_team_id  UUID NOT NULL,
    status       TEXT NOT NULL DEFAULT 'pending',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(meta_task_id, sub_task_id)
);

CREATE INDEX IF NOT EXISTS idx_meta_task_links_meta ON meta_task_links(meta_task_id);
CREATE INDEX IF NOT EXISTS idx_meta_task_links_sub  ON meta_task_links(sub_task_id);
