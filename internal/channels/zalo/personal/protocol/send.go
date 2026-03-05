package protocol

import (
	"bytes"
	"context"
	"crypto/md5"
	"crypto/rand"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"image"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

// SendMessage sends a text message to a user or group.
// threadID: user UID (DM) or group ID (group).
func SendMessage(ctx context.Context, sess *Session, threadID string, threadType ThreadType, text string) (string, error) {
	if text == "" {
		return "", fmt.Errorf("zalo_personal: message text cannot be empty")
	}

	serviceKey := "chat"
	apiPath := "/api/message/sms"
	if threadType == ThreadTypeGroup {
		serviceKey = "group"
		apiPath = "/api/group/sendmsg"
	}

	baseURL := getServiceURL(sess, serviceKey)
	if baseURL == "" {
		return "", fmt.Errorf("zalo_personal: no service URL for %s", serviceKey)
	}

	// Build payload
	payload := map[string]any{
		"message":  text,
		"clientId": time.Now().UnixMilli(),
		"ttl":      0,
	}
	if threadType == ThreadTypeGroup {
		payload["grid"] = threadID
		payload["visibility"] = 0
	} else {
		payload["toid"] = threadID
		payload["imei"] = sess.IMEI
	}

	// Encrypt payload with session secret key
	encData, err := encryptPayload(sess, payload)
	if err != nil {
		return "", fmt.Errorf("zalo_personal: encrypt send payload: %w", err)
	}

	// Build URL with standard params
	sendURL := makeURL(sess, baseURL+apiPath, map[string]any{"nretry": 0}, true)

	// POST form-encoded
	form := buildFormBody(map[string]string{"params": encData})
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, sendURL, form)
	if err != nil {
		return "", err
	}
	setDefaultHeaders(req, sess)

	resp, err := sess.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("zalo_personal: send message: %w", err)
	}
	defer resp.Body.Close()

	// Send response is encrypted: {"error_code":0, "data":"<encrypted>"}
	var envelope Response[*string]
	if err := readJSON(resp, &envelope); err != nil {
		return "", fmt.Errorf("zalo_personal: parse send response: %w", err)
	}
	if envelope.ErrorCode != 0 {
		return "", fmt.Errorf("zalo_personal: send error code %d", envelope.ErrorCode)
	}
	if envelope.Data == nil {
		return "", nil
	}

	plain, err := decryptDataField(sess, *envelope.Data)
	if err != nil {
		return "", fmt.Errorf("zalo_personal: decrypt send response: %w", err)
	}

	var result struct {
		MsgID json.Number `json:"msgId"`
	}
	if err := json.Unmarshal(plain, &result); err != nil {
		return "", fmt.Errorf("zalo_personal: parse send result: %w", err)
	}

	return result.MsgID.String(), nil
}

// SendTypingEvent sends a typing indicator to a user or group.
// Zalo typing lasts ~5s server-side; callers should re-send every 3-4s.
func SendTypingEvent(ctx context.Context, sess *Session, threadID string, threadType ThreadType) error {
	serviceKey := "chat"
	apiPath := "/api/message/typing"
	if threadType == ThreadTypeGroup {
		serviceKey = "group"
		apiPath = "/api/group/typing"
	}

	baseURL := getServiceURL(sess, serviceKey)
	if baseURL == "" {
		return fmt.Errorf("zalo_personal: no service URL for %s", serviceKey)
	}

	payload := map[string]any{"imei": sess.IMEI}
	if threadType == ThreadTypeGroup {
		payload["grid"] = threadID
	} else {
		payload["toid"] = threadID
		payload["destType"] = 3 // DestTypeUser
	}

	encData, err := encryptPayload(sess, payload)
	if err != nil {
		return fmt.Errorf("zalo_personal: encrypt typing payload: %w", err)
	}

	typingURL := makeURL(sess, baseURL+apiPath, nil, true)
	form := buildFormBody(map[string]string{"params": encData})
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, typingURL, form)
	if err != nil {
		return err
	}
	setDefaultHeaders(req, sess)

	resp, err := sess.Client.Do(req)
	if err != nil {
		return fmt.Errorf("zalo_personal: send typing: %w", err)
	}
	defer resp.Body.Close()

	var envelope Response[any]
	if err := readJSON(resp, &envelope); err != nil {
		return fmt.Errorf("zalo_personal: parse typing response: %w", err)
	}
	if envelope.ErrorCode != 0 {
		return fmt.Errorf("zalo_personal: typing error code %d", envelope.ErrorCode)
	}
	return nil
}

