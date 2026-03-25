---
title: "Hướng dẫn chi tiết xây dựng mô hình tài chính Visit Vietnam trong Excel"
version: 1
created: 2026-03-21
style: technical-academic
---

# Hướng dẫn chi tiết xây dựng mô hình tài chính Visit Vietnam trong Excel

> Tài liệu này mô tả từng bước cách xây dựng mô hình tài chính 13 trang tính (sheet) cho dự án Visit Vietnam, từ thiết lập giả định (Assumptions) đến phân tích kịch bản (Scenarios). Mô hình sử dụng **named ranges** xuyên suốt, không hardcode, và tuân thủ chuẩn thẩm định đầu tư.

---

## Mục lục

1. [Tổng quan kiến trúc mô hình](#1-tổng-quan-kiến-trúc-mô-hình)
2. [Quy ước và nguyên tắc thiết kế](#2-quy-ước-và-nguyên-tắc-thiết-kế)
3. [Sheet 1: Assumptions — Giả định](#3-sheet-1-assumptions--giả-định)
4. [Sheet 2: Initial Investment — Đầu tư ban đầu](#4-sheet-2-initial-investment--đầu-tư-ban-đầu)
5. [Sheet 3: HR Plan — Kế hoạch nhân sự](#5-sheet-3-hr-plan--kế-hoạch-nhân-sự)
6. [Sheet 4: Market Sizing — Quy mô thị trường](#6-sheet-4-market-sizing--quy-mô-thị-trường)
7. [Sheet 5: Revenue Schedule — Bảng doanh thu](#7-sheet-5-revenue-schedule--bảng-doanh-thu)
8. [Sheet 6: Cost Schedule — Bảng chi phí](#8-sheet-6-cost-schedule--bảng-chi-phí)
9. [Sheet 7: P&L — Kết quả kinh doanh](#9-sheet-7-pl--kết-quả-kinh-doanh)
10. [Sheet 8: Cash Flow — Dòng tiền](#10-sheet-8-cash-flow--dòng-tiền)
11. [Sheet 9: DCF & Returns — Thẩm định](#11-sheet-9-dcf--returns--thẩm-định)
12. [Sheet 10: Scenarios — Kịch bản](#12-sheet-10-scenarios--kịch-bản)
13. [Sheet 11-12: Budget 2025 & 2026 — Ngân sách](#13-sheet-11-12-budget-2025--2026--ngân-sách)
14. [Sheet 13: Guide — Hướng dẫn sử dụng](#14-sheet-13-guide--hướng-dẫn-sử-dụng)
15. [Các lỗi thường gặp và cách khắc phục](#15-các-lỗi-thường-gặp-và-cách-khắc-phục)
16. [Checklist hoàn thiện mô hình](#16-checklist-hoàn-thiện-mô-hình)

---

## 1. Tổng quan kiến trúc mô hình

### 1.1 Cấu trúc 13 sheet

Mô hình gồm 4 lớp logic, theo thứ tự phụ thuộc từ trên xuống:

```
┌─────────────────────────────────────────────────────────────┐
│                    LỚP 1: ĐẦU VÀO (INPUT)                  │
│  Assumptions │ Initial Investment │ HR Plan                  │
│  49 named ranges, ô vàng = chỉnh được                      │
└───────────────────┬─────────────────────────────────────────┘
                    ↓ named ranges + cross-sheet refs
┌─────────────────────────────────────────────────────────────┐
│                LỚP 2: TÍNH TOÁN (CALCULATION)               │
│  Market Sizing │ Revenue Schedule │ Cost Schedule            │
│  S-curve, 6 nguồn thu, CAPEX+OPEX                          │
└───────────────────┬─────────────────────────────────────────┘
                    ↓ cross-sheet references
┌─────────────────────────────────────────────────────────────┐
│                 LỚP 3: KẾT QUẢ (OUTPUT)                    │
│  P&L │ Cash Flow │ DCF & Returns                            │
│  Báo cáo tài chính chuẩn, NPV/IRR                          │
└───────────────────┬─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│              LỚP 4: PHÂN TÍCH (ANALYSIS)                    │
│  Scenarios │ Budget 2025 │ Budget 2026 │ Guide              │
│  5 kịch bản, ngân sách tháng, thuật ngữ                    │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Dòng chảy dữ liệu

Mọi con số trong mô hình đều bắt nguồn từ 3 sheet đầu vào:

- **Assumptions** → cung cấp 49 tham số qua named ranges (VD: `cert_fee_yr1`, `cit_rate`)
- **Initial Investment** → cung cấp tổng CAPEX qua named range `capex_total`
- **HR Plan** → cung cấp chi phí nhân sự qua tham chiếu chéo (cross-sheet reference)

Thay đổi bất kỳ ô vàng nào trong 3 sheet này → toàn bộ mô hình tự cập nhật.

### 1.3 Cấu trúc thời gian

Mô hình sử dụng 42 cột thời gian:

| Giai đoạn | Đơn vị | Số cột | Cột bắt đầu |
|-----------|--------|--------|-------------|
| Th7/2025 – Th12/2025 | Tháng | 6 | C |
| Th1/2026 – Th12/2026 | Tháng | 12 | I |
| Th1/2027 – Th12/2027 | Tháng | 12 | U |
| Q1/2028 – Q4/2030 | Quý | 12 | AG |
| | | **Tổng: 42** | |

**Lý do thiết kế:** Giai đoạn xây dựng (2025-2027) cần theo dõi tháng để kiểm soát ngân sách. Giai đoạn vận hành (2028-2030) chuyển sang quý vì xu hướng ổn định hơn.

---

## 2. Quy ước và nguyên tắc thiết kế

### 2.1 Mã màu ô (Cell color convention)

| Màu nền | Màu chữ | Ý nghĩa | Hành động |
|---------|---------|---------|-----------|
| 🟡 Vàng (FFFFCC) | Xanh dương (0000FF) | **Đầu vào** — placeholder chỉnh được | Sửa giá trị tại đây |
| 🟢 Xanh lá (E2EFDA) | Đen đậm | **Tổng / Subtotal** — công thức | Không sửa |
| 🔵 Xanh đậm (1F4E79) | Trắng | **Tiêu đề cột/mục** | Không sửa |
| ⬜ Trắng | Đen | **Công thức** — tính từ đầu vào | Không sửa |
| Xanh nhạt (D6E4F0) | Xanh đậm | **Tiêu đề phần** | Không sửa |

### 2.2 Nguyên tắc Named Ranges

**Named range** là tên gán cho một ô cụ thể trong Excel, giúp công thức dễ đọc:

```
Thay vì:  =Assumptions!$B$26 * Assumptions!$B$28
Viết:     =cert_fee_yr1 * tx_take_rate
```

**Cách tạo named range trong Excel:**
1. Chọn ô cần đặt tên (VD: ô B26 trong sheet Assumptions)
2. Vào **Formulas → Name Manager → New**
3. Nhập tên (VD: `cert_fee_yr1`), Refers to: `=Assumptions!$B$26`
4. OK

**Quy tắc đặt tên:**
- Viết thường, dùng gạch dưới: `cert_fee_yr1`, `adoption_max`
- Không dùng dấu cách hoặc ký tự đặc biệt
- Tên phải tự giải thích: `salary_dev` rõ hơn `sd1`

### 2.3 Nguyên tắc "Không Hardcode"

**Mọi con số trong công thức đều phải tham chiếu**, không gõ trực tiếp:

```
❌ SAI:   =B5 * 30 / 12                     ← 30 là gì? 12 là gì?
✅ ĐÚNG:  =B5 * cert_fee_yr1 / period_div   ← rõ ràng, thay đổi được
```

**Ngoại lệ cho phép hardcode:**
- Hằng số toán học: `1000000` (chuyển đổi đơn vị), `365` (ngày/năm), `12` (tháng/năm)
- Năm cố định trong tiêu đề: `2028` (chỉ dùng trong label, không trong tính toán)

### 2.4 Công thức tham chiếu chéo (Cross-sheet reference)

Khi sheet A cần dữ liệu từ sheet B, sử dụng cú pháp:

```
='Tên Sheet'!Ô
```

Ví dụ:
```
='Market Sizing'!C15        ← ô C15 trong Market Sizing
='HR Plan'!C28              ← ô C28 trong HR Plan
```

---

## 3. Sheet 1: Assumptions — Giả định

### 3.1 Mục đích

Tập trung **tất cả** tham số đầu vào vào một nơi duy nhất. Người dùng chỉ cần mở sheet này để thay đổi toàn bộ mô hình.

### 3.2 Cấu trúc

Sheet gồm 7 nhóm tham số, mỗi nhóm có 4 cột:

| Cột A | Cột B | Cột C | Cột D |
|-------|-------|-------|-------|
| Tên tham số | Giá trị (ô vàng) | Đơn vị | Ghi chú |

### 3.3 Danh sách 49 named ranges

#### Nhóm 1: Thời gian (2 tham số)

| Named range | Mô tả | Giá trị mặc định | Dùng trong |
|-------------|--------|-------------------|------------|
| `base_year` | Năm bắt đầu dự án | 2025 | Market Sizing (tính year fraction) |
| `start_month` | Tháng bắt đầu | 7 (Tháng 7) | Market Sizing (tính year fraction) |

**Cách tính year fraction (năm phân số):**
```
= base_year + (start_month - 1 + period_index) / 12
```
Ví dụ: Tháng 7/2025 → `= 2025 + (7 - 1 + 0) / 12 = 2025.500`

#### Nhóm 2: Thị trường (4 tham số)

| Named range | Mô tả | Giá trị | Nguồn |
|-------------|--------|---------|-------|
| `TAM_enterprises` | Tổng DN du lịch VN | 40,000 | GSO/VNAT |
| `SAM_enterprises` | DN phục vụ được | 15,000 | Báo cáo ngành |
| `ecom_market_base` | Thị trường TMĐT du lịch | 82,500 Tỷ VND | e-Conomy SEA |
| `ecom_growth_rate` | Tăng trưởng/năm | 8% | Dữ liệu lịch sử |

#### Nhóm 3: Đường cong tăng trưởng (5 tham số)

| Named range | Mô tả | Giá trị | Ảnh hưởng |
|-------------|--------|---------|-----------|
| `adoption_max` | Trần DN tối đa | 1,200 | **#1** — ảnh hưởng mọi doanh thu |
| `adoption_midpoint` | Năm tăng nhanh nhất | 2028 | Thời điểm đường cong dốc nhất |
| `adoption_steepness` | Hệ số dốc | 0.9 | Tốc độ tăng trưởng |
| `pilot_count` | DN thí điểm ban đầu | 15 | Sàn tối thiểu |
| `churn_rate` | Tỷ lệ không gia hạn | 20% | **#3** — giảm DN ròng |

**Công thức S-curve:**
```
= MAX(pilot_count, adoption_max / (1 + EXP(-adoption_steepness * (year_frac - adoption_midpoint))))
```

#### Nhóm 4: Giá dịch vụ (10 tham số)

| Named range | Mô tả | Giá trị |
|-------------|--------|---------|
| `cert_fee_yr1` | Phí chứng nhận/DN/năm | 25 Tr VND |
| `cert_fee_escalation` | Tăng phí/năm | 5% |
| `tx_take_rate` | Hoa hồng giao dịch | 2% GMV |
| `platform_market_share` | Thị phần GMV | 0.5% |
| `daas_price` | Giá DaaS/triệu VCR | 30 Tr VND |
| `ad_cpm` | CPM quảng cáo | 150 K VND |
| `ad_impressions_base` | Lượt hiển thị/tháng | 500K |
| `training_fee` | Phí đào tạo/phiên | 15 Tr VND |
| `audit_fee` | Phí kiểm toán | 10 Tr VND |
| `training_pct` | % DN mua đào tạo | 30% |

#### Nhóm 5: Chi phí (15 tham số)

| Named range | Giá trị | Ghi chú |
|-------------|---------|---------|
| `capex_maintenance_pct` | 18% | % CAPEX/năm cho bảo trì |
| `opex_marketing` | 7,000 Tr | Marketing cơ sở/năm |
| `marketing_growth` | 15% | Tăng marketing/năm |
| `opex_cloud_base` | 3,250 Tr | Cloud cơ sở/năm |
| `cloud_per_1M_vcr` | 8 Tr | Chi phí biến đổi theo VCR |
| `vcr_per_enterprise` | 10,000 | Bản ghi/DN/tháng |
| `opex_external` | 400 Tr | Đối ngoại/năm |
| `opex_legal` | 240 Tr | Pháp lý/năm |
| `opex_branding` | 4,000 Tr | Thương hiệu/năm |
| `opex_security` | 250 Tr | Bảo mật/năm |
| `opex_pilot_eval` | 200 Tr | Đánh giá thí điểm (chỉ Y1) |
| `payment_proc_pct` | 2.5% | Phí cổng thanh toán |
| `opex_support_per_ent` | 2 Tr | Hỗ trợ KH/DN/năm |
| `opex_partner_mgmt` | 500 Tr | Quản lý đối tác/năm |
| `opex_contingency_pct` | 10% | Dự phòng % OPEX |

#### Nhóm 6: Nhân sự (7 tham số)

| Named range | Giá trị | Ghi chú |
|-------------|---------|---------|
| `salary_mgmt` | 45 Tr | Lương TB/tháng — Quản lý |
| `salary_dev` | 35 Tr | Lương TB/tháng — Phát triển |
| `salary_bizops` | 20 Tr | Lương TB/tháng — Vận hành |
| `salary_data` | 40 Tr | Lương TB/tháng — Dữ liệu |
| `salary_escalation` | 10% | Tăng lương/năm |
| `bhxh_rate` | 21.5% | BHXH + BHYT + BHTN (phần DN) |
| `recruit_cost_pct` | 20% | Phí tuyển dụng (% lương năm) |

#### Nhóm 7: Tài chính (6 tham số)

| Named range | Giá trị | Ghi chú |
|-------------|---------|---------|
| `cit_rate` | 20% | Thuế TNDN (luật VN) |
| `discount_rate` | 15% | WACC — tỷ suất chiết khấu |
| `depreciation_years` | 5 | Khấu hao đường thẳng |
| `ar_days` | 45 | Số ngày phải thu |
| `ap_days` | 30 | Số ngày phải trả |
| `stage2_gate` | 300 | Ngưỡng kích hoạt Giai đoạn 2 |

---

## 4. Sheet 2: Initial Investment — Đầu tư ban đầu

### 4.1 Mục đích

Chi tiết hóa khoản đầu tư CAPEX ban đầu thành 10 hạng mục cụ thể, thay vì gộp chung một con số.

### 4.2 Bảng CAPEX (10 hạng mục)

| Hạng mục | Named range | Giá trị mặc định | Thời điểm |
|----------|-------------|-------------------|-----------|
| Hạ tầng Cloud | `capex_cloud_setup` | 800 Tr | H2 2025 |
| Phát triển Backend | `capex_backend` | 1,200 Tr | H2 2025 |
| Frontend + mobile | `capex_frontend` | 900 Tr | H2 2025 |
| Nền tảng dữ liệu | `capex_data_platform` | 600 Tr | H2 2025 |
| Bảo mật | `capex_security_setup` | 250 Tr | H2 2025 |
| UX/UI design | `capex_ux_design` | 350 Tr | H2 2025 |
| Tích hợp bên thứ 3 | `capex_integration` | 400 Tr | H2 2025 |
| DevOps & CI/CD | `capex_devops` | 280 Tr | H2 2025 |
| QA & kiểm thử | `capex_testing` | 200 Tr | H2 2025 |
| Dự phòng (10%) | `capex_contingency` | 300 Tr | H2 2025 |
| **TỔNG** | **`capex_total`** | **5,280 Tr** | |

**Công thức tổng:**
```
capex_total = SUM(B[first]:B[last])
```

### 4.3 Lịch khấu hao

Dưới bảng CAPEX, tạo bảng khấu hao 6 năm (2025-2030):

| Năm | Khấu hao/năm | Lũy kế | Giá trị còn lại |
|-----|--------------|--------|-----------------|
| 2025 | `=capex_total/depreciation_years` | = KH năm | `=capex_total - Lũy kế` |
| 2026 | `=capex_total/depreciation_years` | += KH năm | `=capex_total - Lũy kế` |
| ... | ... | ... | ... |
| 2030 | 0 (hết khấu hao) | = capex_total | 0 |

---

## 5. Sheet 3: HR Plan — Kế hoạch nhân sự

### 5.1 Cấu trúc

Sheet gồm 4 phần chính, mỗi phần trải dọc theo 42 cột thời gian:

1. **Biên chế (headcount)** — ô vàng, chỉnh được theo từng kỳ
2. **Tuyển mới** — công thức tự tính
3. **Chi phí lương** — công thức tự tính
4. **Tổng chi phí nhân sự** — công thức tự tính

### 5.2 Bảng biên chế (4 bộ phận)

| Bộ phận | H2/2025 | 2026 | 2027 | 2028 | 2029 | 2030 |
|---------|---------|------|------|------|------|------|
| Quản lý | 2 | 2 | 3 | 3 | 4 | 4 |
| Phát triển | 12 | 12 | 14 | 16 | 18 | 20 |
| Vận hành KD | 2 | 6 | 10 | 18 | 28 | 35 |
| Dữ liệu | 0 | 2 | 3 | 4 | 5 | 6 |
| **Tổng** | **16** | **22** | **30** | **41** | **55** | **65** |

### 5.3 Công thức lương

Mỗi ô chi phí lương sử dụng công thức:

```
= headcount × named_salary × months_in_period × (1 + salary_escalation)^years × (1 + bhxh_rate)
```

Ví dụ cho Vận hành KD, tháng 1/2026:
```
= C7 × salary_bizops × 1 × (1 + salary_escalation)^1 × (1 + bhxh_rate)
= 6  × 20            × 1 × (1 + 0.10)^1              × (1 + 0.215)
= 6 × 20 × 1.10 × 1.215
= 160.4 Tr VND
```

### 5.4 Tuyển dụng

```
= MAX(0, headcount_kỳ_này - headcount_kỳ_trước) × 30 × 12 × recruit_cost_pct
```

Giải thích: 30 Tr là lương TB (ước tính), × 12 tháng = lương năm, × 20% = phí headhunter.

---

## 6. Sheet 4: Market Sizing — Quy mô thị trường

### 6.1 Hàng tham chiếu thời gian

5 hàng đầu tạo nền tảng tính toán thời gian cho toàn bộ mô hình:

| Hàng | Tên | Công thức | Ví dụ (Th7/2025) |
|------|-----|-----------|-------------------|
| 1 | Period index | 0, 1, 2, ... 41 | 0 |
| 2 | Year fraction | `=base_year+(start_month-1+idx)/12` | 2025.500 |
| 3 | Years from base | `=FLOOR(year_frac - base_year, 1)` | 0 |
| 4 | Period divisor | 12 (tháng) hoặc 4 (quý) | 12 |
| 5 | Months in period | 1 (tháng) hoặc 3 (quý) | 1 |

### 6.2 Thị trường TMĐT du lịch

```
= ecom_market_base × (1 + ecom_growth_rate)^years_from_base / period_divisor
```

### 6.3 Đường cong S — Tăng trưởng doanh nghiệp

**DN thô (gross):**
```
= MAX(pilot_count, adoption_max / (1 + EXP(-adoption_steepness × (year_frac - adoption_midpoint))))
```

**DN rời bỏ (churn):**
```
= ROUND(gross × churn_rate / period_divisor, 0)
```

**DN ròng (net):**
```
= gross - churn
```

**VCR (triệu bản ghi):**
```
= net_enterprises × vcr_per_enterprise × months_in_period / 1,000,000
```

---

## 7. Sheet 5: Revenue Schedule — Bảng doanh thu

### 7.1 Mô hình 2 giai đoạn

**Giai đoạn 1 (luôn hoạt động):** Doanh thu từ chứng nhận, không phụ thuộc khối lượng giao dịch.

**Giai đoạn 2 (có điều kiện):** Chỉ kích hoạt khi `net_enterprises ≥ stage2_gate` (300 DN).

### 7.2 Công thức 6 nguồn doanh thu

| # | Nguồn | Giai đoạn | Công thức |
|---|-------|-----------|-----------|
| 1 | Phí chứng nhận | GĐ1 | `= net_ent × cert_fee_yr1 × (1 + cert_fee_escalation)^years / div` |
| 2 | Đào tạo | GĐ1 | `= net_ent × training_pct × training_fee / div` |
| 3 | Kiểm toán | GĐ1 | `= net_ent × audit_fee / div` |
| 4 | Phí giao dịch | GĐ2 | `= IF(net_ent ≥ gate, ecom × market_share × take_rate × 1000, 0)` |
| 5 | DaaS | GĐ2 | `= IF(net_ent ≥ gate, VCR × daas_price, 0)` |
| 6 | Quảng cáo | GĐ2 | `= IF(net_ent ≥ gate, impressions × months × net_ent / 1000 × CPM / 1000, 0)` |

### 7.3 Giá vốn (COGS)

```
= transaction_fee_revenue × payment_proc_pct
```

Chỉ tính trên doanh thu giao dịch (GĐ2), vì đây là chi phí trực tiếp của cổng thanh toán.

---

## 8. Sheet 6: Cost Schedule — Bảng chi phí

### 8.1 CAPEX (2 dòng)

| Dòng | Công thức | Giai đoạn |
|------|-----------|-----------|
| Phát triển nền tảng | `= capex_total / 6` | Chỉ 6 tháng đầu (H2/2025) |
| Bảo trì | `= capex_total × capex_maintenance_pct / div` | Từ 2026 trở đi |

### 8.2 OPEX (10 dòng + dự phòng)

| Dòng | Công thức |
|------|-----------|
| Nhân sự | `= 'HR Plan'!Cxx` (tham chiếu chéo) |
| Marketing | `= opex_marketing × (1 + marketing_growth)^years / div` |
| Thương hiệu | `= opex_branding / div` |
| Cloud | `= opex_cloud_base / div + VCR × cloud_per_1M_vcr` |
| Bảo mật | `= opex_security / div` |
| Đối ngoại | `= opex_external / div` |
| Pháp lý | `= opex_legal / div` |
| Thí điểm | `= opex_pilot_eval / div` (chỉ 2025) |
| Đối tác | `= opex_partner_mgmt / div` |
| Hỗ trợ KH | `= net_enterprises × opex_support_per_ent / div` |
| **Cộng dồn** | **= SUM(10 dòng trên)** |
| Dự phòng | `= Cộng dồn × opex_contingency_pct` |
| **TỔNG OPEX** | **= Cộng dồn + Dự phòng** |

---

## 9. Sheet 7: P&L — Kết quả kinh doanh

### 9.1 Cấu trúc P&L chuẩn

```
  Doanh thu                    (từ Revenue Schedule)
- Giá vốn (COGS)              (từ Revenue Schedule)
= LỢI NHUẬN GỘP

- Chi phí hoạt động (OPEX)     (từ Cost Schedule)
= EBITDA

- Khấu hao                    = -capex_total / depreciation_years / div
= EBIT

- Thuế TNDN                   = IF(EBIT > 0, -EBIT × cit_rate, 0)
= LỢI NHUẬN SAU THUẾ

  Biên gộp                    = LN Gộp / Doanh thu
  Biên EBITDA                 = EBITDA / Doanh thu
  Biên ròng                   = LN Ròng / Doanh thu
```

### 9.2 Lưu ý quan trọng

- **Thuế TNDN chỉ áp dụng khi EBIT > 0.** Nếu EBIT âm (lỗ), thuế = 0.
- **Khấu hao chỉ tính 5 năm** (2025-2029). Năm 2030 khấu hao = 0.
- Mô hình v1 ban đầu thiếu thuế TNDN → NPV bị thổi phồng.

---

## 10. Sheet 8: Cash Flow — Dòng tiền

### 10.1 Cấu trúc

```
  Lợi nhuận ròng              (từ P&L)
+ Khấu hao (cộng lại)         (phi tiền mặt, cộng vào OCF)
- Thay đổi vốn lưu động       = -(DT_kỳ_này - DT_kỳ_trước) × ar_days / 365
= DÒNG TIỀN HOẠT ĐỘNG

- CAPEX                        (từ Cost Schedule, đổi dấu)
= DÒNG TIỀN ĐẦU TƯ

  DÒNG TIỀN TỰ DO (FCF)       = OCF + ICF
  Lũy kế                      = FCF_trước + FCF_hiện_tại
```

### 10.2 Vốn lưu động (Working Capital)

Khi doanh thu tăng, công ty cần thêm tiền để tài trợ cho các khoản phải thu (AR). Công thức:

```
= -(revenue_change) × ar_days / 365
```

Dấu trừ vì tăng doanh thu = cần thêm vốn = giảm dòng tiền.

---

## 11. Sheet 9: DCF & Returns — Thẩm định

### 11.1 Bảng FCF theo năm

Gộp 42 cột tháng/quý thành 6 năm để tính NPV và IRR:

```
FCF_H2_2025 = SUM('Cash Flow'!C[fcf]:H[fcf])
FCF_2026    = SUM('Cash Flow'!I[fcf]:T[fcf])
...
```

### 11.2 Các chỉ số

| Chỉ số | Công thức Excel | Ý nghĩa |
|--------|----------------|---------|
| NPV | `=NPV(discount_rate, FCF_Y1:FCF_Y5) + FCF_Y0` | Giá trị dự án quy về hiện tại |
| IRR | `=IFERROR(IRR(FCF_Y0:FCF_Y5), "N/A")` | Tỷ suất hoàn vốn nội bộ |
| Max burn | `=-MIN(cumulative_CF_range)` | Tiền mặt cần nhiều nhất |
| ROI | `=(cum_CF_cuối + max_burn) / max_burn` | Lợi nhuận trên đầu tư |

---

## 12. Sheet 10: Scenarios — Kịch bản

### 12.1 Bảng 5 kịch bản

Mỗi cột chứa giá trị thay thế cho các named range chính. Cột BASE liên kết trực tiếp với Assumptions qua công thức `=adoption_max`, `=churn_rate`...

### 12.2 Cách sử dụng

1. Chọn cột kịch bản (VD: BULL)
2. Sao chép giá trị từ cột đó
3. Dán vào các ô tương ứng trong sheet Assumptions
4. Toàn bộ mô hình tự cập nhật

### 12.3 Phân tích yếu tố ảnh hưởng

Sheet bao gồm phần giải thích 3 yếu tố ảnh hưởng lớn nhất đến NPV/IRR:
1. **adoption_max** — ảnh hưởng mọi dòng doanh thu
2. **platform_market_share** — quyết định doanh thu GĐ2
3. **churn_rate** — ảnh hưởng tăng trưởng ròng

---

## 13. Sheet 11-12: Budget 2025 & 2026 — Ngân sách

### 13.1 Cấu trúc

Mỗi sheet ngân sách có cấu trúc giống nhau, theo tháng:

```
DOANH THU (3 dòng + tổng)
CAPEX (10 dòng cho 2025, 1 dòng cho 2026 + tổng)
OPEX (HR theo bộ phận + 7 danh mục + hỗ trợ KH + tổng + dự phòng)
TỔNG KẾT (DT, CAPEX, OPEX, Tổng ngân sách, Ròng, Lũy kế)
```

### 13.2 Budget 2025 (Tháng 7-12)

6 cột tháng. CAPEX chiếm phần lớn vì đang xây dựng nền tảng.

### 13.3 Budget 2026 (Tháng 1-12)

12 cột tháng. Không còn CAPEX phát triển, chỉ bảo trì. OPEX tăng do HR mở rộng từ 16 → 22 người.

---

## 14. Sheet 13: Guide — Hướng dẫn sử dụng

Sheet đầu tiên trong workbook, chứa:
- Danh sách tất cả sheet và mục đích
- Bảng named ranges với mô tả và ví dụ công thức
- Quy ước màu ô
- Thuật ngữ (21 từ: NPV, IRR, WACC, EBITDA, CAPEX, OPEX, COGS, BHXH, TAM, SAM, GMV, VCR, S-curve...)
- Hướng dẫn 8 bước sử dụng mô hình

---

## 15. Các lỗi thường gặp và cách khắc phục

### 15.1 Named range bị lệch sau khi chèn/xóa hàng

**Triệu chứng:** Công thức trả về `#REF!` hoặc giá trị sai.

**Nguyên nhân:** Khi chèn hàng vào sheet chứa named range, Excel đôi khi không tự cập nhật tham chiếu.

**Cách sửa:**
1. Vào Formulas → Name Manager
2. Kiểm tra cột "Refers To" — xem có đúng ô không
3. Sửa tham chiếu nếu sai

**Phòng tránh:** Đặt tất cả tham số vào sheet Assumptions **trước khi** tạo named range. Không chèn hàng vào giữa sau khi đã đặt tên.

### 15.2 Circular reference (tham chiếu vòng)

**Triệu chứng:** Excel báo lỗi circular reference.

**Nguyên nhân thường gặp:** Sheet A tham chiếu Sheet B, Sheet B lại tham chiếu ngược Sheet A.

**Cách sửa:** Kiểm tra dòng chảy dữ liệu theo sơ đồ 4 lớp. Dữ liệu chỉ chảy **một chiều**: Input → Calculation → Output → Analysis.

### 15.3 NPV/IRR quá cao hoặc quá thấp

**Kiểm tra 3 yếu tố:**
1. `adoption_max` — 3,000+ là phi thực tế, 500-1,500 là hợp lý
2. `platform_market_share` — > 1% rất tham vọng cho nền tảng mới
3. `discount_rate` — dưới 12% quá thấp cho startup

### 15.4 Doanh thu GĐ2 luôn = 0

**Kiểm tra:** `net_enterprises` có vượt `stage2_gate` (300) không? Nếu `adoption_max` < 300, GĐ2 không bao giờ kích hoạt.

---

## 16. Checklist hoàn thiện mô hình

### Trước khi trình duyệt

- [ ] Tất cả ô vàng đã được điền giá trị hợp lý
- [ ] Named ranges đúng ô (Formulas → Name Manager → kiểm tra)
- [ ] Không có ô `#REF!`, `#NAME?`, `#VALUE!`
- [ ] P&L có thuế TNDN 20% (kiểm tra dòng Thuế)
- [ ] Cash Flow có vốn lưu động (kiểm tra dòng Working Capital)
- [ ] NPV tính bằng `discount_rate` từ Assumptions (không hardcode)
- [ ] Budget 2025 + 2026 khớp với P&L (tổng doanh thu, tổng chi phí)
- [ ] Kịch bản Worst cho kết quả âm (sanity check)
- [ ] Guide sheet có đủ thuật ngữ cho người đọc không chuyên

### Khi cập nhật giả định

- [ ] Chỉ sửa ô vàng trong Assumptions, Initial Investment, hoặc HR Plan
- [ ] Không sửa công thức trong các sheet tính toán
- [ ] Sau khi sửa, kiểm tra NPV/IRR có hợp lý
- [ ] Lưu file với phiên bản mới (v5, v6...)

---

> **Ghi chú phiên bản:** Tài liệu này mô tả mô hình v4 — phiên bản đã sửa lỗi named range từ v3 và bổ sung Scenarios + Budget. Tương thích với cả file tiếng Anh (`VisitVietnam_FinancialModel_v4.xlsx`) và tiếng Việt (`VisitVietnam_MoHinhTaiChinh_v4.xlsx`).
