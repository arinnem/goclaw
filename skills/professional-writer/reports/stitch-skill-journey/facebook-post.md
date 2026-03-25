AI VẼ 16 MÀN HÌNH TRONG MỘT BUỔI SÁNG, VÀ MÌNH CHỈ NGỒI XEM

Chuyện bắt đầu từ một cái khó chịu nho nhỏ.

Google Stitch vừa ra MCP (Model Context Protocol), cho phép AI agent gọi vào để vẽ wireframe. Trước đó mình vẫn dùng Stitch theo kiểu truyền thống: upload file mô tả lên, Stitch tự đọc, tự vẽ. Kết quả tốt, ra đúng hệ thống, navigation nhất quán, data xuyên suốt.

Nhưng mỗi lần muốn thêm screen thì phải ngồi click tay. Tạo screen mới, paste prompt, chờ, rồi lại tạo screen mới. Với hệ thống có 16 màn hình thì ngồi click cũng mỏi tay.

===

Thế là mình thử cách ngược lại. Nhờ AI đọc toàn bộ file mô tả phần mềm, tự list ra danh sách screens, rồi tự gọi Stitch MCP để vẽ từng cái. Tự động hoàn toàn, mình không cần click gì.

Nhanh thì nhanh thật. Nhưng kết quả thì... hơi buồn. Mỗi screen đứng riêng thì đẹp, nhưng ghép lại thì mỗi cái một sidebar, mỗi cái một menu, data không liên quan gì đến nhau. Có cái còn không phải wireframe mà là "design documentation", kiểu giải thích navigation trông thế nào thay vì vẽ cho người dùng xem.

Mình ngồi chấm điểm cả hai cách. Upload trực tiếp lên Stitch: 36/45. AI tự gọi MCP: 19/45.

===

Nhưng ngồi nghĩ kỹ thì vấn đề không phải ở Stitch hay ở AI agent. Vấn đề là context.

Upload trực tiếp, Stitch nhận hết tài liệu trong một lần, hiểu toàn bộ hệ thống rồi mới phân chia screens. Gọi qua MCP, mỗi lần là một session riêng, Stitch không biết screen trước đã vẽ gì. Đương nhiên nó chọn layout riêng.

Vậy nếu ghép hai cái lại thì sao? Giữ cái "hiểu tổng thể" của cách 1, cộng cái "tự động không cần click" của cách 2?

===

Mình bắt đầu xây một cái skill cho AI agent. Tạm gọi là "Stitch Wireframe Skill".

Ý tưởng cốt lõi là trước khi vẽ bất kỳ screen nào, tạo ra một "Design System Spec" chung. Rồi nhét nguyên cái spec đó vào mọi prompt gửi Stitch. Mỗi prompt không chỉ mô tả screen cần vẽ mà còn chứa toàn bộ hệ thống: navigation structure, color palette, danh sách tất cả 16 screens và "đây là screen số 7, sidebar đang highlight mục Org Detail."

Pipeline 8 bước. AI đọc tài liệu, hỏi người dùng có screenshot hay brand guide nào tham khảo không, rồi đề xuất actors và journeys cho người dùng duyệt trước. Được duyệt rồi mới tạo design system, rồi mới build prompt cho từng screen. Cuối cùng thì feed vào Stitch.

Có hai mode: interactive (AI vẽ từng cái, hỏi ý kiến rồi mới tiếp) và auto-feed (AI tự vẽ hết 16 cái liền, mình review sau).

===

Chạy thử auto-feed qua Stitch MCP cho hệ thống TaskLens v2. 16 screens. AI tự gọi generate_screen_from_text lần lượt S01 đến S16. Ngồi xem progress bar nhảy số: "Auto-feeding S05 Reports Overview (5/16)... S07 Org Detail Drill-down (7/16)... S12 Alerts Console (12/16)..."

Đến dòng "All 16/16 screens auto-fed to Stitch MCP project. All generated successfully" thì thở phào.

Và kết quả lần này khác hẳn. Dashboard có đủ KPI, xếp hạng đơn vị, phân bổ trạng thái, phân bổ sức khỏe, deadline, phân bổ khối lượng. Comparison View có trend chart, delta analysis, word-level diff. Navigation nhất quán xuyên suốt. Data liên kết chéo giữa các screens.

Nói cách khác: ra đúng hệ thống, không phải mấy cái hình rời rạc.

===

Skill này vẫn đang trong quá trình hoàn thiện. Phần auto-feed qua MCP thì chạy được rồi. Mình đang thử nghiệm tiếp phương án auto-feed bằng script gọi trực tiếp API stitch.googleapis.com (cùng credential, khác cơ chế), thêm retry logic, batch processing cho những project lớn hơn. Phần login qua gcloud cũng cần tự động hóa thêm.

Sẽ update skill tiếp. Các bạn quan tâm lấy repo tại [link] và fork hay contribute thoải mái nhé.

Bài học nhỏ cuối ngày: khi AI cho kết quả rời rạc, đôi khi không phải nó chưa đủ giỏi. Đôi khi mình chưa cho nó đủ context thôi.
