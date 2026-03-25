---

## Phần 3. Giải pháp đề xuất — Phát điện và lưu trữ tại chỗ

Như phân tích tại Phần 1 và 2, điểm yếu cấu trúc của hệ thống điện Phú Quốc không phải là thiếu dung lượng mà là **thiếu nguồn phát tại chỗ**. Khi toàn bộ nguồn điện đến từ đất liền qua cáp ngầm, bất kỳ gián đoạn nào trên đường truyền đều làm tê liệt toàn đảo — bất kể dung lượng lưới lớn đến đâu.

Giải pháp, do đó, nằm ở logic đơn giản: **tạo nguồn phát và lưu trữ ngay trên đảo**, kết nối với lưới EVN qua hệ thống microgrid có khả năng chuyển mạch tự động. Bản ghi nhớ CLP ngày 23/02/2026 cũng xác nhận, "cách duy nhất để giảm phụ thuộc vào cáp ngầm là tạo nguồn phát điện ngay trên đảo"[^3].

### 3.1. Pin lưu trữ năng lượng (BESS) — "Bảo hiểm điện" chuyển mạch tức thì

BESS là thành phần cốt lõi của giải pháp, đóng vai trò "bảo hiểm điện" — không phải để thay thế lưới EVN, mà để đảm bảo duy trì nguồn điện liên tục trong mọi tình huống. Sự khác biệt giữa BESS và máy phát diesel truyền thống là căn bản.

**So sánh BESS với máy phát diesel:**

| Tiêu chí | Máy phát diesel | BESS |
|:---|:---|:---|
| Thời gian chuyển mạch | 30 giây – 2 phút | **< 20 mili-giây** (nhanh hơn 6.000 lần)[^26] |
| Chi phí vận hành | 32 triệu VND/ngày + nhiên liệu[^3] | Gần bằng 0 (không nhiên liệu) |
| Phát thải CO₂ | Cao (diesel) | **Không** |
| Tiếng ồn | Lớn — không phù hợp resort 5 sao | **Im lặng** |
| Cung cấp điện liên tục | Phụ thuộc nhiên liệu, cần tiếp liệu thường xuyên | 2–8 giờ tùy dung lượng pin |
| Cần vận chuyển từ đất liền | Có — mất thời gian khi sự cố | **Không** — sẵn sàng tại chỗ 24/7 |
| Phù hợp môi trường đảo | Thấp (ô nhiễm, tiếng ồn, logistic phức tạp) | **Cao** (sạch, yên tĩnh, tự vận hành) |

Con số 20 mili-giây có ý nghĩa thực tiễn then chốt: thiết bị điện tử, máy tính, hệ thống an ninh sân bay, thang máy, hệ thống phiên dịch hội nghị — tất cả đều tiếp tục hoạt động mà không nhận biết sự gián đoạn. Với máy phát diesel, khoảng gap 30 giây – 2 phút đủ để toàn bộ hệ thống IT reset, thang máy kẹt, và hệ thống an ninh mất tín hiệu.

**Tiền lệ đã có tại Việt Nam — Vinpearl Nha Trang (12/2024):** Tháng 12/2024, Marubeni và VinFast Energy khánh thành hệ thống BESS **1,8 MW / 3,7 MWh** tại Vinpearl Resort trên đảo Hòn Tre[^20]. Mô hình rất đáng chú ý: Vinpearl **không bỏ vốn đầu tư ban đầu** — Marubeni đầu tư và vận hành hệ thống, VinFast sản xuất pin lithium-ion với hệ thống làm mát chất lỏng, Vinpearl hưởng lợi từ giảm chi phí điện giờ cao điểm và tăng ổn định nguồn cung. Đây chính xác là mô hình mà báo cáo này khuyến nghị áp dụng cho Sun Group, với quy mô lớn hơn nhiều lần.

**Chuỗi cung ứng nội địa:** Fluence Energy (liên doanh Siemens-AES) đã khai trương nhà máy sản xuất pin lưu trữ tự động hóa **35 GWh/năm** tại Bắc Giang vào tháng 08/2025 — đủ sản xuất 8,75 GW hệ thống lưu trữ 4 giờ mỗi năm[^21]. Chi phí pin lưu trữ toàn cầu đã giảm xuống **~80 USD/kWh** và tiếp tục giảm nhanh[^22]. Việc có nhà máy sản xuất ngay tại Việt Nam giúp giảm đáng kể chi phí logistic và thời gian triển khai.

### 3.2. Điện mặt trời — Tận dụng lợi thế tự nhiên

Phú Quốc nằm ở vĩ tuyến 10°N, nhận bức xạ mặt trời **4,5–5,5 kWh/m²/ngày** — thuộc nhóm tốt nhất Việt Nam và cao hơn mức trung bình toàn quốc (3,5–5,0 kWh/m²/ngày)[^5][^23]. Đây là lợi thế tự nhiên mà Sun Group có thể khai thác trực tiếp thông qua hệ thống điện mặt trời mái nhà — không cần đất riêng, không ảnh hưởng cảnh quan.

