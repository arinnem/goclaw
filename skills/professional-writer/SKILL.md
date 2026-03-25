---
name: viet-chuyen-nghiep
description: Orchestrator tạo nội dung tiếng Việt chuyên nghiệp theo mô hình 4 lớp. Kích hoạt khi có yêu cầu viết tiếng Việt ("Viết bài...", "Tạo nội dung...", "Phân tích..."). Luôn đảm bảo chuẩn tiếng Việt.
---
### ?? CORE BEHAVIORAL RULE ??
ALWAYS try to execute requested actions yourself using available tools. Do not tell the user to perform actions that you could potentially do. Only if you try using tools and definitively fail, or if you lack the required capability entirely, should you inform the user exactly how they can help you gain the capability (e.g., configuring permissions, adding a tool).


# Viết Chuyên Nghiệp

Orchestrator tạo nội dung tiếng Việt chuyên nghiệp theo mô hình 8 bước: Content → Outline → Citation → Style → Platform → Standards → Versioning → Finalization.

## Khi Nào Dùng Skill Này

**Tự động kích hoạt khi:**
- User yêu cầu tạo nội dung tiếng Việt: "Viết bài về...", "Tạo nội dung..."
- User cần phân tích hoặc nghiên cứu: "Phân tích...", "Nghiên cứu..."
- User muốn báo cáo hoặc trình bày: "Làm báo cáo...", "Trình bày..."
- Bất kỳ task viết chuyên nghiệp bằng tiếng Việt nào

---

## Mô hình 8 bước

```
Request từ User
    ↓
┌──────────────────────────────────────────────┐
│ Bước 1: CONTENT — Viết CÁI GÌ? (optional)   │
│ Cần thu thập/xử lý dữ liệu trước khi viết?  │
│ → 01_content/nghien-cuu.md (Research)        │
│ → 01_content/phan-tich.md (Analysis)         │
│ Bỏ qua nếu đã đủ thông tin                   │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Bước 2: OUTLINE — Lập dàn ý (nếu phức tạp)  │
│ → 01_content/dan-y.md                        │
│ → Lập mục lục → Trình User duyệt            │
│ → Viết từng phần sau khi duyệt               │
│ Bỏ qua nếu bài viết ngắn/đơn giản           │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Bước 3: CHECK CITATION (Tương tác)          │
│ Nếu là Research/Report/Analysis:             │
│ → ASK USER: "Cần trích dẫn nguồn không?"     │
│ → Nếu CÓ: Load 04_standards/trich-dan-nguon.md │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Bước 4: STYLE — Viết THẾ NÀO? (chọn 1)      │
│ → 02_style/storytelling.md (Blog/Social)     │
│ → 02_style/technical-academic.md (Docs/Edu)  │
│ → 02_style/business-formal.md (Hành chính)   │
│ → 02_style/data-report.md (Phân tích)        │
│ → 02_style/executive.md (Tóm tắt quản trị)  │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Bước 5: PLATFORM — Hiển thị Ở ĐÂU? (chọn 1) │
│ → 03_platform/facebook.md (plaintext)        │
│ → 03_platform/linkedin.md (professional)     │
│ → 03_platform/email.md (thư điện tử)        │
│ → 03_platform/docx.md (Word/Report)         │
│ → 03_platform/presentation.md (Slide)       │
│ → Markdown/Blog (mặc định)                   │
│ → (docx, presentation — placeholder)         │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Bước 6: STANDARDS + SELF-REVIEW (BẮT BUỘC)    │
│ → 04_standards/quy-tac-tieng-viet.md (LUÔN)  │
│ → Sau khi viết: tự hỏi 5 câu trước khi trả  │
└──────────────────────────────────────────────┘
    ↓
Viết Content
┌──────────────────────────────────────────────┐
│ Bước 7: VERSIONING — Lưu phiên bản MD       │
│ File đã tồn tại? → Lưu bản mới với hậu tố   │
│   report.md (v1) → report-v2.md → report-v3  │
│ Thêm YAML frontmatter: version, created      │
│ Cập nhật VERSIONS.md (nếu có)                │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Bước 8: FINALIZATION — Convert Document     │
│ Nếu kết quả cuối cùng là file báo cáo .md    │
│ và user cần bản in/docx:                     │
│ → Run: python e:\OneDrive\OneDrive - sungroup.com.vn\Works\Coding\.agent\skills\md-converter\scripts\md_converter.py [file.md] │
└──────────────────────────────────────────────┘
    ↓
Convert (nếu cần)
```

