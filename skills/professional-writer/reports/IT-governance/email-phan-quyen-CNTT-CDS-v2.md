---
title: "Email đề xuất khung phân quyền hoạt động CNTT & CĐS"
version: 2
created: 2026-03-16
previous_version: email-phan-quyen-CNTT-CDS.md
changes: "Thay thế bảng RACI theo vòng đời dự án bằng bảng RACI theo mảng chức năng (IT Domains), mở rộng từ 11 lên 19 nhóm công việc, bổ sung mảng An ninh Bảo mật và chi tiết hóa mảng Vận hành. Cập nhật phần giải thích phù hợp với bảng mới."
---

**Tiêu đề email:** [Xin ý kiến] Đề xuất khung phân quyền hoạt động CNTT & CĐS - Ban CNTT & DEC

---

Kính gửi anh Vịnh và anh Long,

Căn cứ chỉ đạo của Lãnh đạo Tập đoàn về việc phân công nhiệm vụ cho các lãnh đạo Ban điều hành và giao quyền trong toàn bộ hoạt động của Tập đoàn, Ban Nhân sự đã gửi form mẫu phân quyền tổng quan để các bên tham gia ý kiến, đề xuất nội dung gửi lại trước 10h sáng thứ Ba, 17/03/2026.

Nhận thấy hoạt động này có sự tương đồng với ma trận RACI mà Ban CNTT và DEC đang phối hợp xây dựng, em xin gửi một số nội dung để hai anh cân nhắc, thống nhất trước khi báo cáo Lãnh đạo Tập đoàn.

---

## 1. Tổng quan và bối cảnh

Sự dịch chuyển cơ cấu tổ chức từ một Ban CNTT truyền thống (năm 2022) sang mô hình bổ sung Khối Số & Dữ liệu chuyên biệt (năm 2024) đặt ra yêu cầu phải có một bước tiến tương xứng về cơ chế quản trị. Thực trạng hiện nay cho thấy bản chất công nghệ đã phức tạp hơn, quy mô ngân sách đã mở rộng, nhưng cơ chế phê duyệt vẫn giữ nguyên cách thức cũ.

Việc Lãnh đạo cấp cao (thông qua Ủy ban CĐS&CN do Tổng Giám đốc làm Chủ tịch) vẫn phải trực tiếp thẩm định và phê duyệt các tờ trình mang tính sự vụ (duyệt phương án làm một tính năng ứng dụng, thẩm định kiến trúc kỹ thuật, phân công đầu mối thực hiện SEO hay cấp tài khoản người dùng...) đang bộc lộ hai điểm nghẽn:

- Tạo nút thắt về tiến độ triển khai vì Lãnh đạo bị sa lầy vào tiểu tiết, thiếu thời gian cho các quyết sách chiến lược.
- Đẩy rủi ro chuyên môn lên thẩm quyền tối cao. Trong bối cảnh Tập đoàn chưa có chức danh lãnh đạo cấp cao chuyên trách công nghệ (CIO/CDO), việc một đơn vị thực thi "tự trình" và Lãnh đạo "tự duyệt" tiềm ẩn rủi ro lãng phí nguồn lực do thiếu lớp thẩm định chuyên sâu.

Định hướng của Lãnh đạo Tập đoàn về việc Tổng Giám đốc giữ lại các thẩm quyền mang tính định hướng, chiến lược và phê duyệt tài chính, đồng thời giao quyền các công việc vận hành chi tiết cho cấp dưới, hoàn toàn phù hợp với các khung quản trị quốc tế đang được áp dụng rộng rãi trong lĩnh vực CNTT và CĐS (COBIT, COSO, TOGAF, PMI, ITIL). Đây là một bước cải thiện quan trọng, có thể giúp hoạt động CNTT và CĐS đổi mới một cách thực chất cả về quản trị lẫn thực thi.

## 2. Phương pháp luận đề xuất

Để đề xuất có tính hệ thống và bền vững, em kiến nghị xây dựng khung phân quyền dựa trên phương pháp luận quản trị công nghệ tích hợp, đúc kết từ 5 khung tiêu chuẩn quốc tế, được điều chỉnh phù hợp với thực trạng tổ chức tại Tập đoàn.

