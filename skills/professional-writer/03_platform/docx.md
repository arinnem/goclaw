# DOCX / Report Format

**Module:** Platform
**Mục đích:** Tạo nội dung tối ưu để copy-paste vào Microsoft Word hoặc Google Docs.

## Nguyên Tắc Định Dạng

Vì Markdown không hỗ trợ hết các tính năng của Word, module này tập trung vào **Structure** và **Content hierarchy** để dễ dàng format lại sau khi paste.

### 1. Hierarchy (Phân cấp)
- Sử dụng đúng Heading 1, 2, 3 (`#`, `##`, `###`) để Word tự nhận diện Mục lục (Table of Contents).
- **Tiêu đề bài (Title):** Heading 1, Căn giữa (ghi chú `[Căn giữa]`).

### 2. Text Emphasis
- **Bold (`**text**`):** Dùng cho từ khóa, tiêu đề con inline.
- *Italic (`*text*`):* Dùng cho ghi chú, tên tài liệu, thuật ngữ nước ngoài.

### 3. Danh Sách & Bảng
- Word xử lý tốt Markdown list (`-`, `1.`) và Table.
- **Lưu ý bảng:** Giữ bảng đơn giản, không merge cells phức tạp bằng markdown (vì hay lỗi).

### 4. Placeholder cho Hình ảnh/Biểu đồ
Vì không paste được ảnh trực tiếp từ Markdown text, hãy dùng placeholder:

`[CHÈN HÌNH 1: Biểu đồ doanh thu Q3]`
`*Ghi chú: Biểu đồ cột, so sánh year-over-year.*`

### 5. Trang Bìa & Mục Lục (Gợi ý)
- Thêm phần text gợi ý nội dung trang bìa ở đầu file.
- Ghi chú `[Ngắt trang]` để người dùng biết chỗ cần `Ctrl + Enter`.

---

## Template Report Structure

```markdown
[Trang Bìa]
TÊN BÁO CÁO
Đơn vị: ...
Ngày: ...

[Ngắt trang]

# MỤC LỤC
(Người dùng tự tạo bằng Word)

[Ngắt trang]

# 1. MỞ ĐẦU
Nội dung...

# 2. NỘI DUNG CHÍNH
## 2.1. Phân tích số liệu
Nội dung...

[CHÈN BẢNG SỐ LIỆU]

# 3. KẾT LUẬN
Nội dung...
```

**Token budget:** ~500 tokens
**Mục tiêu:** Clean structure, ready-to-paste.