> **QUY TẮC LƯU FILE BÁO CÁO (BẮT BUỘC)**
> 
> Mọi file báo cáo `.md` tạo bởi skill này **PHẢI** được lưu trong thư mục:
> `e:\OneDrive\OneDrive - sungroup.com.vn\Works\Coding\.agent\skills\professional-writer\reports\`
> 
> **Cấu trúc thư mục:** `reports/<tên-chủ-đề>/report-name.md`
> - Mỗi chủ đề/dự án có một thư mục riêng (viết thường, dùng dấu gạch ngang)
> - Ví dụ: `reports/chi-thi-cat-giam-chi-phi/chi-thi-cat-giam-chi-phi.md`
> - Ví dụ: `reports/ND357/bao-cao-tien-do.md`
> 
> **KHÔNG** lưu file báo cáo vào thư mục artifact của conversation hay thư mục tmp.


---

## Phân Tích INPUT: 8 Câu Hỏi Thiết Yếu

Trước khi routing, phân tích request bằng 8 câu hỏi:

| # | Câu hỏi | Quyết định |
|---|---------|-----------|
| 1 | User cung cấp gì? (data thô, ý tưởng, topic?) | Content modules cần load? |
| 2 | Mục đích? (inspire, educate, instruct, inform, brief) | Style module nào? |
| 3 | **Cần trích dẫn không?** (Exact citations?) | **Hỏi User** → Load `trich-dan-nguon.md` + CRAAP (`kiem-chung.md`). |
| 4 | Độc giả là ai? (Sếp, Khách hàng, Public) | Tone (Formal/Casual). |
| 5 | Platform? (Email, Facebook, Doc) | Format. |
| 6 | Tone mong muốn? (trang trọng, thoải mái, phân tích, cảm xúc) | Confirm Style module. |
| 7 | Đây là bản mới hay chỉnh sửa bài cũ? | Versioning: lưu bản mới với `-v2`, `-v3`. |
| 8 | Cần xuất bản in DOCX/PDF không? | Chạy `md_converter.py` ở bước cuối. |

---

## Routing Rules

### Bước 1: Content (Optional)

Load **chỉ khi cần** xử lý dữ liệu trước khi viết:

| Tình huống | Module |
|-----------|--------|
| User cung cấp data phức tạp, cần trích xuất insights | `01_content/phan-tich.md` |
| Topic cần thu thập thông tin, nghiên cứu | `01_content/nghien-cuu.md` |

### Bước 2: Outline & Context Limits (Báo cáo vượt quá giới hạn Token)

**BẮT BUỘC load `01_content/dan-y.md` khi:**
- Báo cáo dài / đa mục / nhiều lĩnh vực
- User dùng từ: "chi tiết", "đánh giá tác động", "toàn diện", "phân tích sâu"
- Dự kiến tài liệu vượt quá giới hạn output token của AI (> 1500 từ hoặc > 3 mục chính).

**Quy trình Xử lý Báo cáo Dài (Phòng tránh đứt đoạn vì Token Limit):**
1. Lập dàn ý chi tiết (mục lục) → Trình User duyệt.
2. User xác nhận dàn ý → KHÔNG BAO GIỜ cố gắng viết toàn bộ bài trong một phản hồi duy nhất nếu đánh giá nội dung quá dài.
3. **Chunking (Cắt nhỏ nội dung):** Chia dàn ý thành các phần (part) nhỏ (ví dụ: Part 1 gồm Mục 1 & 2, Part 2 gồm Mục 3 & 4).
4. Viết **từng phần**, báo cáo tiến độ bằng cách gửi nội dung của từng phần cho user xem (thông qua công cụ `message` hoặc trả lời trực tiếp) và đồng thời lưu nối tiếp (`append`) vào file markdown trên máy.
5. **CONTINUOUS EXECUTION (Chạy liên tục):** HẠN CHẾ DỪNG LẠI để xin phép user giữa các phần. Ngay sau khi hoàn thành Part 1, hãy lập tức tiếp tục suy luận và gọi công cụ để viết Part 2, và cứ tiếp tục như vậy cho đến khi HOÀN THÀNH 100% toàn bộ báo cáo. Tự động lặp lại quy trình viết cho đến phút cuối cùng.

### Bước 3: Citation Check + CRAAP (Ask Protocol)

**Rule:** Với các task Nghiên cứu, Báo cáo, Phân tích số liệu.
**Action:** Nếu User chưa chỉ định, **HỎI NGAY:**
> "Bạn có cần bài viết bao gồm trích dẫn nguồn chính xác (số trang, link) không?"
**Load:** Nếu User = YES → Load `04_standards/trich-dan-nguon.md` + `04_standards/kiem-chung.md` (CRAAP framework).
**CRAAP:** Mọi nguồn được cite phải đạt ≥ 30/50 điểm CRAAP (Currency, Relevance, Authority, Accuracy, Purpose).

### Bước 4: Style (Chọn 1)

| Mục đích | Tone | Độc giả | Module |
|---------|------|----------|--------|
| Inspire, persuade, truyền cảm hứng | Cảm xúc, story | Phổ thông | `02_style/storytelling.md` |
| Educate, document, hướng dẫn | Chuyên môn, academic | Technical/Students | `02_style/technical-academic.md` |
| **Công văn, tờ trình, báo cáo, đề xuất** | **Trang trọng, Hán-Việt** | **Sếp/Đối tác** | **`02_style/business-formal.md`** |
| Inform, data-driven | Phân tích | Professionals | `02_style/data-report.md` |
| Brief executives | Ngắn gọn, actionable | Decision-makers | `02_style/executive.md` |

### Bước 5: Platform (Chọn 1)

| Platform | Module | Ghi chú |
|----------|--------|---------|
| Facebook | `03_platform/facebook.md` | Plaintext, emoji |
| LinkedIn | `03_platform/linkedin.md` | Professional storytelling |
| Email | `03_platform/email.md` | Formal/Casual email |
| DOCX/Report | `03_platform/docx.md` | Copy-paste vào Word |
| Presentation | `03_platform/presentation.md` | Slide content |
| Blog/Website | Không cần load | Markdown mặc định |

### Bước 6: Standards + Self-Review (BẮT BUỘC)

**Trước khi viết — load:**
- `04_standards/quy-tac-tieng-viet.md` (LUÔN)
- `04_standards/trich-dan-nguon.md` (nếu cần Citation)

**Sau khi viết — tự hỏi 5 câu trước khi trả bài:**
1. Dấu câu có chuẩn không?
2. Chỗ nào in đậm có thực sự cần không? (bỏ bold thử)
3. Toàn bài nhất quán từ đầu đến cuối chưa?
4. Các đoạn có đều nhau không? (nếu đều → sửa)
5. Câu chuyển ý có nhạt không? (nếu lặp → viết lại)

Không trả bài ngay. Rà soát rồi mới trả. Xem chi tiết tại mục X trong `quy-tac-tieng-viet.md`.

### Bước 7: Versioning File MD

**Rule:** Khi lưu file `.md` báo cáo, LUÔN kiểm tra versioning.

**Khi nào áp dụng:**
- User yêu cầu chỉnh sửa, cập nhật, viết lại bài đã có
- User nói: "sửa lại", "cập nhật", "thêm vào", "viết lại phần..."

**Quy tắc đặt tên:**
- Bản gốc: `report-name.md` (coi là v1)
- Bản sửa lần 1: `report-name-v2.md`
- Bản sửa lần 2: `report-name-v3.md`
- Tiếp tục tăng dần: `-v4`, `-v5`...

**Quy trình:**
1. Kiểm tra thư mục: file gốc có tồn tại không?
2. Nếu CÓ → tìm version number cao nhất hiện có (scan `-v2`, `-v3`... trong thư mục)
3. Lưu bản mới với hậu tố tiếp theo (ví dụ: đã có `-v3` → lưu `-v4`)
4. **KHÔNG ghi đè file cũ** — giữ nguyên tất cả phiên bản trước

**Metadata YAML frontmatter (BẮT BUỘC cho mỗi file MD báo cáo):**
```yaml
---
title: "Tên báo cáo"
version: 2
created: 2026-03-05
previous_version: report-name.md
changes: "Mô tả ngắn gọn thay đổi so với bản trước"
---
```

**VERSIONS.md (tùy chọn — dùng khi thư mục có ≥ 3 phiên bản):**
Tạo/cập nhật file `VERSIONS.md` trong thư mục báo cáo:
```markdown
# Lịch sử phiên bản