Bản chất của phương pháp luận này là tách bạch rõ ràng giữa "quản trị" và "điều hành". Tổng Giám đốc tập trung vào mục tiêu và dòng tiền, trong khi toàn bộ khâu thực thi phía dưới được kiểm soát rủi ro bằng một hệ thống thẩm định đối trọng chéo, hoạt động như một cơ chế kiểm soát tập thể thay cho vị trí Phó Tổng Giám đốc phụ trách công nghệ mà Tập đoàn hiện chưa có.

Cụ thể, 5 trụ cột phương pháp luận bao gồm:

**(1) Tách bạch quản trị và điều hành (theo COBIT 2019)**

Theo chuẩn mực COBIT của ISACA, quản trị vĩ mô (Governance) thuộc thẩm quyền Hội đồng quản trị/Tổng Giám đốc, chỉ tập trung vào việc đánh giá nhu cầu, định hướng và cấp ngân sách, giám sát hiệu quả đầu tư. Điều hành thực thi (Management) thuộc thẩm quyền cấp Ban/Khối, phụ trách lập kế hoạch, xây dựng/mua sắm, vận hành và xử lý sự cố.

Áp dụng vào thực tế, Tổng Giám đốc chỉ phê duyệt danh mục ngân sách đầu tư tổng thể đầu năm và đánh giá giá trị sinh lời cuối năm. Toàn bộ khâu lựa chọn nhà thầu, thiết kế giải pháp và triển khai được ủy quyền cho cấp Ban/Khối tự quyết theo hạn mức tài chính (DoA) được ban hành rõ ràng.

**(2) Phân tách trách nhiệm và đối trọng chéo (theo COSO/SoD)**

Nguyên tắc kiểm soát nội bộ của COSO quy định người tạo ra (Maker) không được kiêm người kiểm duyệt (Checker). Nguyên tắc này được thể chế hóa thông qua Tiểu ban thẩm định (IAB - Implementation Approval Board), hoạt động với cơ chế ba bên:

- Khối DEC (người đề xuất/Maker)
- Ban CNTT (thẩm định kỹ thuật, bóc tách khối lượng/Tech Checker)
- Ban Thẩm định/Tài chính (đối chiếu đơn giá thị trường/Commercial Checker)

Quyết định chỉ được thông qua khi cả ba bên đồng thuận, nhằm đảm bảo kiểm soát chặt nguồn lực.

**(3) Quản trị theo phễu lọc rủi ro (theo Stage-Gate Process của PMI)**

Đầu tư công nghệ là loại hình đầu tư vô hình, rủi ro chìm (sunk-cost) lớn. Tiến trình đầu tư được chia thành các cổng gác (Gates) nhằm lọc và xử lý rủi ro theo từng giai đoạn:

- Gate 0 (đầu tư) nằm trong danh mục ngân sách Tổng Giám đốc đã phê duyệt đầu năm.
- Gate 1 (kiến trúc - DAB) lọc và loại bỏ các giải pháp không đạt chuẩn về kiến trúc, bảo mật.
- Gate 2 (thương mại - IAB) thẩm định tính hợp lý về chi phí, đơn giá.

Khi hồ sơ đến tay người ký duyệt cuối cùng (theo hạn mức DoA), hồ sơ đó đã được xử lý qua các lớp lọc rủi ro. Văn phòng Tập đoàn hoặc Thư ký Ủy ban có thể từ chối tiếp nhận mọi tờ trình vượt cấp nếu thiếu biên bản đồng thuận của DAB và IAB đính kèm.

**(4) Quản trị theo vai trò, không gắn cứng vào phòng ban (theo TOGAF)**

Khung kiến trúc doanh nghiệp TOGAF quy định thẩm quyền không được gán vào tên một phòng ban cụ thể (vì phòng ban có thể tái cơ cấu), mà gán vào các vai trò được định nghĩa rõ ràng. Bốn vai trò phổ quát được áp dụng cho mọi dự án công nghệ:

- Business Sponsor (chủ đầu tư ra kinh phí và đề bài nghiệp vụ)
- Implementer (người trực tiếp thi công hoặc thuê đối tác)
- Gatekeeper (trọng tài DAB/IAB)
- Operator (người nhận bàn giao vận hành)

