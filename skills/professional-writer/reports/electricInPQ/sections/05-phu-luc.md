---

## Phụ lục

### Phụ lục A — Dữ liệu lưới điện Phú Quốc

| Thông số | Giá trị | Nguồn |
|:---|:---|:---|
| Đỉnh phụ tải 2025 | 110 MW | Bản ghi nhớ CLP 23/02/2026, mục "Phụ tải và tiêu thụ"[^3] |
| Sản lượng tiêu thụ 2025 | 782 triệu kWh | Bản ghi nhớ CLP 23/02/2026, mục "Phụ tải và tiêu thụ"[^3] |
| Tốc độ tăng trưởng | 11%/năm | Bản ghi nhớ CLP 23/02/2026, đoạn mở đầu[^3] |
| Số hộ sử dụng điện | ~30.000 | VnExpress 29/11/2025[^1] |
| Tổng đầu tư EVNSPC cho Phú Quốc | 9.160 tỷ VND | EVN.com.vn 12/2025[^4] |
| Dung lượng tuyến 220 kV mới | Gấp 5 lần tuyến 110 kV cũ | TheInvestor.vn[^6] |

### Phụ lục B — Hồ sơ năng lực CLP (tóm tắt)

- **Tên đầy đủ:** CLP Holdings Limited
- **Thành lập:** 1901 (125 năm hoạt động liên tục)
- **Trụ sở:** Hồng Kông
- **Công suất:** ~23.000 MW phát điện và lưu trữ[^3]
- **Phạm vi hoạt động:** Hồng Kông, Trung Quốc Đại lục, Úc, Ấn Độ, Đài Loan
- **Điện gió:** 2,5 GW tại Đài Loan; dự kiến >300 MW tại Việt Nam 2027[^3]
- **Niêm yết:** HKEX, vốn hóa >100 tỷ HKD, xếp hạng tín dụng A
- **Đại diện VN:** Hàn Thế Phong — Phó Giám đốc Thị trường Việt Nam & Lào, CLP SEA Infrastructure Limited[^3]
- **Liên hệ:** 0933 668 466 / phong.han@clp.com.hk[^3]

### Phụ lục C — Khung pháp lý năng lượng tái tạo

| Văn bản | Nội dung liên quan |
|:---|:---|
| **Quy hoạch Điện VIII** (QĐ 500/QĐ-TTg, 15/5/2023) | Mục tiêu 2030: 15.000 MW điện gió; phát triển điện mặt trời mái nhà phân tán; vùng biển Phú Quốc/Kiên Giang trong quy hoạch gió[^25] |
| **Nghị định 80/2024/NĐ-CP** | Cơ chế mua bán điện trực tiếp (DPPA) giữa nguồn phát NLTT và khách hàng lớn — cho phép mô hình PPA đề xuất tại Phần 4 |
| **Luật Điện lực (sửa đổi 2024)** | Cho phép tư nhân đầu tư phát điện, truyền tải — tạo cơ sở pháp lý cho Sun Group và đối tác triển khai nguồn phát tại chỗ |

### Phụ lục D — Bảng thuật ngữ

| Thuật ngữ | Giải nghĩa |
|:---|:---|
| **BESS** | Battery Energy Storage System — Hệ thống pin lưu trữ năng lượng |
| **DPPA** | Direct Power Purchase Agreement — Hợp đồng mua điện trực tiếp |
| **PPA** | Power Purchase Agreement — Hợp đồng mua bán điện |
| **Microgrid** | Lưới điện siêu nhỏ có khả năng vận hành độc lập khỏi lưới chính |
| **LCOE** | Levelized Cost of Energy — Chi phí bình quân toàn vòng đời |
| **MWp** | Megawatt-peak — Công suất đỉnh (điện mặt trời) |
| **EUI** | Energy Use Intensity — Cường độ sử dụng năng lượng (kWh/m²/năm) |
| **ESG** | Environmental, Social, Governance — Tiêu chuẩn bền vững |
| **SBTi** | Science Based Targets initiative — Cam kết giảm phát thải dựa trên khoa học |
| **EVNSPC** | Tổng công ty Điện lực miền Nam |
| **ATS** | Automatic Transfer Switch — Bộ chuyển mạch tự động |
| **EV** | Electric Vehicle — Xe điện |