| Version | File | Ngày | Thay đổi |
|---------|------|------|----------|
| v1 | report-name.md | 2026-03-01 | Bản gốc |
| v2 | report-name-v2.md | 2026-03-03 | Cập nhật số liệu Q1 |
| v3 | report-name-v3.md | 2026-03-05 | Thêm phân tích rủi ro |
```

**Lưu ý:**
- Nếu user viết bài MỚI (không phải chỉnh sửa) → không cần version, lưu bình thường
- File gốc luôn KHÔNG có hậu tố `-v1` (để tương thích với `md_converter.py`)

### Bước 8: Finalization (Convert DOCX)

**Khi nào dùng:**
Khi user cần xuất file Word (.docx) để in ấn hoặc nộp báo cáo (đặc biệt các báo cáo chiến lược, tờ trình).
**Hành động:** Sử dụng script `md_converter.py` (từ skill `md-converter`) để convert tự động file markdown sang DOCX hoặc PDF. Script hỗ trợ **auto-versioning** (tự động thêm hậu tố `-v1`, `-v2` nếu file đã tồn tại để tránh ghi đè).
**Lệnh:** `python "e:\OneDrive\OneDrive - sungroup.com.vn\Works\Coding\.agent\skills\md-converter\scripts\md_converter.py" <path_to_md_file> [optional_output_filename] --font "Times New Roman" --font-size 12`

---

## Auto-Detect Patterns

| User Nói | Route Đến |
|-----------|-----------|
| "Viết bài blog về...", "Viết stt..." | storytelling |
| "Viết công văn...", "Làm tờ trình..." | **business-formal** |
| "Viết báo cáo...", "Làm report..." | **business-formal** (Check Citation!) |
| "Phân tích data/dữ liệu..." | phan-tich → data-report (Check Citation!) |
| "Viết tài liệu kỹ thuật...", "Hướng dẫn..." | technical-academic |
| "Nghiên cứu về..." | nghien-cuu → (Ask Style + Citation) |
| "Tóm tắt cho sếp..." | executive |
| "Làm báo cáo, thuyết trình..." | data-report hoặc executive (Ask Citation) |
| "Viết email..." | email |
| "Viết tài liệu, báo cáo..." | docx |

---

## Sơ Đồ Module

```
viet-chuyen-nghiep/
│
├── SKILL.md                     ← Bạn đang ở đây (Router)
│
├── 01_content/                  ← NỘI DUNG — Thu thập, xử lý
│   ├── nghien-cuu.md            ← Topic → Information [SẴN SÀNG]
│   ├── phan-tich.md             ← Data → Insights [SẴN SÀNG]
│   └── dan-y.md                 ← Outline/TOC cho báo cáo phức tạp [NEW]
│
├── 02_style/                    ← TRÌNH BÀY — Phương pháp viết
│   ├── storytelling.md          ← Cảm xúc/Blog [SẴN SÀNG]
│   ├── technical-academic.md    ← Kỹ thuật/Học thuật [SẴN SÀNG]
│   ├── business-formal.md       ← Hành chính/Công vụ [NEW]
│   ├── data-report.md           ← Phân tích [NEW]
│   └── executive.md             ← Tóm tắt [NEW]
│
├── 03_platform/                 ← NỀN TẢNG — Format theo platform
│   ├── facebook.md              ← Plaintext Facebook [SẴN SÀNG]
│   ├── email.md                 ← Email [NEW]
│   └── docx.md                  ← DOCX/Report [NEW]
│
└── 04_standards/                ← TIÊU CHUẨN — Rà soát
    ├── quy-tac-tieng-viet.md    ← Quy tắc tiếng Việt [BẮT BUỘC]
    ├── trich-dan-nguon.md       ← Trích dẫn nguồn [NEW - Optional]
    └── kiem-chung.md            ← Kiểm chứng claims [SẴN SÀNG]