Cách tiếp cận này giúp khung ma trận phân quyền mang tính bền vững, không bị phá vỡ khi Tập đoàn thay đổi cơ cấu tổ chức trong tương lai.

**(5) Quản trị vận hành bằng cam kết dịch vụ (theo ITIL 4)**

Theo ITIL 4, các hoạt động phối hợp thường xuyên (BAU - Business As Usual) không phải là "dự án" để xin ý kiến Lãnh đạo, mà là các "dịch vụ" cần được quản lý bằng cam kết chất lượng. Cụ thể:

- Các đơn vị ngang cấp ở tầng thực thi (Truyền thông, DEC, CNTT...) phải tự họp, phân chia trách nhiệm và ký kết cam kết dịch vụ nội bộ (Internal SLA/SOP), trong đó quy định rõ thời gian đáp ứng và trách nhiệm mỗi bên.
- Không đưa các tờ trình phân công sự vụ vận hành lên cấp Tập đoàn để Lãnh đạo phân xử.
- Tổng Giám đốc chỉ xem xét báo cáo vi phạm SLA hàng tháng để đánh giá KPI các đơn vị.

## 3. Các lớp thẩm quyền đề xuất

Sau buổi thảo luận giữa anh Vịnh, anh Tiến, anh Trung và tiếp nhận được nhiều ý kiến đóng góp, em xin đề xuất 4 lớp có thẩm quyền quyết định trong hoạt động CNTT và CĐS tại Tập đoàn:

| Lớp | Thẩm quyền | Phạm vi |
|-----|------------|---------|
| Lớp 1 | Lãnh đạo Tập đoàn (đại diện là TGĐ kiêm Chủ tịch UB CĐS&CN) | Phê duyệt chiến lược, danh mục ngân sách đầu tư tổng thể, giám sát hiệu quả đầu tư |
| Lớp 2 | Tiểu ban trực thuộc UB CĐS&CN (DAB và IAB) | Thẩm định kiến trúc kỹ thuật, thẩm định thương mại, cấp "visa" cho hồ sơ trước khi trình ký duyệt |
| Lớp 3 | Lãnh đạo Ban CNTT và DEC | Quyết định các nội dung thực thi trong phạm vi ngân sách và hạn mức được ủy quyền |
| Lớp 4 | Các đơn vị/cá nhân có liên quan | Phối hợp thực hiện, vận hành theo cam kết dịch vụ nội bộ (SLA/SOP) |

## 4. Ma trận phân quyền chi tiết theo mảng chức năng

Bảng dưới đây cụ thể hóa vai trò của từng tầng thẩm quyền đối với các nhóm công việc chính, phân chia theo mảng chức năng CNTT (IT Domains).

