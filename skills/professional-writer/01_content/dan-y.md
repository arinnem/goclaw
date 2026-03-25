# Dàn ý & Mục lục (Outline / Table of Contents)

**Module:** Content (Process)
**Mục đích:** Lập cấu trúc bài viết phức tạp trước khi viết nội dung. Đảm bảo logic mạch lạc, không thiếu/thừa, và User duyệt trước khi triển khai.

## Khi nào load module này

**BẮT BUỘC load khi:**
- Báo cáo dài (>3 mục chính / >2000 từ dự kiến)
- Phân tích đa chiều (nhiều góc nhìn, nhiều lĩnh vực tác động)
- Tài liệu có cấu trúc phức tạp (whitepaper, nghiên cứu chuyên sâu, đề xuất chiến lược)
- User yêu cầu "chi tiết", "đánh giá toàn diện", "phân tích tác động"

**Không cần khi:**
- Blog ngắn, status Facebook
- Email đơn giản
- Bài viết < 1000 từ với cấu trúc rõ ràng

---

## Quy trình 3 bước

### Bước 1: Xác định phạm vi (Scope)

Trả lời 4 câu hỏi trước khi lập dàn ý:

| Câu hỏi | Mục đích |
| :--- | :--- |
| Đối tượng đọc là ai? | Quyết định độ sâu và ngôn ngữ |
| Mục tiêu của báo cáo? (Thông tin / Thuyết phục / Ra quyết định) | Quyết định cấu trúc |
| Phạm vi phân tích? (Rộng tổng quan / Sâu chuyên ngành) | Quyết định số lượng mục |
| Có ràng buộc nào không? (Deadline, số trang, format) | Quyết định mức chi tiết |

### Bước 2: Lập dàn ý (Draft outline)

**Trình bày dàn ý cho User duyệt trước khi viết.** Format:

```markdown
# [TÊN BÁO CÁO]

## Mục lục đề xuất

### I. Mở đầu
- Bối cảnh và mục tiêu báo cáo
- Phạm vi và phương pháp

### II. [Phần phân tích chính 1]
- Mục 2.1: [Nội dung]
- Mục 2.2: [Nội dung]

### III. [Phần phân tích chính 2]
- Mục 3.1: [Nội dung]
- Mục 3.2: [Nội dung]

### IV. [Đánh giá tác động / Kết quả]
- Mục 4.1: [Nội dung]
- Mục 4.2: [Nội dung]

### V. Kết luận và kiến nghị
- Tổng kết
- Đề xuất hành động

### Phụ lục (nếu có)
- Bảng biểu, tài liệu tham khảo

---
**Ước lượng:** ~X.000 từ | Y trang A4
**Thời gian viết:** Z phần (mỗi phần submit riêng để User review)
```

### Bước 3: Xác nhận và triển khai

**Quy trình tương tác:**

1. **Gửi dàn ý cho User** → Hỏi: "Anh/chị duyệt cấu trúc này chưa? Cần thêm/bớt mục nào không?"
2. **User phản hồi** → Điều chỉnh dàn ý nếu cần.
3. **Sau khi duyệt dàn ý** → **HỎI NGAY:**
   > "Anh/chị muốn em viết theo cách nào?"
   > - **A) Duyệt từng phần:** Em viết Phần I trước, anh duyệt xong em mới viết tiếp Phần II.
   > - **B) Viết toàn bộ trước:** Em viết hết tất cả các phần, anh duyệt một lần cuối.
4. **Nếu chọn A (Duyệt từng phần):**
   - Viết **từng phần một**, mỗi phần submit riêng.
   - Lặp lại cho đến khi hoàn thành toàn bộ báo cáo.
5. **Nếu chọn B (Viết toàn bộ):**
   - Viết hết tất cả các phần theo dàn ý đã duyệt.
   - Gửi toàn bộ bản nháp cho User review một lần.

---

## Nguyên tắc lập dàn ý tốt

### 1. Logic MECE (Mutually Exclusive, Collectively Exhaustive)
- Mỗi mục **không trùng lặp** với mục khác.
- Tất cả các mục **phủ hết** phạm vi báo cáo.

### 2. Cấu trúc kim tự tháp (Pyramid Principle)
- Kết luận / Insight quan trọng nhất → đưa lên trước.
- Chi tiết bổ sung → theo sau.
- Áp dụng cho từng phần lẫn toàn bộ báo cáo.

### 3. Đánh số nhất quán
- Dùng hệ thống I, II, III cho mục lớn.
- Dùng 1.1, 1.2 cho mục con.
- Dùng a), b), c) cho chi tiết nhỏ.

### 4. Mỗi mục có "câu hỏi trung tâm"
Mỗi heading phải trả lời được một câu hỏi cụ thể. Nếu không trả lời được → mục đó thừa.

| Heading | Câu hỏi trung tâm |
| :--- | :--- |
| I. Mở đầu | Tại sao báo cáo này tồn tại? |
| II. Phân tích hiện trạng | Tình hình hiện tại như thế nào? |
| III. Đánh giá tác động | Thay đổi này ảnh hưởng gì? |
| IV. Kiến nghị | Cần làm gì tiếp theo? |

---

## Mẫu dàn ý theo loại báo cáo

### A. Báo cáo đánh giá tác động (Impact Assessment)
```
I.   Mở đầu (Bối cảnh, mục tiêu, phạm vi)
II.  Tổng quan đối tượng (Luật/Chính sách/Sự kiện cần đánh giá)
III. Phân tích tác động theo từng lĩnh vực
     - 3.1 Tác động tới lĩnh vực A
     - 3.2 Tác động tới lĩnh vực B
     - 3.3 Tác động tới lĩnh vực C
IV.  Đánh giá tổng hợp (Cơ hội vs Rủi ro)
V.   Kết luận và kiến nghị
```

### B. Báo cáo nghiên cứu thị trường (Market Research)
```
I.   Tóm tắt quản trị (Executive summary)
II.  Phương pháp nghiên cứu
III. Phân tích thị trường (Quy mô, xu hướng, cạnh tranh)
IV.  Phân tích khách hàng
V.   Cơ hội và thách thức
VI.  Chiến lược đề xuất
```

### C. Đề xuất chiến lược / Tờ trình (Strategic Proposal)
```
I.   Hiện trạng và vấn đề
II.  Mục tiêu đề xuất
III. Giải pháp chi tiết
IV.  Lộ trình triển khai
V.   Ngân sách và nguồn lực
VI.  Rủi ro và biện pháp giảm thiểu
VII. Kiến nghị phê duyệt
```

---

**Token budget:** ~1,500 tokens
**Vai trò:** Chuẩn bị cấu trúc trước khi viết
**Nguyên tắc:** Dàn ý phải được User duyệt. Không viết nội dung khi chưa có dàn ý.
