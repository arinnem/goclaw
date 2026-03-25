---
title: "Báo cáo phân tích mô hình tài chính - HHDLQG Visit Vietnam"
version: 1
created: 2026-03-20
source_file: "20250718_HHDLQG_Financial Projection 5 Years.xlsx"
model_type: "Revenue Model (Top-down 5 năm kèm DCF)"
---

# Báo cáo phân tích mô hình tài chính
## HHDLQG - Visit Vietnam (Dự phóng 5 năm)

---

## Tóm tắt phát hiện chính

### Điểm chất lượng mô hình: 3,0/10 — Hạng D

Mô hình tài chính này dự phóng doanh thu của nền tảng Visit Vietnam từ 0 lên 987 tỷ VND trong 6 năm (2025–2030), với IRR 150% và NPV@10% đạt 833 tỷ VND. Tuy nhiên, toàn bộ kết quả đầu ra đều dựa trên các giả định chưa có cơ sở kiểm chứng, đồng thời mô hình thiếu nhiều thành phần thiết yếu của một financial model chuẩn.

### Phát hiện nghiêm trọng

1. IRR 150% và ROI 3.394% vượt xa mọi benchmark thực tế, cho thấy các giả định đầu vào chưa sát thị trường.
2. Mô hình không áp dụng thuế thu nhập doanh nghiệp (CIT 20%), khiến toàn bộ chỉ số lợi nhuận bị thổi phồng ít nhất 20%.
3. Hai công thức NPV (@10% và @15%) sử dụng logic khác nhau, trong đó NPV @15% tham chiếu sai ô dữ liệu (dùng dòng tiền tích lũy thay vì dòng tiền năm đầu).
4. Số lượng doanh nghiệp tham gia tăng từ 10 lên 7.000 trong 5 năm (700 lần), không có phân tích bottom-up hay dữ liệu thị trường hỗ trợ.
5. Ngân sách trong Tờ trình Visit Vietnam 2026 (khoảng 29,5 tỷ VND) chênh lệch khoảng 12 tỷ VND so với tổng chi phí năm đầu trong Excel (17,7 tỷ VND).

### Phát hiện quan trọng

1. CAPEX chỉ 5,28 tỷ VND một lần duy nhất, không có chi phí bảo trì hoặc nâng cấp hệ thống cho 5 năm tiếp theo.
2. Biên lợi nhuận đạt 94% vào năm 2030, ngụ ý chi phí cận biên gần bằng 0 cho một nền tảng phục vụ 7.000 doanh nghiệp.
3. Không có bảng cân đối kế toán, không có lịch vốn lưu động, không có kịch bản xấu (bear case).

### Kết luận

Mô hình này chưa đủ tin cậy để làm cơ sở ra quyết định đầu tư. Trước khi sử dụng, cần ít nhất: (a) bổ sung thuế 20%, (b) sửa công thức NPV, (c) xây dựng mô hình doanh thu bottom-up có dữ liệu thị trường, và (d) thêm kịch bản xấu với các giả định thận trọng.

---

## Mục lục

