# Facebook - Quy Tắc Trình Bày

**Module:** Platform  
**Mục đích:** Format nội dung cho Facebook cá nhân (plaintext)

## Khi Nào Sử Dụng

**Load module này khi:**
- ✅ Target platform: Facebook (trang cá nhân)
- ✅ Đã có content sẵn sàng từ style module (storytelling, technical, etc.)
- ✅ Cần chuyển sang plaintext để đăng

**Lưu ý:** Module này CHỈ xử lý format. Nội dung và cách viết do `02_style/` quyết định.

---

## Typography ASCII

Facebook không hỗ trợ markdown. Dùng ký tự ASCII thay thế:

| Yếu tố | Cách làm | Ví dụ |
|---------|----------|-------|
| Tiêu đề chính | IN HOA TOÀN BỘ | `KHI TIẾN SĨ BẢO VỆ LUẬN ÁN BẰNG MỘT CÂY CẦU` |
| Phân đoạn lớn | `===` trên dòng riêng | Tách các khổ tư duy chính |
| Phân đoạn nhẹ | Dòng trống | Tách đoạn văn |
| Nhấn mạnh | Ngoặc kép `""` | `"có danh không có lực"` |
| Thông tin bổ sung | Ngoặc đơn `()` | `(gấp đôi thời lượng thông thường)` |
| Kết bài | `---` | Trước phần tham khảo |

## Cấu Trúc Bài Viết

### Không heading phụ

Bài Facebook KHÔNG có heading phụ, sub-section, hay tiêu đề con. Dùng `===` để chia 4-6 khổ lớn. Mỗi khổ là một dòng suy luận liền mạch, không cần nhãn.

### Mẫu cấu trúc

```
TIÊU ĐỀ GÂY TÒ MÒ (IN HOA)

Mở bài: 2-3 câu hook + đặt vấn đề

===

Khổ 1: Câu chuyện mở đầu (ai, ở đâu, khi nào, làm gì)

===

Khổ 2: Bối cảnh và nguyên nhân

===

Khổ 3: Liên hệ gần (Việt Nam, ngành nghề)

===

Khổ 4: Tín hiệu thay đổi hoặc giải pháp

===

Khổ kết: 2-4 câu đọng lại, câu hỏi mở hoặc nhận định mạnh

---

Tham khảo: nguồn 1, nguồn 2, nguồn 3.
```

### Phần tham khảo

- Luôn có, nằm sau `---`
- Liệt kê tên nguồn, không cần link đầy đủ
- Format: `Tham khảo: Nguồn 1, Nguồn 2, Nguồn 3.`

---

## Checklist Format

- [ ] Không có markdown, HTML, hoặc rich formatting
- [ ] Copy-paste thẳng vào Facebook được ngay
- [ ] Tiêu đề IN HOA gây tò mò
- [ ] 4-6 khổ `===`, không heading phụ
- [ ] Mạch suy luận liền, không nhãn section
- [ ] Có phần tham khảo cuối bài

---

## Bài Mẫu Đã Duyệt

1. **Đổi mới sáng tạo và học hàm học vị** (02/2026)
   - File: `20260212-1007 DRF-duthao Doi Moi Sang Tao va Hoc Ham Hoc Vi.md`
   - Đặc điểm: Nghiên cứu so sánh TQ-VN, storytelling + số liệu

2. **Kiến trúc Tư duy Đông-Tây** (01/2026)
   - KI: `east_west_thinking_architecture/artifacts/research_facebook_version.md`

3. **Vùng xám AI** (01/2026)
   - KI: `east_west_thinking_architecture/artifacts/ai_adoption/vung_xam_facebook_version.md`

---

**Token budget:** ~500 tokens  
**Vai trò:** Format layer — chỉ trình bày, không viết nội dung  
**Kết hợp:** Luôn load sau khi đã chọn style module (02_style/)