| Vị trí | Diện tích mái ước tính | Công suất tiềm năng |
|:---|:---:|:---:|
| 15 tòa tháp Bãi Đất Đỏ | ~50.000 m² | **5–8 MWp** |
| Sân bay (nhà ga, bãi đỗ) | ~30.000 m² | **3–5 MWp** |
| TTHH APEC + Nhà hát | ~15.000 m² | **1,5–2,5 MWp** |
| Khu thương mại | ~20.000 m² | **2–3 MWp** |
| **Tổng** | **~115.000 m²** | **11,5–18,5 MWp** |

Với 115.000 m² diện tích mái chỉ riêng các cơ sở Sun Group, tiềm năng phát điện mặt trời là đáng kể. Điện mặt trời phát mạnh ban ngày — trùng với thời điểm HVAC (điều hòa) tiêu thụ nhiều nhất (50–70% tổng tiêu thụ khách sạn[^15]). Điều này có nghĩa nguồn phát tái tạo và nhu cầu tiêu thụ đỉnh **trùng khớp về mặt thời gian** — tối ưu hóa hiệu quả tự tiêu thụ mà không cần lưu trữ.

**Tiền lệ ngành hospitality:** Six Senses Ninh Vân Bay đã lắp đặt 800 tấm pin mặt trời nội khu, cung cấp 26–28% điện năng tiêu thụ, và giành giải **Climate & Biodiversity Action Award** tại HICAP 2024 Sustainable Hotel Awards[^24]. Nếu Sun Group triển khai hệ thống quy mô lớn hơn nhiều lần tại Phú Quốc với 11,5–18,5 MWp, đây sẽ trở thành hệ thống điện mặt trời mái nhà lớn nhất trong ngành hospitality Đông Nam Á.

### 3.3. Điện gió ven bờ — Bổ sung khi mặt trời không phát

Điện mặt trời có điểm hạn chế hiển nhiên: không phát điện ban đêm và giảm công suất trong mùa mưa. Điện gió ven bờ bổ sung chính xác ở những thời điểm này — gió thường mạnh hơn vào ban đêm và mùa mưa, tạo sự bổ trợ tự nhiên với năng lượng mặt trời.

Vùng biển Phú Quốc/Kiên Giang đã được quy hoạch trong Quy hoạch Điện VIII (Quyết định 500/QĐ-TTg ngày 15/5/2023)[^25] cho phát triển điện gió. CLP có kinh nghiệm trực tiếp với **2,5 GW điện gió tại Đài Loan** và đang dự kiến đầu tư **hơn 300 MW tại Việt Nam** trong năm 2027[^3] — năng lực này hoàn toàn phù hợp cho bài toán điện gió ven bờ Phú Quốc.

Điện gió ven bờ có thêm ưu điểm quan trọng: **không chiếm đất đảo**. Với quỹ đất Phú Quốc ngày càng khan hiếm, các turbine gió đặt ngoài khơi hoặc ven bờ vừa phát điện vừa không ảnh hưởng đến cảnh quan và quỹ đất phát triển.

### 3.4. Microgrid — Chuyển mạch tự động, loại bỏ kịch bản mất điện

Ba thành phần trên (BESS + solar + wind) cần được kết nối thành hệ thống microgrid thông minh, hoạt động song song với lưới EVN. Khi lưới EVN gián đoạn, microgrid **tự động chuyển nguồn trong mili-giây** — loại bỏ hoàn toàn kịch bản "du khách phải di dời, resort thuê máy phát diesel từ đất liền"[^3] như đã xảy ra tháng 11/2025.

Microgrid hiện đại dựa trên tiêu chuẩn IEEE 1547 và IEEE 2030 cho phép[^26]:
- Chuyển mạch tự động < 20 ms cho tải ưu tiên (critical loads)
- Vận hành ở chế độ "island" (cô lập) hoàn toàn khi lưới chính gặp sự cố
- Tự động đồng bộ và kết nối lại khi lưới chính phục hồi
- Quản lý thông minh tải — ưu tiên cấp điện cho sân bay, hệ thống an ninh, HVAC trước, sau đó mở rộng dần

Đây là khả năng mà máy phát diesel truyền thống không thể đạt được: chuyển mạch thủ công, không quản lý tải thông minh, và phụ thuộc hoàn toàn vào con người vận hành.

### 3.5. Hạ tầng sạc xe điện — Bài toán năng lượng lớn nhất chưa được đề cập

Đây là phần cần được phân tích kỹ lưỡng hơn so với các phiên bản trước, bởi nhu cầu sạc xe điện tại Phú Quốc đang tăng trưởng **nhanh hơn bất kỳ dự báo nào** — và đang trở thành một trong những nguồn tiêu thụ điện lớn nhất trên đảo.