| Nhóm công việc (phân chia theo mảng chức năng) | Tầng 1 - LĐTĐ (TGĐ/UB CĐS) | Tầng 2 - Tiểu ban Kiến trúc (DAB) | Tầng 3 - Tiểu ban Thực thi & Giá (IAB) | Tầng 4 - Đơn vị nghiệp vụ | Tầng 4 - Đơn vị triển khai | Tầng 4 - Đơn vị vận hành |
|---|---|---|---|---|---|---|
| **I. Quản trị chiến lược, kiến trúc & ngân sách (IT Governance)** | | | | | | |
| Phê duyệt chiến lược CĐS, quy hoạch hạ tầng, nền tảng lõi (SAP/Cloud) & khung bảo mật toàn TĐ | A | C (đề xuất/thẩm định) | I | I | R (dự thảo) | C |
| Phê duyệt ngân sách tổng thể & danh mục đầu tư (CAPEX/OPEX cho phần mềm, hạ tầng, bản quyền, ELV) | A | I | I | R (đề xuất nhu cầu) | R (đề xuất nhu cầu) | I |
| Ban hành khung kiến trúc doanh nghiệp (EA), tiêu chuẩn tích hợp & Barem đơn giá IT (Rate Card) | I | A (duyệt Visa Chuẩn) | A (chốt Barem Giá) | I | C | R (dự thảo) |
| **II. Quản trị dữ liệu & phát triển sản phẩm số (Data & Digital Apps)** | | | | | | |
| Đưa ra yêu cầu bài toán kinh doanh (BRD), công năng phần mềm & quyền làm chủ dữ liệu | I | I | I | A/R | C (tư vấn) | I |
| Xây dựng kiến trúc giải pháp (App/Web), luồng tích hợp Data & bóc tách nỗ lực lập trình (man-days) | I | A (cấp Visa Kiến trúc) | A (chốt khối lượng) | C | R (thiết kế) | C |
| Thẩm định đơn giá phần mềm, đàm phán hợp đồng, quyết định chọn Vendor triển khai | Theo DoA | I | R (thẩm định/giá chủ trì) | I | A* (theo DoA) | I |
| Lập trình (code), cấu hình phần mềm, kiểm thử kỹ thuật (SIT) & nghiệm thu (UAT/Go-live) | I | I | I | A (ký nhận UAT) | R (phát triển) | C (tiếp nhận) |
| **III. Nền tảng lõi (SAP), hạ tầng & điện nhẹ (Core, Infra & ELV)** | | | | | | |
| Quy hoạch, thiết kế kiến trúc Data Center, mạng Cloud, SAP ERP & bản vẽ ELV/Camera các dự án | I | A (cấp Visa Bản vẽ/KT) | I | C | R (thiết kế) | C (đánh giá) |
| Bóc tách dự toán vật tư (BOQ), thẩm định đơn giá thiết bị/License & quyết định mua sắm | Theo DoA | I | A (chốt BOQ/giá vật tư) | A* (mua ELV theo DoA) | A* (mua IT theo DoA) | I |
| Thi công cáp mạng, lắp đặt phần cứng & cấu hình nền tảng máy chủ | I | I | I | C (giám sát) | R (thi công) | C (đánh giá chuẩn) |
| **IV. An ninh bảo mật không gian mạng (Cybersecurity)** | | | | | | |
| Rà quét lỗ hổng (Pen-test), đánh giá ATTT hệ thống/app trước khi hòa mạng | I | C | I | I | R (phối hợp vá lỗi) | A (quyền phủ quyết) |
| Thiết lập phòng thủ, trực điều hành Trung tâm giám sát an ninh mạng (SOC) 24/7 & ứng cứu sự cố | I | I | I | I | I | A/R |
| Phê duyệt ngoại lệ bảo mật (Security Exceptions) / chấp nhận rủi ro khi không thể khắc phục | A (rủi ro toàn TĐ) | A (rủi ro hệ thống) | I | I | C | R |
| **V. Khai thác & vận hành dịch vụ CNTT (IT Service Management - BAU)** | | | | | | |
| Quản trị sự thay đổi (Change Mgt): phê duyệt đưa mã nguồn/bản vá/cấu hình mới lên môi trường thực tế | I | C (nếu đổi Core) | I | I | R (thực hiện đẩy) | A (cấp phép thời điểm) |
| Giám sát sức khỏe hạ tầng (Health-check Cloud/DC), sao lưu & phục hồi thảm họa (DR) | I | I | I | I | I | A/R |
| Quản trị định danh: phê duyệt cấp/khóa/phân quyền User khai thác hệ thống (SAP/Non-SAP) | I | I | I | A (chủ dữ liệu duyệt) | I | R (thực thi theo lệnh) |
| Trực xử lý lỗi (Helpdesk), hỗ trợ người dùng & khắc phục lỗi phần mềm (Bug fix) | I | I | I | C | C (hỗ trợ code Tier 3) | A/R |
| Phân xử xung đột ranh giới vận hành, phân công nhiệm vụ sự vụ (ký SLA nội bộ liên ban) | I (nhận B/C) | C | I | A/R | A/R | A/R |

Một số điểm cần lưu ý khi đọc bảng trên:

