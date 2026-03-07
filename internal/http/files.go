package http

import (
	"log/slog"
	"mime"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

// FilesHandler serves files over HTTP with Bearer token auth.
// Accepts absolute paths — the auth token protects against unauthorized access.
type FilesHandler struct {
	token string
}

// NewFilesHandler creates a handler that serves files by absolute path.
func NewFilesHandler(token string) *FilesHandler {
	return &FilesHandler{token: token}
}

// RegisterRoutes registers the file serving route.
func (h *FilesHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /v1/files/{path...}", h.auth(h.handleServe))
}

func (h *FilesHandler) auth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if h.token != "" {
			// Accept token via Bearer header or ?token= query param (for <img src>).
			provided := extractBearerToken(r)
			if provided == "" {
				provided = r.URL.Query().Get("token")
			}
			if provided != h.token {
				writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "unauthorized"})
				return
			}
		}
		next(w, r)
	}
}

func (h *FilesHandler) handleServe(w http.ResponseWriter, r *http.Request) {
	urlPath := r.PathValue("path")
	if urlPath == "" {
		http.Error(w, "path is required", http.StatusBadRequest)
		return
	}

	// Prevent path traversal
	if strings.Contains(urlPath, "..") {
		slog.Warn("security.files_traversal", "path", urlPath)
		http.Error(w, "invalid path", http.StatusBadRequest)
		return
	}

	// URL path is the absolute path with leading "/" stripped (e.g. "app/.goclaw/workspace/file.png")
	absPath := filepath.Clean("/" + urlPath)

	info, err := os.Stat(absPath)
	if err != nil || info.IsDir() {
		http.NotFound(w, r)
		return
	}

	// Set Content-Type from extension
	ext := filepath.Ext(absPath)
	ct := mime.TypeByExtension(ext)
	if ct != "" {
		w.Header().Set("Content-Type", ct)
	}

	http.ServeFile(w, r, absPath)
}
