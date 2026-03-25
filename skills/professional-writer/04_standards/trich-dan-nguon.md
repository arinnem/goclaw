# Quy Tắc Trích Dẫn Nguồn (Citation)

**Module:** Standard (Optional)  
**Mục đích:** Đảm bảo tính chính xác và minh bạch của thông tin trong các báo cáo chuyên sâu.  
**Liên kết:** Truớc khi cite, đánh giá nguồn bằng CRAAP Test (xem `04_standards/kiem-chung.md` → Bước 1.5)

## Khi Nào Load Module Này

**Load khi:**
- User yêu cầu "Có trích dẫn", "Reference", "Nguồn".
- Bài viết dạng Nghiên cứu (Research), Báo cáo (Report), Whitepaper.
- Khi User xác nhận "CÓ" sau khi Agent hỏi "Bạn có cần trích dẫn nguồn không?".

---

## 1. Nguyên Tắc "Exact State"

Khi trích dẫn từ một tài liệu cụ thể (PDF, Web, Doc), phải đảm bảo người đọc có thể tìm lại được chính xác vị trí thông tin.

**Yêu cầu bắt buộc:**
1. **Tên nguồn:** Tên tài liệu, bài báo, tác giả.
2. **Vị trí (Locator):** Số trang (Page), số chương (Section), hoặc Timestamp (Video).
3. **Link (nếu có):** URL đến tài liệu gốc.

## 2. Định Dạng Trích Dẫn

Chọn 1 trong 3 format sau (thống nhất toàn bài):

### Format A: Inline (Dùng cho Báo cáo ngắn)
Ghi nguồn ngay trong câu văn.

- `Theo Báo cáo Thương mại Điện tử 2024 (trang 15), quy mô thị trường đạt 20 tỷ USD.`
- `Ông Nguyễn Văn A khẳng định tại Hội nghị Tech Summit (phút 15:30): "AI là tương lai."`

### Format B: Footnote (Dùng cho Bài viết chuyên sâu)
Dùng số đánh dấu `[^n]` và liệt kê ở cuối bài.

- `Quy mô thị trường thương mại điện tử Việt Nam đạt 20 tỷ USD vào năm 2024[^1].`
- ...
- `[^1]: Báo cáo Thương mại Điện tử Việt Nam 2024, Bộ Công Thương, Trang 15.`

### Format C: Academic / IEEE (Dùng cho Tài liệu Kỹ thuật)
Dùng ngoặc vuông `[n]`.

- `Mô hình Transformer đã thay đổi cách xử lý ngôn ngữ tự nhiên [1].`
- ...
- `[1] Vaswani et al., "Attention Is All You Need", 2017, NeurIPS, Page 5984.`

### Format D: Legal / Văn Bản Luật (BẮT BUỘC Chi Tiết)

Với văn bản quy phạm pháp luật, **PHẢI** trích dẫn chính xác đến Điểm, Khoản, Điều.

**Cấu trúc:**
`[Điểm...], [Khoản...], [Điều...], [Tên văn bản đầy đủ + Số/Ký hiệu]`

**Ví dụ:**
- ✅ `Theo điểm b, khoản 1, Điều 5, Nghị định 100/2019/NĐ-CP...`
- ✅ `Căn cứ Nghị quyết 98/2023/QH15 về thí điểm cơ chế đặc thù...`
- ❌ `Theo luật doanh nghiệp mới...` (Quá chung chung)
- ❌ `Theo Nghị định 100...` (Thiếu số hiệu/năm đầy đủ)

**Thứ tự ưu tiên:**
1. Điểm (Point) -> Khoản (Item/Clause) -> Điều (Article)
2. Văn bản (Law/Decree/Circular) + Số hiệu

## 3. Quy Tắc "Quote" (Trích nguyên văn)

Khi trích nguyên văn lời nói hoặc đoạn văn, phải đặt trong ngoặc kép `""` và không sửa đổi nội dung.

❌ **SAI:**
- Nguồn: "Tôi nghĩ thị trường sẽ hồi phục vào Q3."
- Viết: Chuyên gia cho rằng thị trường chắc chắn hồi phục mùa thu này. (Sai nghĩa)

✅ **ĐÚNG:**
- Chuyên gia nhận định: "Tôi nghĩ thị trường sẽ hồi phục vào Q3."

## 4. Checklist Kiểm Tra

- [ ] Đã đánh giá nguồn qua CRAAP Test? (xem `kiem-chung.md`)
- [ ] Nguồn đạt ≥ 30/50 CRAAP?
- [ ] Thông tin này lấy từ đâu? (Source)
- [ ] Ở trang nào/đoạn nào? (Locator)
- [ ] Có link kiểm chứng không? (Proof)
- [ ] Nếu là số liệu quan trọng, đã cross-check chưa?

---

**Token budget:** ~500 tokens  
**Độ tự do:** Thấp (Strict accuracy)  
**Version:** 2.0 (with CRAAP reference)