// getServiceURL extracts a service base URL from LoginInfo.
func getServiceURL(sess *Session, service string) string {
	if sess.LoginInfo == nil {
		return ""
	}
	var urls []string
	switch service {
	case "chat":
		urls = sess.LoginInfo.ZpwServiceMapV3.Chat
	case "group":
		urls = sess.LoginInfo.ZpwServiceMapV3.Group
	case "file":
		urls = sess.LoginInfo.ZpwServiceMapV3.File
	case "profile":
		urls = sess.LoginInfo.ZpwServiceMapV3.Profile
	case "group_poll":
		urls = sess.LoginInfo.ZpwServiceMapV3.GroupPoll
	}
	if len(urls) == 0 {
		return ""
	}
	return urls[0]
}

// ImageUploadResult holds the response from uploading an image to Zalo's file service.
type ImageUploadResult struct {
	NormalURL    string `json:"normalUrl"`
	HDUrl        string `json:"hdUrl"`
	ThumbURL     string `json:"thumbUrl"`
	PhotoID      int64  `json:"photoId"`
	ClientFileID int64  `json:"clientFileId"`
	ChunkID      int    `json:"chunkId"`
	Finished     bool   `json:"finished"`

	// Set by caller (not from API response).
	Width     int `json:"-"`
	Height    int `json:"-"`
	TotalSize int `json:"-"`
}

// UploadImage uploads an image file to Zalo's file service.
// Returns upload metadata needed for SendImage.
func UploadImage(ctx context.Context, sess *Session, threadID string, threadType ThreadType, filePath string) (*ImageUploadResult, error) {
	fileURL := getServiceURL(sess, "file")
	if fileURL == "" {
		return nil, fmt.Errorf("zalo_personal: no file service URL")
	}

	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("zalo_personal: read image: %w", err)
	}

	fileName := filepath.Base(filePath)
	totalSize := len(data)
	width, height := imageDimensions(data)

	uploadParams := map[string]any{
		"totalChunk": 1,
		"fileName":   fileName,
		"clientId":   time.Now().UnixMilli(),
		"totalSize":  totalSize,
		"imei":       sess.IMEI,
		"isE2EE":     0,
		"jxl":        0,
		"chunkId":    1,
	}
	if threadType == ThreadTypeGroup {
		uploadParams["grid"] = threadID
	} else {
		uploadParams["toid"] = threadID
	}

	encParams, err := encryptPayload(sess, uploadParams)
	if err != nil {
		return nil, fmt.Errorf("zalo_personal: encrypt upload params: %w", err)
	}

	// Build URL: file_service/api/{message|group}/photo_original/upload
	pathPrefix := "/api/message/"
	typeParam := "2"
	if threadType == ThreadTypeGroup {
		pathPrefix = "/api/group/"
		typeParam = "11"
	}

	uploadURL := makeURL(sess, fileURL+pathPrefix+"photo_original/upload", map[string]any{
		"type":   typeParam,
		"params": encParams,
	}, true)

	// Build multipart body
	body, contentType, err := buildMultipartBody("chunkContent", fileName, data)
	if err != nil {
		return nil, fmt.Errorf("zalo_personal: build multipart: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, uploadURL, body)
	if err != nil {
		return nil, err
	}
	setDefaultHeaders(req, sess)
	req.Header.Set("Content-Type", contentType)

	resp, err := sess.Client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("zalo_personal: upload image: %w", err)
	}
	defer resp.Body.Close()

	// Response: {"error_code":0, "data":"<encrypted>"}
	var envelope Response[*string]
	if err := readJSON(resp, &envelope); err != nil {
		return nil, fmt.Errorf("zalo_personal: parse upload response: %w", err)
	}
	if envelope.ErrorCode != 0 {
		return nil, fmt.Errorf("zalo_personal: upload error code %d", envelope.ErrorCode)
	}
	if envelope.Data == nil {
		return nil, fmt.Errorf("zalo_personal: empty upload response")
	}

	plain, err := decryptDataField(sess, *envelope.Data)
	if err != nil {
		return nil, fmt.Errorf("zalo_personal: decrypt upload response: %w", err)
	}

	var result ImageUploadResult
	if err := json.Unmarshal(plain, &result); err != nil {
		return nil, fmt.Errorf("zalo_personal: parse upload result: %w", err)
	}

	result.Width = width
	result.Height = height
	result.TotalSize = totalSize
	return &result, nil
}