1. [Tổng quan và bối cảnh](#1-tổng-quan-và-bối-cảnh)
2. [Phương pháp phân tích](#2-phương-pháp-phân-tích)
3. [Kiến trúc mô hình](#3-kiến-trúc-mô-hình)
4. [Giải thích mô hình kinh doanh](#4-giải-thích-mô-hình-kinh-doanh)
5. [Phân tích giả định](#5-phân-tích-giả-định)
6. [Phân tích tài chính](#6-phân-tích-tài-chính)
7. [Đánh giá rủi ro và độ nhạy](#7-đánh-giá-rủi-ro-và-độ-nhạy)
8. [Chất lượng mô hình](#8-chất-lượng-mô-hình)
9. [Lộ trình cải thiện](#9-lộ-trình-cải-thiện)
10. [Yếu tố thiếu và khuyến nghị nâng cấp](#10-yếu-tố-thiếu-và-khuyến-nghị-nâng-cấp)
11. [Khuyến nghị và bước tiếp theo](#11-khuyến-nghị-và-bước-tiếp-theo)
12. [Phụ lục](#phụ-lục)

---

## 1. Tổng quan và bối cảnh

| Thông tin | Chi tiết |
|-----------|----------|
| Tên file | 20250718_HHDLQG_Financial Projection 5 Years.xlsx |
| Ngày tạo file | 18/07/2025 |
| Đơn vị lập | Hiệp hội Dữ liệu Quốc gia (HHDLQG/NDA) |
| Loại mô hình | Revenue Model top-down, kèm phân tích DCF |
| Mục đích | Dự phóng tài chính cho nền tảng Visit Vietnam, phục vụ phê duyệt ngân sách và kêu gọi đầu tư |
| Phạm vi | 6 năm (2025–2030), đơn vị tỷ VND |
| Tài liệu liên quan | Tờ trình dự án Visit Vietnam 2026 (16/03/2026) |

Mô hình bao gồm 2 phương án (Plan A và Plan B), mỗi phương án có bảng tổng hợp top-down, chi tiết CAPEX/OPEX và kế hoạch nguồn lực. Báo cáo này tập trung phân tích Plan A. Đối chiếu với Tờ trình Visit Vietnam 2026 được trình bày trong Phụ lục B.

---

## 2. Phương pháp phân tích

### Công cụ

File Excel được phân tích bằng script tự động (Python/openpyxl) để trích xuất toàn bộ công thức, giá trị tính toán, định dạng số và tham chiếu chéo giữa các sheet. Kết quả trích xuất được lưu dưới dạng JSON có cấu trúc, sau đó phân tích thủ công qua 8 giai đoạn.

### Tám giai đoạn phân tích

| Giai đoạn | Nội dung |
|-----------|----------|
| 0 | Nhập file và kiểm tra tính hợp lệ |
| 1 | Lập bản đồ cấu trúc (sheet map, dependency flow) |
| 2 | Trích xuất công thức và logic tính toán |
| 3 | Nhận diện loại mô hình |
| 4 | Phân tích định lượng (chỉ số tài chính, tăng trưởng) |
| 5 | Đánh giá rủi ro và độ nhạy |
| 6 | Chấm điểm chất lượng mô hình |
| 7 | Lộ trình cải thiện và yếu tố thiếu |

### Hệ thống chấm điểm

Mô hình được đánh giá trên 4 chiều, mỗi chiều tối đa 10 điểm: tính toàn vẹn cấu trúc, vệ sinh công thức, mức độ đầy đủ và khả năng kiểm toán. Điểm trung bình 4 chiều cho ra hạng từ A (8,0–10,0) đến F (0,0–1,9).

### Giới hạn

Phân tích này không kiểm chứng các giả định với dữ liệu thị trường thực tế, không thực hiện audit thực địa và không đánh giá tính khả thi kỹ thuật của nền tảng.

---

## 3. Kiến trúc mô hình

### 3.1 Bản đồ sheet

| Sheet | Vai trò | Kích thước | Nội dung chính |
|-------|---------|------------|----------------|
| Top Down Plan A | Đầu ra/Tổng hợp | 56×24 | Doanh thu, chi phí, EBITDA, P&L, FCF, NPV, IRR, ROI |
| Plan A CAPEX & OPEX | Đầu vào/Chi tiết | 36×7 | 12 hạng mục chi phí kèm ghi chú, bảng pivot tổng hợp |
| Plan A Kế hoạch nguồn lực | Đầu vào/Chi tiết | ~500×100 | Kế hoạch nhân sự theo vị trí |
| Top Down Plan B | Đầu ra/Tổng hợp | — | Kịch bản thay thế (quy mô nhỏ hơn) |
| Plan B CAPEX & OPEX | Đầu vào/Chi tiết | — | Chi tiết chi phí Plan B |
| Plan B Kế hoạch nguồn lực | Đầu vào/Chi tiết | — | Nhân sự Plan B |
| Chi phí nguồn lực | Dữ liệu gốc | — | Bảng lương/đơn giá tham chiếu |

### 3.2 Sơ đồ phụ thuộc

```
Plan A CAPEX & OPEX ──────────→ Top Down Plan A
Chi phí nguồn lực ──→ Plan A Kế hoạch nguồn lực ──→ Top Down Plan A
```

### 3.3 Ghi chú cấu trúc

- Trục thời gian nằm ngang (cột = năm, từ 2025 đến 2030)
- Hạt độ thời gian: theo năm (không có phân tích theo quý hoặc tháng)
- Bố cục 2 vùng trên sheet chính: cột A–O tách rời với mô hình chính ở cột P–X
- Không có sheet giả định riêng, các tham số đầu vào nằm rải rác trong sheet chính

---

## 4. Giải thích mô hình kinh doanh

### Loại hình và giá trị cốt lõi

Visit Vietnam được mô hình hóa như một nền tảng B2B do HHDLQG (Hiệp hội Dữ liệu Quốc gia) vận hành, phục vụ doanh nghiệp du lịch tại Việt Nam. Giá trị cốt lõi dựa trên ba trụ cột:

1. Chứng nhận chất lượng: doanh nghiệp đóng phí hàng năm để nhận chứng nhận "Visit Vietnam"
2. Trung gian giao dịch: nền tảng thu phí trên các giao dịch TMĐT du lịch đi qua hệ thống doanh nghiệp đã chứng nhận
3. Kinh doanh dữ liệu: lượt truy cập/khách hàng (VCR) được đóng gói và bán dưới dạng DaaS, kèm vị trí quảng cáo

Mô hình định vị HHDLQG như một nền tảng gắn với quy định. Tổ chức tận dụng vị thế hiệp hội để tạo tiêu chuẩn chứng nhận, sau đó kinh doanh từ hiệu ứng mạng lưới khi doanh nghiệp gia nhập.

### Cơ chế tạo doanh thu

| Nguồn doanh thu | Cơ chế | Định giá | Tỷ trọng 2030 |
|-----------------|--------|----------|---------------|
| Phí chứng nhận | Phí năm × số doanh nghiệp | 30 triệu/năm, tăng +15%/năm | ~25% |
| Phí giao dịch | % thị trường TMĐT du lịch × độ phủ | 1–2% take rate | ~60% |
| DaaS | Lượt VCR × đơn giá dữ liệu | Biến đổi theo triệu lượt | ~9% |
| Quảng cáo ưu tiên | Vị trí quảng cáo trên nền tảng | Biến đổi | ~6% |

Cơ cấu doanh thu thay đổi mạnh theo thời gian. Phí chứng nhận chiếm ưu thế giai đoạn đầu (nguồn duy nhất trong 2025–2026), nhưng phí giao dịch vượt lên từ 2028 khi độ phủ thị trường tăng. Đến 2030, phí giao dịch chiếm 60% tổng doanh thu, khiến toàn bộ mô hình phụ thuộc nặng vào giả định 25% độ phủ thị trường.

### Cơ cấu chi phí

Chi phí chủ yếu là OPEX cố định, rất ít thành phần biến đổi:

- Marketing và truyền thông: 6 tỷ/năm (hạng mục OPEX lớn nhất), cố định bất kể số doanh nghiệp
- Cloud và bản quyền phần mềm: 3,25 tỷ/năm, không tăng theo lưu lượng (560 triệu lượt trên hạ tầng 3,25 tỷ)
- Nhân sự: ~10,5 tỷ/năm, tăng theo kế hoạch tuyển dụng chứ không theo khối lượng hoạt động
- Đối ngoại: 0,4 tỷ/năm, cố định

Mô hình giả định đòn bẩy vận hành gần như tuyệt đối: chi phí tăng 2,3 lần trong khi doanh thu tăng 318 lần. Điều này ngụ ý chi phí cận biên bằng 0 khi phục vụ thêm doanh nghiệp, xử lý thêm giao dịch hay quản lý thêm dữ liệu.

### Câu chuyện tăng trưởng

Mô hình kể một câu chuyện tăng trưởng dựa trên quy định:

1. Giai đoạn hạt giống (2025): 10 doanh nghiệp thí điểm, xây dựng nền tảng
2. Tăng tốc (2026–2027): 100 → 500 doanh nghiệp qua chiến dịch chứng nhận
3. Điểm bẻ ngoặt (2028): 1.500 doanh nghiệp + 3% độ phủ = hòa vốn
4. Mở rộng (2029–2030): 4.000 → 7.000 doanh nghiệp, 15% → 25% độ phủ = lợi nhuận lớn

Không có pha bão hòa hay suy giảm nào được mô hình hóa. Tăng trưởng liên tục tăng tốc đến năm thứ 6.

### Đánh giá tính nhất quán

| Kiểm tra | Kết quả |
|----------|--------|
| Các nguồn doanh thu có bổ trợ? | ⚠️ Một phần: chứng nhận tạo nền tảng, nhưng nhảy lên 25% độ phủ thị trường đồng nghĩa Visit Vietnam phải trở thành một nền tảng booking/giao dịch lớn, đòi hỏi năng lực hoàn toàn khác so với chứng nhận |
| Cơ cấu chi phí phù hợp loại hình? | ❌ Nền tảng xử lý 2% TMĐT du lịch Việt Nam ($3+ tỷ USD) cần hạ tầng thanh toán, phòng chống gian lận, hỗ trợ khách hàng mở rộng, nhưng không có hạng mục nào được mô hình hóa |
| Thiếu nguồn doanh thu? | ⚠️ Nền tảng chứng nhận có thể thu thêm phí đào tạo, kiểm toán, tái chứng nhận, tư vấn. Không có trong mô hình |
| Thiếu chi phí? | ❌ Không có phí xử lý thanh toán (2–3% doanh thu giao dịch), chi phí thu hút khách hàng, mở rộng server cho 560 triệu VCR, chi phí tuân thủ pháp lý cho xử lý dữ liệu (DaaS), chi phí quản lý đối tác |
| Câu chuyện tăng trưởng thực tế? | ❌ Mô hình gộp hai mô hình kinh doanh rất khác nhau: (1) tổ chức chứng nhận và (2) nền tảng giao dịch. Chuyển từ chứng nhận sang chiếm 25% TMĐT du lịch đòi hỏi năng lực tạo lập thị trường mà cơ cấu chi phí không tài trợ |

---

## 5. Phân tích giả định

### 4.1 Động lực doanh thu

| Giả định | 2025 | 2026 | 2027 | 2028 | 2029 | 2030 | Hợp lý? |
|----------|------|------|------|------|------|------|---------|
| Doanh nghiệp tích lũy | 10 | 100 | 500 | 1.500 | 4.000 | 7.000 | ❌ |
| Phí chứng nhận/DN (triệu VND) | 30 | 34,5 | 39,7 | 45,6 | 52,5 | 60,3 | ⚠️ |
| Quy mô TMĐT du lịch VN (tỷ VND) | 82.500 | 89.100 | 96.228 | 103.926 | 112.240 | 121.220 | ⚠️ |
| Độ phủ thị trường | 0% | 0% | 0,5% | 3% | 15% | 25% | ❌ |
| Tỉ lệ phí giao dịch | — | 0% | 1% | 2% | 2% | 2% | ⚠️ |
| Lượt VCR (triệu) | 0,6 | 4 | 25 | 90 | 280 | 560 | ❌ |

### 4.2 Động lực chi phí

| Giả định | 2025 | 2026 | 2027 | 2028 | 2029 | 2030 | Hợp lý? |
|----------|------|------|------|------|------|------|---------|
| CAPEX (tỷ VND) | 5,28 | 0 | 0 | 0 | 0 | 0 | ⚠️ |
| OPEX (tỷ VND) | 12,4 | 24,8 | 28,3 | 34,7 | 44,7 | 57,6 | ❌ |
| % tăng OPEX/năm | — | — | 14% | 22,8% | 28,6% | 28,9% | ⚠️ |

### 4.3 Thông số tài chính

| Thông số | Giá trị | Hợp lý? |
|----------|---------|---------|
| Tỉ lệ chiết khấu | 10% / 15% | ✅ |
| Khấu hao CAPEX | Đường thẳng 5 năm | ✅ |
| Thuế TNDN | 0% (không áp dụng) | ❌ |

### 4.4 Cảnh báo giả định

1. Số lượng doanh nghiệp tăng 700 lần trong 5 năm (10 → 7.000). Việt Nam có khoảng 40.000 doanh nghiệp du lịch; đạt 7.000 đồng nghĩa với 17,5% thị phần, rất khó cho một nền tảng chứng nhận mới chưa có tiền lệ.

2. Độ phủ thị trường 25% vào năm 2030, tương đương chiếm 1/4 toàn bộ thương mại điện tử du lịch Việt Nam ($3+ tỷ USD). Booking.com và Agoda mất hơn một thập kỷ để đạt mức tương tự tại các thị trường lớn.

3. Lượng truy cập VCR đạt 560 triệu lượt/năm vào 2030. Con số này đặt Visit Vietnam vào top 5 nền tảng du lịch toàn cầu. Để so sánh, Traveloka (toàn Đông Nam Á) đạt khoảng 160 triệu lượt/năm.

4. Thuế TNDN bằng 0% trong toàn bộ 6 năm. NOPAT được tính bằng đúng EBIT, nghĩa là mô hình bỏ qua hoàn toàn thuế suất 20% theo luật Việt Nam. Toàn bộ chỉ số lợi nhuận và DCF bị thổi phồng ít nhất 20%.

5. CAPEX chỉ 5,28 tỷ VND, đầu tư một lần. Xây dựng một hệ sinh thái dữ liệu du lịch quốc gia (TMĐT, DaaS, chứng nhận, gamification, booking API, cổng đối tác) với ngân sách tương đương khoảng $210.000 USD là thiếu thực tế. Con số này chưa đủ trả lương cho một đội kỹ sư trung bình trong 6 tháng.

6. OPEX tăng 2,3 lần (24,8 → 57,6 tỷ) trong khi doanh thu tăng 318 lần (3,1 → 987 tỷ). Điều này ngụ ý chi phí cận biên gần bằng 0, không phù hợp với một nền tảng cần hỗ trợ khách hàng, vận hành dữ liệu, tuân thủ bảo mật và quản lý đối tác cho 7.000 doanh nghiệp.

---

## 6. Phân tích tài chính

### 5.1 Tổng hợp chỉ số tài chính (tỷ VND)

| Chỉ số | 2025 | 2026 | 2027 | 2028 | 2029 | 2030 |
|--------|------|------|------|------|------|------|
| Doanh thu | 0 | 3,1 | 21,9 | 117,9 | 540,9 | 986,6 |
| OPEX | 12,4 | 24,8 | 28,3 | 34,7 | 44,7 | 57,6 |
| EBITDA | (12,4) | (21,7) | (6,4) | 83,2 | 496,3 | 929,1 |
| EBIT | (12,4) | (22,8) | (7,5) | 82,2 | 495,2 | 928,0 |
| P&L | (17,7) | (21,7) | (6,4) | 83,2 | 496,3 | 929,1 |
| FCF | (17,7) | (21,7) | (6,4) | 83,2 | 496,3 | 929,1 |
| Dòng tiền tích lũy | (17,7) | (39,4) | (45,8) | 37,4 | 533,7 | 1.462,8 |

### 5.2 Cơ cấu doanh thu

| Nguồn doanh thu | 5 năm (tỷ VND) | Tỷ trọng |
|------------------|-----------------|----------|
| Phí giao dịch | 1.010 | 60% |
| Phí chứng nhận & DV cơ bản | 377 | 23% |
| DaaS (dữ liệu như dịch vụ) | 156 | 9% |
| Quảng cáo ưu tiên | 128 | 8% |
| Tổng | 1.670 | 100% |

### 5.3 Chỉ số đầu ra chính

| Chỉ số | Giá trị | Đánh giá |
|--------|---------|----------|
| NPV @10% | 833 tỷ VND | Quá lạc quan do dựa trên giả định tăng trưởng thiếu thực tế ở năm 5–6 |
| NPV @15% | 642 tỷ VND | Cùng vấn đề; công thức còn sai (dùng S39 thay vì S38) |
| IRR | 150% | Bất kỳ IRR nào trên 100% trong mô hình 6 năm đều cần xem xét lại nghiêm túc |
| Payback | 3,55 năm | Ít ý nghĩa do chất lượng giả định |
| ROI | 3.394% | Không có nền tảng thực tế nào đạt mức này |
| Biên lợi nhuận (2030) | 94,2% | Tiệm cận 100%, ngụ ý không có chi phí doanh thu |

### 5.4 Kiểm tra tính nhất quán

- [ ] Bảng cân đối kế toán: không có
- [ ] Dòng tiền đối chiếu: EBITDA = P&L = FCF từ năm 2028 trở đi (không có biến động vốn lưu động, không có CAPEX bổ sung, không có thuế)
- [x] Khấu hao nhất quán với CAPEX: đúng (5,28 tỷ / 5 năm = 1,056 tỷ/năm)

### 5.5 Bất thường và xu hướng

Doanh thu tăng theo hình hockey stick: +604% (2026→2027), +439% (2027→2028) và +359% (2028→2029). Đường cong này không có giai đoạn phát triển thị trường thực tế, khách hàng không có thời gian thử nghiệm, đánh giá và quyết định.

EBITDA = P&L = FCF trong các năm 2028–2030, cho thấy mô hình chỉ là phép trừ đơn giản (doanh thu − chi phí), không phải mô hình tài chính hoàn chỉnh.

Hai công thức NPV dùng logic khác nhau:
- NPV @10% = `NPV(0.1, S38:X38) + S38` (đúng về ý tưởng nhưng double-count năm đầu)
- NPV @15% = `NPV(0.15, S38:X38) + S39` (sai: S39 là dòng tiền tích lũy, không phải FCF năm đầu)

---

## 7. Đánh giá rủi ro và độ nhạy

### 6.1 Top 5 yếu tố nhạy cảm

| TT | Giả định | Giá trị gốc | Nếu giảm 50% | Tác động |
|----|----------|-------------|---------------|----------|
| 1 | Số doanh nghiệp (2030) | 7.000 | 3.500 | Doanh thu phí chứng nhận giảm ~50%; có thể không bao giờ hòa vốn |
| 2 | Độ phủ thị trường (2030) | 25% | 12,5% | Doanh thu phí giao dịch (nguồn lớn nhất) giảm ~50% |
| 3 | Tăng trưởng phí chứng nhận | +15%/năm | +7,5%/năm | Doanh thu chứng nhận giảm ~30% |
| 4 | Lượt VCR | 560 triệu | 280 triệu | Doanh thu DaaS giảm một nửa |
| 5 | Tăng trưởng OPEX | ~29%/năm | ~45%/năm | Điểm hòa vốn lùi thêm 1+ năm |

### 6.2 Cờ rủi ro

| Rủi ro | Mức độ | Chi tiết |
|--------|--------|----------|
| Dự phóng doanh thu thiếu cơ sở | 🔴 | Không có phân tích bottom-up, không có so sánh ngành, không có phương pháp định lượng thị trường |
| Không tính thuế | 🔴 | Thổi phồng toàn bộ chỉ số lợi nhuận tối thiểu 20% |
| Lỗi công thức NPV | 🔴 | Hai công thức NPV cho kết quả không nhất quán; có thể cả hai đều sai |
| Không có kịch bản xấu | 🔴 | Chỉ có Plan A và Plan B, không có bear case hay kịch bản thất bại |
| Bỏ qua vốn lưu động | 🟡 | Nền tảng thu phí cần mô hình hóa khoản phải thu/phải trả |
| Thiếu giá vốn hàng bán | 🟡 | Doanh thu phí giao dịch phải chịu chi phí xử lý thanh toán (2–3%), chi phí server tăng theo lưu lượng |
| CAPEX thiếu thực tế | 🟡 | 5,28 tỷ VND không đủ để xây dựng nền tảng ở quy mô được mô tả |

### 6.3 So sánh kịch bản

Mô hình có Plan A và Plan B nhưng cả hai đều là kịch bản lạc quan. Không có kịch bản thận trọng (bear case) hay kịch bản thất bại.

### 6.4 Phân tích hòa vốn

Theo mô hình, dòng tiền tích lũy chuyển dương trong năm 2028 (năm thứ 4). Tuy nhiên, điều này phụ thuộc hoàn toàn vào giả định 1.500 doanh nghiệp tích lũy và 3% độ phủ thị trường vào năm 2028 — cả hai đều chưa có bằng chứng hỗ trợ.

---

## 8. Chất lượng mô hình

| Chiều đánh giá | Điểm | Ghi chú |
|----------------|------|---------|
| Tính toàn vẹn cấu trúc | 4/10 | Bố cục 2 vùng (A–O vs P–X) gây nhầm lẫn. Không có sheet giả định riêng |
| Vệ sinh công thức | 3/10 | Tỉ lệ tăng trưởng hard-coded trong công thức (`=S12*1.15`, `=S13*108%`); NPV không nhất quán; không có kiểm tra lỗi |
| Mức độ đầy đủ | 2/10 | Thiếu bảng cân đối kế toán, vốn lưu động, thuế, giá vốn, phân tích kịch bản, bảng độ nhạy |
| Khả năng kiểm toán | 3/10 | Không phân biệt màu giữa ô đầu vào và công thức; không có tài liệu giải thích; không dùng named ranges |
| Tổng | 3,0/10 — Hạng D | Vấn đề nghiêm trọng, cần thận trọng khi sử dụng |

---

## 9. Lộ trình cải thiện

### 8.1 Công thức và logic

| # | Vấn đề hiện tại | Vị trí | Cách sửa | Ưu tiên |
|---|-----------------|--------|----------|---------|
| 1 | Tỉ lệ tăng trưởng phí gán cứng 15% | Top Down!T12:X12 | Tách ra ô giả định riêng, tham chiếu bằng `$` | 🔴 |
| 2 | Tỉ lệ tăng trưởng TMĐT gán cứng 8% | Top Down!T13:X13 | Tương tự mục 1 | 🔴 |
| 3 | Hai công thức NPV không nhất quán | Top Down!R41 vs R42 | Thống nhất logic, sử dụng `+S38` cho cả hai | 🔴 |
| 4 | Tỉ lệ DaaS gán cứng (7,5%, 15%, 30%, 60%) | Top Down!U20:X20 | Tách ra bảng giả định | 🟡 |

### 8.2 Cấu trúc

| # | Hiện trạng | Cải thiện | Tác động |
|---|-----------|-----------|----------|
| 1 | Giả định nằm rải rác trong sheet chính | Tạo sheet "Giả định" riêng, tất cả tham số đầu vào tập trung tại đây | Kiểm toán |
| 2 | Không phân biệt ô đầu vào/công thức | Tô màu ô đầu vào (font xanh trên nền vàng) theo chuẩn FAST | Kiểm toán |
| 3 | Vùng A–O trên sheet chính không liên kết với mô hình | Xóa hoặc tích hợp rõ ràng | Dễ đọc |

### 8.3 Giả định

| # | Giả định hiện tại | Vấn đề | Cải thiện |
|---|-------------------|--------|-----------|
| 1 | Tăng trưởng doanh nghiệp tuyến tính | Không phản ánh đường cong S-curve thực tế | Dùng mô hình tăng trưởng theo pha: khởi động → tăng tốc → bão hòa |
| 2 | Thuế = 0% | Sai quy định | Áp dụng CIT 20%, có thể xem xét ưu đãi thuế nếu có cơ sở pháp lý |
| 3 | OPEX chỉ tăng theo % cố định | Chi phí vận hành nên gắn với quy mô hoạt động | Liên kết OPEX với số doanh nghiệp và lưu lượng giao dịch |

### 8.4 Trình bày

| # | Vấn đề | Cách sửa |
|---|--------|----------|
| 1 | Không có bảng tổng hợp dashboard | Thêm sheet dashboard với các chỉ số chính và biểu đồ |
| 2 | Định dạng số không nhất quán | Áp dụng format thống nhất (#,##0 cho số nguyên, 0.00% cho tỉ lệ) |
| 3 | Không có khu vực in | Đặt print area trên các sheet đầu ra |

---

## 10. Yếu tố thiếu và khuyến nghị nâng cấp

### 9.1 Cần bổ sung

| # | Yếu tố thiếu | Tại sao quan trọng | Mức công sức |
|---|--------------|--------------------|----|
| 1 | Bảng vốn lưu động | Dòng tiền hiện tại bị thổi phồng vì không tính biến động khoản phải thu/phải trả | Trung bình |
| 2 | Thuế TNDN 20% | Toàn bộ chỉ số lợi nhuận sai | Thấp |
| 3 | Giá vốn hàng bán (COGS) | Doanh thu phí giao dịch phải chịu phí xử lý thanh toán 2–3% | Thấp |
| 4 | Bảng độ nhạy | Người ra quyết định cần thấy biên độ kết quả, không chỉ một con số | Thấp |
| 5 | Kịch bản xấu (bear case) | Không có phân tích rủi suy giảm | Trung bình |
| 6 | Kinh tế đơn vị (unit economics) | CAC, LTV, payback trên mỗi doanh nghiệp | Trung bình |
| 7 | CAPEX duy trì cho năm 2–6 | Hệ thống kỹ thuật cần bảo trì liên tục | Thấp |

### 9.2 Cần loại bỏ hoặc đơn giản hóa

| # | Yếu tố | Lý do |
|---|--------|-------|
| 1 | Vùng A–O trên sheet chính | Không liên kết với mô hình, gây nhầm lẫn |
| 2 | ArrayFormula ở hàng 51–56 | Dữ liệu cho biểu đồ trùng lặp với bảng chính |

### 9.3 Cần tái cấu trúc

| # | Hiện trạng | Đề xuất | Lý do |
|---|-----------|---------|-------|
| 1 | Doanh thu và chi phí trên cùng sheet | Tách thành Revenue Schedule + Cost Schedule | Dễ kiểm toán |
| 2 | Kịch bản A/B bằng 2 bộ sheet riêng biệt | Dùng dropdown chuyển kịch bản trên 1 bộ sheet | Giảm lỗi, dễ so sánh |

### 9.4 Ma trận ưu tiên

| Ưu tiên | Nội dung | Lý do |
|---------|----------|-------|
| 🔴 Phải có | Sửa NPV, thêm thuế 20%, thêm COGS, thêm bear case | Không có những mục này, kết quả mô hình có thể gây hiểu nhầm |
| 🟡 Nên có | Sheet giả định riêng, bảng độ nhạy, vốn lưu động, phân biệt màu ô | Mô hình vẫn chạy nhưng khó kiểm toán và thiếu độ tin cậy |
| 🟢 Nên thêm | Kinh tế đơn vị, hạt độ theo tháng cho năm 1–2, bảng cân đối kế toán | Nâng cấp chuyên nghiệp cho trình bày hội đồng hoặc nhà đầu tư |

---

## 11. Khuyến nghị và bước tiếp theo

### 11.1 Cho người ra quyết định

1. Không nên phê duyệt ngân sách dựa trên mô hình này trong trạng thái hiện tại. IRR 150% và ROI 3.394% không phản ánh thực tế.

2. Yêu cầu xây dựng mô hình doanh thu bottom-up, bao gồm danh sách khách hàng mục tiêu có tên, thư bày tỏ ý định (LOI), phân tích cạnh tranh và phễu chuyển đổi thực tế.

3. Yêu cầu mô hình có thuế: mô hình hiện tại bỏ qua hoàn toàn CIT 20%, khiến mọi chỉ số lợi nhuận bị sai.

4. Làm rõ chênh lệch ngân sách giữa Tờ trình (29,5 tỷ VND) và mô hình Excel (17,7 tỷ VND năm đầu). Con số nào là tài liệu gốc?

5. Yêu cầu kịch bản xấu: nếu chỉ 500 doanh nghiệp đăng ký (thay vì 7.000), hoặc độ phủ thị trường chỉ đạt 2% (thay vì 25%), bức tranh tài chính ra sao?

### 11.2 Cho người xây dựng mô hình

Ưu tiên 1 (phải sửa trước phiên bản tiếp):
- Sửa công thức NPV cho nhất quán
- Thêm CIT 20% vào phép tính NOPAT
- Thêm COGS cho doanh thu phí giao dịch
- Thêm bảng vốn lưu động
- Xây dựng kịch bản xấu

Ưu tiên 2 (trong lần cập nhật tiếp theo):
- Tách giả định ra sheet riêng
- Thêm bảng độ nhạy (data table) cho số doanh nghiệp và độ phủ thị trường
- Thêm CAPEX bảo trì cho năm 2–6
- Kiểm chứng đường cong tăng trưởng doanh nghiệp với dữ liệu ngành

Ưu tiên 3 (khi có thời gian):
- Thêm bảng cân đối kế toán
- Thêm hạt độ theo tháng cho năm 1–2
- Thêm kinh tế đơn vị (CAC, LTV, payback trên mỗi doanh nghiệp)
- Phân biệt màu ô đầu vào và công thức

### 11.3 Phân tích bổ sung đề xuất

- Nghiên cứu so sánh thị trường (market comp) để kiểm chứng giả định phí chứng nhận
- Kiểm chứng quy mô TMĐT du lịch Việt Nam với nguồn độc lập (Statista, e-Conomy SEA)
- Xây dựng mô hình bottom-up từ danh sách khách hàng pilot và tỉ lệ chuyển đổi kỳ vọng

---

## Phụ lục

### A. Danh mục công thức chính

| Ô | Công thức | Loại | Giá trị |
|---|-----------|------|---------|
| R18 | `=SUM(S18:X18)` | Tổng hợp | 376,8 tỷ |
| T18 | `=T12*(T2-S2)/1000` | Tính toán | 3,1 tỷ |
| U19 | `=U13*U14*U15` | Tính toán | 4,8 tỷ |
| R22 | `=SUM(S22:X22)` | Tổng hợp | 1.670,5 tỷ |
| S30 | `=S22-S26` | Tính toán | (12,4) tỷ |
| R41 | `=NPV(0.1,S38:X38)+S38` | Tài chính | 833 tỷ |
| R42 | `=NPV(0.15,S38:X38)+S39` | Tài chính (sai) | 642 tỷ |
| R43 | `=IRR(S38:X38)` | Tài chính | 150% |
| R44 | `=3+ABS(U39)/V38` | Tính toán | 3,55 năm |

### B. Bảng đối chiếu với Tờ trình Visit Vietnam 2026

| Hạng mục | Tờ trình (16/03/2026) | Excel (18/07/2025) | Chênh lệch |
|----------|----------------------|-------------------|------------|
| Bảo mật (Pentest) | 220 triệu | 250 triệu | -30 triệu |
| Thương hiệu + sự kiện | 4.000 triệu | 4.000 triệu | ✅ |
| Cloud & bản quyền | 3.600 triệu | 3.250 triệu | +350 triệu |
| Truyền thông | 6.000 triệu | 6.000 triệu | ✅ |
| Đối ngoại | 400 triệu | 400 triệu | ✅ |
| Đánh giá thí điểm | 200 triệu | 200 triệu | ✅ |
| Tư vấn pháp lý | Không có | 240 triệu | Thiếu trong Tờ trình |
| Quy trình & công cụ | Không có | 100 triệu | Thiếu trong Tờ trình |
| Dự phòng 15% | 3.850 triệu | Không có | Chỉ trong Tờ trình |
| Tổng (trước dự phòng) | ~25.670 triệu | ~24.810 triệu | ~860 triệu |
| Tổng chi phí năm đầu | ~29.500 triệu* | ~17.685 triệu** | ~12.000 triệu |

\* Bao gồm dự phòng 15%
\*\* CAPEX 5,28 tỷ + OPEX 12,4 tỷ (6 tháng)

Chênh lệch khoảng 12 tỷ VND giữa hai tài liệu chưa được giải thích. Có thể do khác phạm vi, khác giả định nhân sự, hoặc Tờ trình tính toàn bộ năm trong khi Excel chỉ tính 6 tháng cho OPEX năm đầu.

### C. Thuật ngữ

| Thuật ngữ | Giải thích |
|-----------|-----------|
| CAPEX | Chi phí đầu tư vốn, thường là tài sản cố định |
| OPEX | Chi phí vận hành thường xuyên |
| EBITDA | Lợi nhuận trước lãi vay, thuế, khấu hao |
| EBIT | Lợi nhuận trước lãi vay và thuế |
| NOPAT | Lợi nhuận hoạt động ròng sau thuế |
| FCF | Dòng tiền tự do |
| NPV | Giá trị hiện tại ròng |
| IRR | Tỉ suất hoàn vốn nội bộ |
| DaaS | Data as a Service (dữ liệu như dịch vụ) |
| VCR | Visitor/Customer Record (lượt truy cập/khách hàng) |
| CIT | Corporate Income Tax (thuế thu nhập doanh nghiệp) |
| COGS | Cost of Goods Sold (giá vốn hàng bán) |
| TMĐT | Thương mại điện tử |
