package pg

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
	"github.com/nextlevelbuilder/goclaw/internal/store"
)

// PGMetaTaskLinkStore implements store.MetaTaskLinkStore backed by Postgres.
type PGMetaTaskLinkStore struct {
	db *sql.DB
}

// NewPGMetaTaskLinkStore creates a new PGMetaTaskLinkStore.
func NewPGMetaTaskLinkStore(db *sql.DB) *PGMetaTaskLinkStore {
	return &PGMetaTaskLinkStore{db: db}
}

func (s *PGMetaTaskLinkStore) CreateLink(ctx context.Context, link *store.MetaTaskLinkData) error {
	if link.ID == uuid.Nil {
		link.ID = uuid.New()
	}
	_, err := s.db.ExecContext(ctx, `
		INSERT INTO meta_task_links (id, meta_task_id, sub_task_id, sub_team_id, status)
		VALUES ($1, $2, $3, $4, $5)
		ON CONFLICT (meta_task_id, sub_task_id) DO NOTHING
	`, link.ID, link.MetaTaskID, link.SubTaskID, link.SubTeamID, link.Status)
	return err
}

func (s *PGMetaTaskLinkStore) UpdateLinkStatus(ctx context.Context, subTaskID uuid.UUID, status string) error {
	_, err := s.db.ExecContext(ctx, `
		UPDATE meta_task_links SET status = $1 WHERE sub_task_id = $2
	`, status, subTaskID)
	return err
}

func (s *PGMetaTaskLinkStore) ListLinksByMetaTask(ctx context.Context, metaTaskID uuid.UUID) ([]store.MetaTaskLinkData, error) {
	rows, err := s.db.QueryContext(ctx, `
		SELECT id, meta_task_id, sub_task_id, sub_team_id, status, created_at
		FROM meta_task_links
		WHERE meta_task_id = $1
		ORDER BY created_at
	`, metaTaskID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var links []store.MetaTaskLinkData
	for rows.Next() {
		var l store.MetaTaskLinkData
		if err := rows.Scan(&l.ID, &l.MetaTaskID, &l.SubTaskID, &l.SubTeamID, &l.Status, &l.CreatedAt); err != nil {
			return nil, err
		}
		links = append(links, l)
	}
	return links, rows.Err()
}

func (s *PGMetaTaskLinkStore) GetLinkBySubTask(ctx context.Context, subTaskID uuid.UUID) (*store.MetaTaskLinkData, error) {
	var l store.MetaTaskLinkData
	err := s.db.QueryRowContext(ctx, `
		SELECT id, meta_task_id, sub_task_id, sub_team_id, status, created_at
		FROM meta_task_links
		WHERE sub_task_id = $1
	`, subTaskID).Scan(&l.ID, &l.MetaTaskID, &l.SubTaskID, &l.SubTeamID, &l.Status, &l.CreatedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &l, nil
}

func (s *PGMetaTaskLinkStore) AreAllSubTasksComplete(ctx context.Context, metaTaskID uuid.UUID) (bool, error) {
	var total, completed int
	err := s.db.QueryRowContext(ctx, `
		SELECT
			COUNT(*),
			COUNT(*) FILTER (WHERE status = 'completed')
		FROM meta_task_links
		WHERE meta_task_id = $1
	`, metaTaskID).Scan(&total, &completed)
	if err != nil {
		return false, err
	}
	return total > 0 && total == completed, nil
}