// SendImage sends a previously uploaded image as a message.
func SendImage(ctx context.Context, sess *Session, threadID string, threadType ThreadType, upload *ImageUploadResult, caption string) (string, error) {
	fileURL := getServiceURL(sess, "file")
	if fileURL == "" {
		return "", fmt.Errorf("zalo_personal: no file service URL")
	}

	params := map[string]any{
		"photoId":  upload.PhotoID,
		"clientId": strconv.FormatInt(time.Now().UnixMilli(), 10),
		"desc":     caption,
		"width":    upload.Width,
		"height":   upload.Height,
		"rawUrl":   upload.NormalURL,
		"hdUrl":    upload.HDUrl,
		"thumbUrl": upload.ThumbURL,
		"hdSize":   strconv.Itoa(upload.TotalSize),
		"zsource":  -1,
		"ttl":      0,
		"jcp":      `{"convertible":"jxl"}`,
	}
	if threadType == ThreadTypeGroup {
		params["grid"] = threadID
		params["oriUrl"] = upload.NormalURL
	} else {
		params["toid"] = threadID
		params["normalUrl"] = upload.NormalURL
	}

	encData, err := encryptPayload(sess, params)
	if err != nil {
		return "", fmt.Errorf("zalo_personal: encrypt image send params: %w", err)
	}

	pathPrefix := "/api/message/"
	if threadType == ThreadTypeGroup {
		pathPrefix = "/api/group/"
	}

	sendURL := makeURL(sess, fileURL+pathPrefix+"photo_original/send", map[string]any{"nretry": 0}, true)
	form := buildFormBody(map[string]string{"params": encData})

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, sendURL, form)
	if err != nil {
		return "", err
	}
	setDefaultHeaders(req, sess)

	resp, err := sess.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("zalo_personal: send image: %w", err)
	}
	defer resp.Body.Close()

	var envelope Response[*string]
	if err := readJSON(resp, &envelope); err != nil {
		return "", fmt.Errorf("zalo_personal: parse image send response: %w", err)
	}
	if envelope.ErrorCode != 0 {
		return "", fmt.Errorf("zalo_personal: image send error code %d", envelope.ErrorCode)
	}
	if envelope.Data == nil {
		return "", nil
	}

	plain, err := decryptDataField(sess, *envelope.Data)
	if err != nil {
		return "", fmt.Errorf("zalo_personal: decrypt image send response: %w", err)
	}

	var result struct {
		MsgID json.Number `json:"msgId"`
	}
	if err := json.Unmarshal(plain, &result); err != nil {
		return "", fmt.Errorf("zalo_personal: parse image send result: %w", err)
	}
	return result.MsgID.String(), nil
}

// buildMultipartBody creates a multipart/form-data body with a single file field.
func buildMultipartBody(fieldName, fileName string, data []byte) (io.Reader, string, error) {
	var buf bytes.Buffer
	w := multipart.NewWriter(&buf)

	boundary := "----GoClaw" + randomBoundary()
	if err := w.SetBoundary(boundary); err != nil {
		return nil, "", err
	}

	part, err := w.CreateFormFile(fieldName, fileName)
	if err != nil {
		return nil, "", err
	}
	if _, err := part.Write(data); err != nil {
		return nil, "", err
	}
	if err := w.Close(); err != nil {
		return nil, "", err
	}

	return &buf, w.FormDataContentType(), nil
}

