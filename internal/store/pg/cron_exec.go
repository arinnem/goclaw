package pg

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/google/uuid"

	"github.com/nextlevelbuilder/goclaw/internal/store"
)

func (s *PGCronStore) RunJob(jobID string, force bool) (bool, string, error) {
	job, ok := s.GetJob(jobID)
	if !ok {
		return false, "", fmt.Errorf("job %s not found", jobID)
	}

	s.mu.Lock()
	handler := s.onJob
	s.mu.Unlock()

	if handler == nil {
		return false, "", fmt.Errorf("no job handler configured")
	}

	// Mark job as running before execution
	if id, parseErr := uuid.Parse(jobID); parseErr == nil {
		s.db.Exec("UPDATE cron_jobs SET last_status = 'running', updated_at = $1 WHERE id = $2", time.Now(), id)
	}
	s.mu.Lock()
	s.cacheLoaded = false
	s.mu.Unlock()

	s.emitEvent(store.CronEvent{Action: "running", JobID: job.ID, JobName: job.Name, UserID: job.UserID})

	// Use executeOneJob for proper state updates, run logging, and retry
	s.executeOneJob(*job, handler)
	s.mu.Lock()
	s.cacheLoaded = false
	s.mu.Unlock()
	return true, "", nil
}

func (s *PGCronStore) GetRunLog(jobID string, limit, offset int) ([]store.CronRunLogEntry, int) {
	if limit <= 0 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	const cols = "job_id, status, error, summary, ran_at, COALESCE(duration_ms, 0), COALESCE(input_tokens, 0), COALESCE(output_tokens, 0)"

	var total int
	var rows *sql.Rows
	var err error
	if jobID != "" {
		id, parseErr := uuid.Parse(jobID)
		if parseErr != nil {
			return nil, 0
		}
		s.db.QueryRow("SELECT COUNT(*) FROM cron_run_logs WHERE job_id = $1", id).Scan(&total)
		rows, err = s.db.Query(
			"SELECT "+cols+" FROM cron_run_logs WHERE job_id = $1 ORDER BY ran_at DESC LIMIT $2 OFFSET $3",
			id, limit, offset)
	} else {
		s.db.QueryRow("SELECT COUNT(*) FROM cron_run_logs").Scan(&total)
		rows, err = s.db.Query(
			"SELECT "+cols+" FROM cron_run_logs ORDER BY ran_at DESC LIMIT $1 OFFSET $2", limit, offset)
	}
	if err != nil {
		return nil, 0
	}
	defer rows.Close()

	var result []store.CronRunLogEntry
	for rows.Next() {
		var jobUUID uuid.UUID
		var status string
		var errStr, summary *string
		var ranAt time.Time
		var durationMS int64
		var inputTokens, outputTokens int
		if err := rows.Scan(&jobUUID, &status, &errStr, &summary, &ranAt, &durationMS, &inputTokens, &outputTokens); err != nil {
			continue
		}
		result = append(result, store.CronRunLogEntry{
			Ts:           ranAt.UnixMilli(),
			JobID:        jobUUID.String(),
			Status:       status,
			Error:        derefStr(errStr),
			Summary:      derefStr(summary),
			DurationMS:   durationMS,
			InputTokens:  inputTokens,
			OutputTokens: outputTokens,
		})
	}
	return result, total
}

func (s *PGCronStore) Status() map[string]any {
	s.mu.Lock()
	defer s.mu.Unlock()
	var count int64
	s.db.QueryRow("SELECT COUNT(*) FROM cron_jobs WHERE enabled = true").Scan(&count)
	return map[string]any{
		"enabled": s.running,
		"jobs":    count,
	}
}