### Phụ lục E — Cơ sở tính toán nhu cầu điện (Electricity Needs Computation)

#### E.1. Phương pháp tính toán

Nhu cầu điện được ước tính dựa trên **benchmark quốc tế** cho từng loại cơ sở, sử dụng hai chỉ số chính:
- **Công suất đỉnh (Peak demand, kW):** Lượng điện tối đa cần tại bất kỳ thời điểm nào
- **Sản lượng tiêu thụ (Annual consumption, kWh/năm):** Tổng điện tiêu thụ trong năm

#### E.2. Khách sạn 5 sao — 12.000 phòng mới

| Thông số | Giá trị | Nguồn |
|:---|:---|:---|
| Benchmark quốc tế: khách sạn 5 sao vùng nhiệt đới | **12.000–15.000 kWh/phòng/năm** | AEMACO Energy Audit Report[^15] |
| Benchmark Malta (4-5 sao) | 35.867 kWh/phòng/năm | Government of Mauritius[^15] |
| Peak demand factor (công suất đỉnh/trung bình) | 2,5–3,0x | Industry standard |

**Tính toán:**

```
Tiêu thụ/năm = 12.000 phòng × 12.000 kWh/phòng/năm = 144 triệu kWh
              → đến × 15.000 kWh/phòng/năm = 180 triệu kWh

Công suất trung bình = 144.000.000 kWh ÷ 8.760 giờ/năm = 16,4 MW
Công suất đỉnh = 16,4 MW × 2,2 (peak factor) ≈ 36 MW
              → đến 20,5 MW × 2,3 ≈ 48 MW

Kết luận: 36–48 MW peak | 144–180 triệu kWh/năm
```

*Ghi chú: Bao gồm HVAC (50–70% tổng tiêu thụ), chiếu sáng (10–20%), nước nóng (15–25%), bể bơi, spa, nhà hàng, bếp, giặt là.[^15]*

#### E.3. Sân bay Phú Quốc (mở rộng)

| Thông số | Giá trị | Nguồn |
|:---|:---|:---|
| EUI nhà ga sân bay (Trung Quốc hub) | **177 kWh/m²/năm** | University of Reading[^16] |
| EUI sân bay Hồng Kông | 371–374 kWh/m²/năm | CIBSE[^16] |
| EUI sân bay Hy Lạp | 200–270 kWh/m²/năm | Medium / Research[^16] |
| Diện tích T2 + hạ tầng ước tính | ~120.000 m² | Ước tính từ quy mô dự án |

**Tính toán:**

```
Scenario thấp: 120.000 m² × 200 kWh/m²/năm = 24 triệu kWh → Peak ≈ 8 MW
Scenario cao:  120.000 m² × 350 kWh/m²/năm = 42 triệu kWh → Peak ≈ 12 MW

Kết luận: 8–12 MW peak | 28–42 triệu kWh/năm
```

*Ghi chú: Bao gồm hệ thống điều hòa (30–60% tổng tiêu thụ), chiếu sáng nhà ga 24/7, hệ thống an ninh, băng chuyền hành lý, radar-dẫn đường, đường băng.[^16]*

#### E.4. Trung tâm Hội nghị APEC 6.500 chỗ + Nhà hát 4.000 chỗ

| Thông số | Giá trị | Nguồn |
|:---|:---|:---|
| HVAC: cooling capacity | 0,04–0,4 kW/chỗ | Ingener.by / ASHRAE[^17] |
| Lighting power density | 0,004–0,015 kW/chỗ | PSU / ASHRAE[^17] |
| Audio/Visual peak load | 4,4–11,7 kW/phòng hội nghị | Industry benchmark[^17] |

**Tính toán:**

```
Tổng chỗ: 6.500 + 4.000 = 10.500 chỗ
Scenario thấp: 10.500 × 0,5 kW/chỗ = 5,25 MW
Scenario cao:  10.500 × 0,8 kW/chỗ = 8,4 MW

Kết luận: 5–8 MW peak | 8–13 triệu kWh/năm (hoạt động ~1.600–2.000 giờ/năm)
```