func randomBoundary() string {
	b := make([]byte, 8)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}

// imageDimensions extracts width and height from an image (PNG, JPEG, etc.).
// Returns (0, 0) if the format is unrecognized.
func imageDimensions(data []byte) (int, int) {
	cfg, _, err := image.DecodeConfig(bytes.NewReader(data))
	if err != nil {
		return 0, 0
	}
	return cfg.Width, cfg.Height
}

// IsImageFile returns true if the file extension is a supported image type.
func IsImageFile(filePath string) bool {
	ext := strings.ToLower(filepath.Ext(filePath))
	switch ext {
	case ".jpg", ".jpeg", ".png", ".webp":
		return true
	}
	return false
}

// FileUploadResult holds the response from uploading a file to Zalo's file service.
type FileUploadResult struct {
	FileID       string `json:"fileId"`
	FileURL      string `json:"fileUrl"`      // populated from WS callback
	ClientFileID int64  `json:"clientFileId"`
	ChunkID      int    `json:"chunkId"`
	Finished     int    `json:"finished"`

	// Set by caller.
	TotalSize int    `json:"-"`
	FileName  string `json:"-"`
	Checksum  string `json:"-"` // MD5 hex
}

// UploadFile uploads a non-image file to Zalo's file service.
// The upload response only contains fileId; the fileUrl arrives via WebSocket callback.
// The caller must provide the Listener so we can register a callback for the fileUrl.
func UploadFile(ctx context.Context, sess *Session, ln *Listener, threadID string, threadType ThreadType, filePath string) (*FileUploadResult, error) {
	fileURL := getServiceURL(sess, "file")
	if fileURL == "" {
		return nil, fmt.Errorf("zalo_personal: no file service URL")
	}

	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("zalo_personal: read file: %w", err)
	}

	fileName := filepath.Base(filePath)
	totalSize := len(data)
	clientID := time.Now().UnixMilli()

	uploadParams := map[string]any{
		"totalChunk": 1,
		"fileName":   fileName,
		"clientId":   clientID,
		"totalSize":  totalSize,
		"imei":       sess.IMEI,
		"isE2EE":     0,
		"jxl":        0,
		"chunkId":    1,
	}
	if threadType == ThreadTypeGroup {
		uploadParams["grid"] = threadID
	} else {
		uploadParams["toid"] = threadID
	}

	encParams, err := encryptPayload(sess, uploadParams)
	if err != nil {
		return nil, fmt.Errorf("zalo_personal: encrypt file upload params: %w", err)
	}

	pathPrefix := "/api/message/"
	typeParam := "2"
	if threadType == ThreadTypeGroup {
		pathPrefix = "/api/group/"
		typeParam = "11"
	}

	uploadURL := makeURL(sess, fileURL+pathPrefix+"asyncfile/upload", map[string]any{
		"type":   typeParam,
		"params": encParams,
	}, true)

	body, contentType, err := buildMultipartBody("chunkContent", fileName, data)
	if err != nil {
		return nil, fmt.Errorf("zalo_personal: build multipart: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, uploadURL, body)
	if err != nil {
		return nil, err
	}
	setDefaultHeaders(req, sess)
	req.Header.Set("Content-Type", contentType)

	resp, err := sess.Client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("zalo_personal: upload file: %w", err)
	}
	defer resp.Body.Close()

	var envelope Response[*string]
	if err := readJSON(resp, &envelope); err != nil {
		return nil, fmt.Errorf("zalo_personal: parse file upload response: %w", err)
	}
	if envelope.ErrorCode != 0 {
		return nil, fmt.Errorf("zalo_personal: file upload error code %d", envelope.ErrorCode)
	}
	if envelope.Data == nil {
		return nil, fmt.Errorf("zalo_personal: empty file upload response")
	}

	plain, err := decryptDataField(sess, *envelope.Data)
	if err != nil {
		return nil, fmt.Errorf("zalo_personal: decrypt file upload response: %w", err)
	}

	var result FileUploadResult
	if err := json.Unmarshal(plain, &result); err != nil {
		return nil, fmt.Errorf("zalo_personal: parse file upload result: %w", err)
	}

	result.TotalSize = totalSize
	result.FileName = fileName

	// Compute MD5 checksum
	h := md5Hash(data)
	result.Checksum = h

	// Wait for fileUrl from WebSocket callback
	if ln != nil && result.FileID != "" && result.FileID != "-1" {
		urlCh := ln.RegisterUploadCallback(result.FileID)
		select {
		case fileURL := <-urlCh:
			result.FileURL = fileURL
		case <-time.After(30 * time.Second):
			ln.CancelUploadCallback(result.FileID)
			return nil, fmt.Errorf("zalo_personal: timeout waiting for file upload callback (fileId=%s)", result.FileID)
		case <-ctx.Done():
			ln.CancelUploadCallback(result.FileID)
			return nil, ctx.Err()
		}
	}

	return &result, nil
}