- Ký hiệu RACI được sử dụng theo chuẩn quốc tế. A (Accountable) là người chịu trách nhiệm cuối cùng và có quyền phê duyệt. R (Responsible) là người trực tiếp thực hiện công việc. C (Consulted) là bên được hỏi ý kiến trước khi quyết định. I (Informed) là bên được thông báo sau khi quyết định được đưa ra.
- Ký hiệu A* xuất hiện tại các dòng liên quan đến quyết định mua sắm/chọn thầu, có nghĩa thẩm quyền phê duyệt phụ thuộc vào hạn mức ủy quyền tài chính (DoA). Nếu giá trị nằm trong hạn mức, Lãnh đạo Ban/Khối tự ký duyệt. Nếu vượt hạn mức, hồ sơ phải trình Tổng Giám đốc, nhưng khi đó hồ sơ đã được DAB và IAB thẩm định hoàn chỉnh.
- Tầng 2 (DAB) và Tầng 3 (IAB) không phải là cấp phê duyệt ngân sách, mà đóng vai trò cổng lọc rủi ro. DAB tập trung vào kiến trúc, bảo mật và cấp "Visa" kỹ thuật cho bản vẽ, thiết kế giải pháp. IAB tập trung vào khối lượng, đơn giá và chốt dự toán thương mại. Biên bản đồng thuận của hai Tiểu ban này là điều kiện bắt buộc trước khi hồ sơ được trình ký duyệt.
- Tầng 4 được chia thành 3 vai trò riêng biệt (Đơn vị nghiệp vụ, Đơn vị triển khai, Đơn vị vận hành) thay vì gắn cứng vào tên phòng ban. Trong mỗi dự án cụ thể, một đơn vị sẽ tự nhận diện mình thuộc vai trò nào. Ví dụ, trong dự án ứng dụng khách sạn, Khối Khách sạn là Đơn vị nghiệp vụ, DEC là Đơn vị triển khai và Ban CNTT là Đơn vị vận hành.
- Mảng IV (An ninh bảo mật) có một số điểm đặc thù. Đơn vị vận hành (Ban CNTT/ATTT) được trao quyền phủ quyết (veto) đối với việc hòa mạng hệ thống/ứng dụng nếu chưa đạt chuẩn an toàn thông tin. Đối với các ngoại lệ bảo mật không thể khắc phục, thẩm quyền chấp nhận rủi ro được phân tầng: rủi ro cấp hệ thống do DAB quyết định, rủi ro cấp toàn Tập đoàn do Lãnh đạo Tập đoàn quyết định.
- Mảng V (Vận hành dịch vụ CNTT) khác biệt so với 4 mảng trên. Các tác vụ thuộc mảng này không phải là dự án, do đó không cần trình xin ý kiến Lãnh đạo. Thay vào đó, các đơn vị Tầng 4 tự phân chia trách nhiệm và ký kết cam kết dịch vụ nội bộ (SLA). Tổng Giám đốc chỉ nhận báo cáo vi phạm SLA hàng tháng (ký hiệu "I - nhận B/C" ở dòng cuối cùng) để đánh giá KPI các đơn vị. Đặc biệt, quy trình quản trị định danh (cấp/khóa User) được thiết kế rõ ràng: đơn vị nghiệp vụ là chủ dữ liệu, có quyền phê duyệt (A), còn đơn vị vận hành chỉ thực thi theo lệnh (R).

## 5. Đảm bảo khả năng thực thi

Để khung phân quyền trên có thể vận hành hiệu quả trên thực tế, em kiến nghị một số điều kiện đi kèm:

- Ban hành ma trận ủy quyền tài chính (DoA) quy định rõ hạn mức từng cấp được phê duyệt mà không cần trình Tổng Giám đốc.
- Thành lập và quy chế hóa hoạt động của hai Tiểu ban gác cổng: DAB (Design Architecture Board) cho thẩm định kiến trúc và IAB (Implementation Approval Board) cho thẩm định thương mại.
- Xây dựng Barem đơn giá CNTT (Rate Card) hàng năm để Ban Thẩm định có cơ sở đối chiếu khi thẩm định chi phí.
- Yêu cầu các đơn vị tầng thực thi ký kết cam kết dịch vụ nội bộ (Internal SLA) cho các tác vụ vận hành giao thoa, thay vì lập tờ trình xin phân công từ cấp trên.
- Quy định Văn phòng Tập đoàn/Thư ký Ủy ban từ chối tiếp nhận tờ trình vượt cấp nếu thiếu biên bản đồng thuận của DAB và IAB.

---

Trên đây là một số nội dung em tổng hợp và đề xuất. Rất mong hai anh cho ý kiến để có thể thống nhất và hoàn thiện trước thời hạn Ban Nhân sự yêu cầu.

Trân trọng,
[Họ tên]
[Chức vụ] - [Đơn vị]