#### E.5. Tàu điện LRT

| Thông số | Giá trị | Nguồn |
|:---|:---|:---|
| Công suất trạm biến áp LRT | **1,5–5,5 MW/trạm** | Valley Metro / TRB[^18] |
| Tiêu thụ năng lượng | 7–8 kWh/vehicle-km | GCRTA Cleveland[^18] |
| Số trạm biến áp ước tính | 2–3 trạm | Tùy chiều dài tuyến |

**Tính toán:**

```
Peak demand: 2 trạm × 2,5 MW/trạm = 5 MW (scenario cao)
           → 3 trạm × 1,5 MW/trạm = 4,5 MW
Tiêu thụ: ~10–16 triệu kWh/năm (tùy tần suất và chiều dài tuyến)

Kết luận: 3–5 MW peak | 10–16 triệu kWh/năm
```

#### E.6. Trạm sạc xe điện

| Thông số | Giá trị | Nguồn |
|:---|:---|:---|
| Trạm sạc nhanh DC | 50–150 kW/trạm | Tiêu chuẩn ngành (CCS/CHAdeMO) |
| Trạm sạc xe buýt điện | 100–300 kW/trạm | VinBus specification[^19] |
| Số trạm Phase 1 ước tính | 30–50 trạm | Ước tính từ 51 xe buýt + Xanh SM + cá nhân |

```
Peak: 50 trạm × 100 kW (trung bình) = 5 MW → diversity factor 0,6 = 3 MW
Kết luận: 2–4 MW peak | 5–10 triệu kWh/năm
```

*Ghi chú: Con số này chỉ tính Phase 1 (30–50 trạm). Khi Phú Quốc đạt mục tiêu 100% taxi điện (2025) và 100% phương tiện điện (2030)[^30], nhu cầu sạc sẽ tăng gấp 3–5 lần, đòi hỏi mở rộng hạ tầng sạc tương ứng.*

#### E.7. Tổng hợp nhu cầu điện toàn danh mục

| Cơ sở | MW peak (thấp) | MW peak (cao) | Triệu kWh/năm (thấp) | Triệu kWh/năm (cao) |
|:---|:---:|:---:|:---:|:---:|
| Khách sạn 5 sao (12.000 phòng) | 36 | 48 | 144 | 180 |
| Sân bay mở rộng | 8 | 12 | 28 | 42 |
| TTHH APEC + Nhà hát | 5 | 8 | 8 | 13 |
| Tàu điện LRT | 3 | 5 | 10 | 16 |
| Trạm sạc EV | 2 | 4 | 5 | 10 |
| Khu thương mại | 3 | 5 | 10 | 16 |
| **Tổng bổ sung** | **57** | **82** | **205** | **277** |
| **+ Phụ tải hiện tại** | **167** | **192** | **987** | **1.059** |

> **So sánh:** Đỉnh phụ tải hiện tại 110 MW → lên **167–192 MW** (+52–75%). Đây là mức **tối thiểu** — chưa tính tăng trưởng 11%/năm từ dân cư, du lịch ngoài Sun Group, và mở rộng đội xe điện theo mục tiêu đảo xanh.

---

### Danh mục trích dẫn nguồn