// SendFile sends a previously uploaded file as a message.
func SendFile(ctx context.Context, sess *Session, threadID string, threadType ThreadType, upload *FileUploadResult) (string, error) {
	fileURL := getServiceURL(sess, "file")
	if fileURL == "" {
		return "", fmt.Errorf("zalo_personal: no file service URL")
	}

	ext := strings.TrimPrefix(filepath.Ext(upload.FileName), ".")

	params := map[string]any{
		"fileId":      upload.FileID,
		"checksum":    upload.Checksum,
		"checksumSha": "",
		"extention":   ext, // Zalo typo: "extention" not "extension"
		"totalSize":   upload.TotalSize,
		"fileName":    upload.FileName,
		"clientId":    strconv.FormatInt(upload.ClientFileID, 10),
		"fType":       1,
		"fileCount":   0,
		"fdata":       "{}",
		"fileUrl":     upload.FileURL,
		"zsource":     -1,
		"ttl":         0,
	}
	if threadType == ThreadTypeGroup {
		params["grid"] = threadID
	} else {
		params["toid"] = threadID
	}

	encData, err := encryptPayload(sess, params)
	if err != nil {
		return "", fmt.Errorf("zalo_personal: encrypt file send params: %w", err)
	}

	pathPrefix := "/api/message/"
	if threadType == ThreadTypeGroup {
		pathPrefix = "/api/group/"
	}

	sendURL := makeURL(sess, fileURL+pathPrefix+"asyncfile/msg", map[string]any{"nretry": 0}, true)
	form := buildFormBody(map[string]string{"params": encData})

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, sendURL, form)
	if err != nil {
		return "", err
	}
	setDefaultHeaders(req, sess)

	resp, err := sess.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("zalo_personal: send file: %w", err)
	}
	defer resp.Body.Close()

	var respEnvelope Response[*string]
	if err := readJSON(resp, &respEnvelope); err != nil {
		return "", fmt.Errorf("zalo_personal: parse file send response: %w", err)
	}
	if respEnvelope.ErrorCode != 0 {
		return "", fmt.Errorf("zalo_personal: file send error code %d", respEnvelope.ErrorCode)
	}
	if respEnvelope.Data == nil {
		return "", nil
	}

	plain, err := decryptDataField(sess, *respEnvelope.Data)
	if err != nil {
		return "", fmt.Errorf("zalo_personal: decrypt file send response: %w", err)
	}

	var result struct {
		MsgID json.Number `json:"msgId"`
	}
	if err := json.Unmarshal(plain, &result); err != nil {
		return "", fmt.Errorf("zalo_personal: parse file send result: %w", err)
	}
	return result.MsgID.String(), nil
}

// md5Hash returns the MD5 hex digest. Required by Zalo's file upload API checksum field.
func md5Hash(data []byte) string {
	h := md5.Sum(data)
	return hex.EncodeToString(h[:])
}

// encryptPayload encrypts a JSON payload with the session's secret key via AES-CBC.
func encryptPayload(sess *Session, payload map[string]any) (string, error) {
	blob, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}
	key, err := base64.StdEncoding.DecodeString(sess.SecretKey)
	if err != nil {
		return "", fmt.Errorf("decode secret key: %w", err)
	}
	return EncodeAESCBC(key, string(blob), false)
}