```

---

## Checklist thực hiện

Với mỗi request tạo nội dung:

- [ ] Phân tích INPUT kỹ lưỡng (trả lời đủ 6 câu hỏi)
- [ ] Xác định có cần content modules không (Bước 1)
- [ ] **Outline:** Nếu báo cáo phức tạp → Lập dàn ý, trình User duyệt (Bước 2)
- [ ] **Citation Check:** Nếu là Report/Research → **HỎI USER** về trích dẫn (Bước 3)
- [ ] **CRAAP:** Nếu có citation, đánh giá mọi nguồn qua CRAAP Test (≥ 30/50)
- [ ] Chọn style module phù hợp (Bước 4)
- [ ] Xác định platform target (Bước 5)
- [ ] **Load 04_standards/quy-tac-tieng-viet.md** (BẮT BUỘC - không bỏ qua)
- [ ] Load 04_standards/trich-dan-nguon.md nếu User yêu cầu
- [ ] Viết content **từng phần** (nếu có dàn ý)
- [ ] Verify đã tuân thủ tiêu chuẩn
- [ ] **Versioning:** Nếu chỉnh sửa bài cũ → lưu bản mới với hậu tố `-v2`, `-v3`... (Bước 7)
- [ ] **Metadata:** Thêm YAML frontmatter (version, created, changes) vào file MD
- [ ] **Convert DOCX/PDF:** Chạy `md_converter.py` nếu user cần file Word hoặc PDF (Bước 8)

---

## Lỗi Thường Gặp Cần Tránh

**❌ Không nên:**
- Bỏ qua loading quy-tac-tieng-viet.md
- Trộn cụm từ tiếng Anh trong văn xuôi ("performance của team")
- Dùng format kiểu AI trong storytelling ("Key insights:")
- Load tất cả modules cùng lúc (lãng phí token)
- Trộn content rules vào platform module

**✅ Nên:**
- Luôn load quy-tac-tieng-viet.md trước khi viết
- Giữ tiếng Việt thuần túy (chỉ giữ từ quen thuộc như CEO, AI)
- Tách rõ: style = cách viết, platform = cách hiển thị
- Load modules dần dần khi cần

---

## Mở Rộng Trong Tương Lai

**Style modules (02_style/):**
- `technical.md` - Hướng dẫn/Docs
- `data-report.md` - Phân tích dữ liệu
- `executive.md` - Briefs ngắn gọn

**Platform modules (03_platform/):**
- `linkedin.md` - Posts cho LinkedIn
- `docx.md` - Báo cáo văn phòng
- `presentation.md` - Nội dung slide
- `email.md` - Email template

Thêm modules mới vào thư mục phù hợp và update router này.

---

**Token Budget:** ~3,200 tokens  
**Vai trò:** Orchestrator/Router  
**Triết lý:** 8 bước — Content, Outline, Citation+CRAAP, Style, Platform, Standards+Self-Review, Versioning, Finalization  
**Version:** 8.0 (Versioning: lưu phiên bản MD, không ghi đè file cũ)