[^1]: VnExpress, "Gần 30.000 hộ dân Phú Quốc mất điện do sự cố cáp ngầm," vnexpress.net, 29/11/2025.
[^2]: Bản ghi nhớ CLP - Sun Group, mục 1 "Phụ tải và tiêu thụ," 23/02/2026. Đỉnh phụ tải 110 MW.
[^3]: Hàn Thế Phong (CLP SEA Infrastructure Limited), "Bản ghi nhớ: Đảm bảo An ninh Năng lượng cho Danh mục Đầu tư Sun Group tại Phú Quốc," 23/02/2026. Tài liệu cá nhân & thăm dò — không phải đề xuất chính thức của CLP. Các trích dẫn cụ thể trong báo cáo này tham chiếu các mục sau của bản ghi nhớ: đoạn mở đầu (phụ tải 110 MW, 782 triệu kWh, 11%/năm, ~100.000 tỷ VND), mục 2 (bức xạ mặt trời, khung pháp lý), mục 3.1 (Sun Airport từ 01/01/2026, BESS/solar cho sân bay và TTHH), mục 3.2 (chi phí diesel 32 triệu VND/ngày), mục 3.3 (13 thương hiệu, 5 tập đoàn, SBTi), mục 4 (CLP ~23.000 MW, 2,5 GW gió Đài Loan, 300 MW VN), mục 5 (giai đoạn 2, VinBus 51 xe, DPPA, điện gió 300 MW), mục 6 (Hàn Thế Phong, Sandeep Sharma, timeline APEC).
[^4]: EVN.com.vn, "EVNSPC vượt chỉ tiêu đầu tư xây dựng lưới điện năm 2025," evn.com.vn, 12/2025. Tổng 3 công trình cấp điện Phú Quốc: 9.160 tỷ VND.
[^5]: Bộ Công Thương / World Bank, "Vietnam Solar Radiation Atlas." Phú Quốc (vĩ tuyến 10°N): bức xạ 4,5–5,5 kWh/m²/ngày.
[^6]: TheInvestor.vn, "New 220kV cross-sea power line increases Phu Quoc electricity provision five times," theinvestor.vn. Dự kiến đáp ứng đến 2035.
[^7]: EVN.com.vn / Vietnam.vn, "EVNSPC khởi công trạm biến áp 220 kV Phú Quốc," 12/2025.
[^8]: Vinaincon.com.vn, "Hợp đồng thi công đường dây 110 kV Phú Quốc – Nam Phú Quốc," ký 17/07/2023, thời gian thi công 210 ngày.
[^9]: VietnamNet / Báo Mới, "Cáp ngầm 110 kV Hà Tiên - Phú Quốc bị hư hỏng do ép cọc thi công đường ven biển," 29/11/2025.
[^10]: Báo Mới / VOH, "Mất điện diện rộng tại Phú Quốc: Dương Đông, Cửa Cạn, Hàm Ninh, Bắc đảo," 29/11/2025.
[^11]: Tuổi Trẻ Online, "Phú Quốc mất điện 30–40 giờ liên tục, gián đoạn nước sạch Bắc đảo," tuoitre.vn, 11/2025.
[^12]: VnExpress, "EVNSPC huy động máy phát diesel từ đất liền về Phú Quốc," vnexpress.net, 29–30/11/2025.
[^13]: Quảng Ngãi TV / Báo Mới, "Khắc phục sự cố cáp ngầm Phú Quốc dự kiến mất khoảng 1 tháng," quangngaitv.vn, 11/2025.
[^14]: Dân Trí, "Đơn vị gây sự cố cáp ngầm Phú Quốc tạm ứng 2,4 tỷ đồng sửa chữa," dantri.com.vn, 12/2025.
[^15]: AEMACO.com, "Luxury Hotel Energy Consumption Benchmarks." Khách sạn 5 sao vùng nóng: 12.000–15.000 kWh/phòng/năm. HVAC: 50–70%, chiếu sáng: 10–20%, nước nóng: 15–25%. Xem thêm: Government of Mauritius (govmu.org), "4-5 Star Hotel Energy Audit Malta": 35.867 kWh/phòng/năm.
[^16]: University of Reading (UK), "Energy Performance of Chinese Hub Airport Terminals," reading.ac.uk. EUI trung bình: 177 kWh/m²/năm, 30–60% từ HVAC. CIBSE, "Airport Energy Benchmarks": HKIA 371–374 kWh/m². ASHRAE, "Airport Terminal Energy Use Intensity," ashrae.org.
[^17]: Ingener.by / ASHRAE, "Convention Center HVAC & Lighting Benchmarks." HVAC: 0,04–0,4 kW/chỗ; Lighting: 0,004–0,015 kW/chỗ. Audio/Visual peak: 4,4–11,7 kW. PSU (Penn State University), "Lighting Power Density Standards."
[^18]: Valley Metro (US), "Light Rail Power Supply Infrastructure," valleymetro.org. Trạm biến áp: 1,5–5,5 MW, 850V DC. TRB (Transportation Research Board), "LRT Power Systems." GCRTA Cleveland: 7–8 kWh/vehicle-km.
[^19]: Tiêu chuẩn ngành sạc xe điện: DC fast charger 50–150 kW (CCS/CHAdeMO), xe buýt điện 100–300 kW. VinBus Phú Quốc: 51 xe trên 3 tuyến[^3].
[^20]: Marubeni Corporation / VinFast Energy, "BESS 1.8 MW / 3.7 MWh at Vinpearl Resort Hon Tre," 12/2024. Mô hình ba bên: Marubeni đầu tư, VinFast sản xuất pin lithium-ion với hệ thống làm mát chất lỏng, Vinpearl hưởng lợi không bỏ vốn.
[^21]: Fluence Energy (liên doanh Siemens-AES), "35 GWh/year Battery Manufacturing Facility in Bac Giang," 08/2025. Nhà máy sản xuất pin lưu trữ tự động hóa, đủ cho 8,75 GW hệ thống 4 giờ/năm.
[^22]: BloombergNEF, "Lithium-Ion Battery Pack Prices 2024–2025." Chi phí pin lưu trữ quy mô utility: ~80 USD/kWh và tiếp tục giảm.
[^23]: Bộ Công Thương, "Quy hoạch Phát triển Năng lượng Tái tạo Việt Nam." Bức xạ mặt trời trung bình Việt Nam: 3,5–5,0 kWh/m²/ngày; miền Nam (bao gồm Phú Quốc): 4,5–5,5 kWh/m²/ngày.
[^24]: HICAP 2024 Sustainable Hotel Awards, "Climate & Biodiversity Action Award — Six Senses Ninh Van Bay." 800 tấm pin mặt trời, cung cấp 26–28% điện năng tiêu thụ.
[^25]: Quyết định 500/QĐ-TTg ngày 15/5/2023, "Quy hoạch Phát triển Điện lực Quốc gia thời kỳ 2021–2030, tầm nhìn đến năm 2050" (Quy hoạch Điện VIII). Mục tiêu 2030: ~15.000 MW điện gió.
[^26]: IEEE Standards 1547 và 2030, "Microgrid Fundamentals: Automatic Transfer and Islanding Capabilities." Chuyển mạch < 20 ms cho critical loads. IEEE Microgrid Knowledge.
[^27]: Xanh SM, "Ra mắt dịch vụ taxi điện tại Phú Quốc," xanhsm.com, 02/07/2023. Đợt đầu 100 xe VinFast (VF e34, VF 5 Plus), kế hoạch nâng lên 300 xe trong năm 2023. Xem thêm: Thanh Niên, "Xanh SM khai trương dịch vụ taxi điện Phú Quốc, 100 xe ban đầu," thanhnien.vn, 07/2023; CafeF, "Xanh SM ra mắt tại Phú Quốc," cafef.vn, 07/2023.
[^28]: CafeF / Xanh SM, "Ra mắt Xanh SM Platform cho phép chủ xe VinFast làm đối tác vận tải," cafef.vn, 03/2024.
[^29]: B-Company.jp / nhiều nguồn, "Xanh SM fleet nationwide >100,000 electric vehicles (20,000 cars + 80,000 motorcycles) across 61 provinces," tính đến 12/2025. Xanh SM chiếm 51,5% thị phần gọi xe 4 bánh tại Việt Nam (Q4/2025) theo Tuổi Trẻ.
[^30]: Nhiều nguồn (Khoahocphothong.vn, VnExpress), "Phú Quốc đặt mục tiêu 50% phương tiện điện/xanh đến 2025, 100% taxi mới dùng điện, hướng tới 100% phương tiện điện đến 2030." Nằm trong lộ trình "đảo xanh" của tỉnh Kiên Giang.

---

**— Hết báo cáo —**

*Tài liệu này là tài sản mật của Tập đoàn Sun Group. Nghiêm cấm sao chép, phân phối cho bên thứ ba khi chưa được phép.*