#### 3.5.1. Xanh SM — Đội xe điện lớn nhất trên đảo

Xanh SM (thuộc hệ sinh thái Vingroup) chính thức khai trương dịch vụ taxi điện tại Phú Quốc vào ngày 02/07/2023, với đợt đầu tiên gồm **100 xe điện VinFast** (mẫu VF e34 và VF 5 Plus)[^27]. Hãng công bố kế hoạch nâng lên **300 xe** ngay trong năm 2023[^27], và tiếp tục mở rộng mạnh mẽ trong 2024–2025 thông qua hai kênh: đội xe trực tiếp và nền tảng **Xanh SM Platform** (ra mắt tháng 3/2024) cho phép chủ xe VinFast tham gia làm đối tác kinh doanh vận tải[^28].

Để đặt trong bối cảnh: trên toàn quốc tính đến cuối 2025, Xanh SM vận hành hơn **100.000 phương tiện điện** (khoảng 20.000 ô tô và 80.000 xe máy điện), phủ sóng 61 tỉnh thành[^29]. Phú Quốc, với tư cách là một trong những địa phương đầu tiên triển khai Xanh SM và có mục tiêu rõ ràng trở thành "đảo xanh," là thị trường trọng điểm cho hãng này.

#### 3.5.2. Mục tiêu giao thông xanh của Phú Quốc

Phú Quốc đã xác định lộ trình chuyển đổi giao thông xanh với các mốc cụ thể[^30]:
- **2025:** Tối thiểu **50% phương tiện vận tải** sử dụng điện hoặc năng lượng xanh; **100% taxi** thay thế hoặc đầu tư mới sẽ sử dụng điện
- **2030:** Phú Quốc hướng tới trở thành **hòn đảo không có xe sử dụng nhiên liệu xăng, dầu**

Điều này có ý nghĩa rất lớn cho bài toán năng lượng. Khi 100% taxi trên đảo là xe điện (theo mục tiêu 2025) và toàn bộ phương tiện chuyển sang điện (mục tiêu 2030), nhu cầu sạc sẽ tăng theo cấp số nhân — vượt xa con số 51 xe buýt VinBus hiện tại trên 3 tuyến[^3].

#### 3.5.3. Tổng hợp nhu cầu sạc EV trên đảo

| Loại phương tiện | Số lượng ước tính hiện tại | Dự kiến 2027–2030 | Nhu cầu sạc |
|:---|:---:|:---:|:---|
| **Xanh SM (taxi điện)** | 300+ xe | Hàng nghìn xe (theo mục tiêu 100% taxi điện) | 7–22 kW/xe (AC) hoặc 50–150 kW/xe (DC fast) |
| **VinBus (xe buýt điện)** | 51 xe trên 3 tuyến[^3] | 80–100+ xe khi mở rộng tuyến | 100–300 kW/xe |
| **Xe cá nhân VinFast** | Đang tăng nhanh | Hàng nghìn xe (theo mục tiêu đảo xanh) | 7–22 kW/xe (AC) hoặc 50–150 kW/xe (DC fast) |
| **Xe cho thuê tự lái** | Nhiều đơn vị đang triển khai | Tăng theo du lịch | 50–150 kW/trạm (DC fast) |

#### 3.5.4. Phân tích nhu cầu điện từ EV

Ước tính thận trọng cho giai đoạn 2027:

```
Xanh SM: 500 xe × 40 kWh/ngày × 365 ngày = 7,3 triệu kWh/năm
VinBus:   80 xe × 200 kWh/ngày × 365 ngày = 5,8 triệu kWh/năm  
Cá nhân: 500 xe ×  30 kWh/ngày × 365 ngày = 5,5 triệu kWh/năm
Cho thuê: 200 xe ×  35 kWh/ngày × 365 ngày = 2,6 triệu kWh/năm
─────────────────────────────────────────────
Tổng EV:              ~21 triệu kWh/năm | Peak ~5-8 MW
```

Con số này sẽ **nhân lên gấp 3–5 lần** khi Phú Quốc đạt mục tiêu 100% phương tiện điện vào 2030. Và đây là nhu cầu mới hoàn toàn — chưa tồn tại trong phụ tải hiện tại 782 triệu kWh/năm.

**Cơ hội:** Nếu hệ thống sạc được kết nối với nguồn năng lượng tái tạo tại chỗ (solar + wind qua BESS), toàn bộ hệ sinh thái vận tải trên đảo sẽ đạt được **100% vận tải xanh** — một thông điệp cực kỳ mạnh mẽ cho thương hiệu Phú Quốc và Sun Group trước APEC 2027, đúng như bản ghi nhớ CLP nhận định: "nguồn sạc từ năng lượng tái tạo = 100% vận tải xanh"[^3].
