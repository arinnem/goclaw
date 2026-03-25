# Nghiên Cứu Topic → Information

**Module:** Process  
**Mục đích:** Thu thập và tổ chức thông tin từ topic/keyword để viết content đầy đủ

## Khi Nào Dùng Module Này

**Load module này khi:**
- User đưa ra topic nhưng thiếu thông tin chi tiết
- Chủ đề xa lạ, cần tìm hiểu thêm
- Cần facts, context, examples để làm phong phú content
- Viết về trend/technology/topic mới

**Không cần dùng khi:**
- Topic quen thuộc, có đủ kiến thức sẵn
- User đã cung cấp đầy đủ thông tin
- Content opinion-based, không cần research

---

## Quy Trình Nghiên Cứu

### Bước 1: Map Information Gaps

**Xác định cần tìm gì:**

Từ topic, liệt kê 5W1H:
- **What:** Topic này là gì? Định nghĩa?
- **Why:** Tại sao quan trọng? Context?
- **Who:** Liên quan đến ai? Target audience?
- **Where:** Phạm vi áp dụng? (global/VN specific?)
- **When:** Timeline? Trends? Current state?
- **How:** Cách thức hoạt động? Process? Examples?

**Template checklist:**
```markdown
Topic: [Tên topic]

Đã biết:
- [Info có sẵn]
- [...]

Cần tìm:
- [ ] Định nghĩa chính xác
- [ ] Statistics/numbers (nếu relevant)
- [ ] Examples cụ thể (Vietnam context)
- [ ] Expert opinions/quotes
- [ ] Trends/future outlook
- [ ] Common misconceptions
- [ ] Practical applications
```

### Bước 2: Research Strategy

**Phân loại thông tin cần tìm:**

#### Tier 1: Foundation (Bắt buộc)
- Định nghĩa chính xác
- Core concepts
- Basic facts
→ **Nguồn:** Wikipedia (overview), định nghĩa chính thức, textbooks

#### Tier 2: Context (Quan trọng)
- Current state/trends
- Statistics
- Expert perspectives
→ **Nguồn:** News articles, industry reports, research papers

#### Tier 3: Color (Làm phong phú)
- Stories/anecdotes
- Vietnam-specific examples
- Practical tips
→ **Nguồn:** Case studies, blogs, interviews, local media

### Bước 3: Search & Collect

**Search strategies:**

#### A. General Search
```
[Topic] là gì
[Topic] in Vietnam
[Topic] 2024/2025
[Topic] trends
[Topic] statistics
```

#### B. Deep Dive
```
[Topic] case study
[Topic] expert opinion
[Topic] best practices
[Topic] common mistakes
how to [Topic]
```

#### C. Local Context
```
[Topic] tại Việt Nam
[Topic] ở Việt Nam
[Topic] Vietnamese market
[Topic] VN examples
```

**Sử dụng tools:**
- `web_search` - Tìm thông tin mới nhất
- `web_fetch` - Đọc chi tiết articles
- `google_drive_search` - Tìm internal docs (nếu có)

**Note-taking template:**
```markdown
## [Subtopic]

**Source:** [URL/Name]
**Page/Section:** [Exact location - IMPORTANT if citation required]
**Key info:**
- Point 1
- Point 2

**Quotes:** 
"[Quote if relevant]" (Copy exact, do not paraphrase yet)

**Vietnam relevance:**
[Có áp dụng được tại VN không?]
```

⚠️ **CITATIONS CHECK:**
Nếu bước tiếp theo cần load `trich-dan-nguon.md`, bạn **PHẢI** ghi lại chính xác:

**1. Tài liệu thông thường:**
- Tên tác giả/Tổ chức
- Năm xuất bản
- Số trang (nếu là PDF/Sách) hoặc Link cụ thể

**2. Văn bản Luật (BẮT BUỘC chi tiết):**
- Điểm (Point)
- Khoản (Item/Clause)
- Điều (Article)
- Số hiệu văn bản (vd: 100/2019/NĐ-CP)

Nếu không có đủ thông tin này, không thể dùng làm "Exact Citation".

### Bước 4: Validate Information

**3 tiêu chí đánh giá nguồn:**

#### 1. Credibility (Độ tin cậy)
✅ Good sources:
- Official websites (.gov, .edu)
- Reputable news outlets
- Industry leaders/experts
- Peer-reviewed papers
- Well-known companies

❌ Suspicious:
- Anonymous blogs
- No author info
- Too promotional
- Outdated (>3 years for tech/trends)

#### 2. Relevance (Liên quan)
- Có match với topic không?
- Context phù hợp? (VN vs global)
- Audience phù hợp?

#### 3. Recency (Cập nhật)
- Ngày publish khi nào?
- Có còn relevant không?
- Đã có gì thay đổi?

**Cross-check rule:**
Với facts/statistics quan trọng → Tìm ít nhất 2 nguồn xác nhận

### Bước 5: Organize Information

**Structure thông tin thu thập được:**

```markdown
# Research Output: [Topic]

## I. Overview
- Định nghĩa: [...]
- Tại sao quan trọng: [...]
- Current state: [...]

## II. Key Facts & Statistics
- Fact 1: [...] (Source: X)
- Fact 2: [...] (Source: Y)
- Stats: [...] (Source: Z)

## III. Examples & Case Studies
### Global
- Example 1: [...]
- Example 2: [...]

### Vietnam
- Example 1: [...]
- Example 2: [...]

## IV. Expert Insights
- Quote 1: "[...]" - Expert A
- Quote 2: "[...]" - Expert B

## V. Trends & Future
- Trend 1: [...]
- Prediction: [...]

## VI. Practical Applications
- Use case 1: [...]
- Use case 2: [...]

## VII. Common Questions/Misconceptions
- Q: [...]
  A: [...]
- Misconception: [...] 
  Reality: [...]

## Sources
1. [Source 1] - [URL]
2. [Source 2] - [URL]
...
```

---

## Output Format

Sau khi nghiên cứu, package thông tin để ready cho output modules:

```markdown
## Content Brief: [Topic]

### Core Message
[1-2 câu tóm tắt chủ đề chính]

### Key Points to Cover
1. [Point 1 with supporting info]
2. [Point 2 with supporting info]
3. [Point 3 with supporting info]

### Supporting Materials
- Statistics: [Relevant numbers with sources]
- Examples: [2-3 strong examples, preferably VN]
- Quotes: [Expert quotes if available]

### Vietnam Context
[Specific info relevant to VN audience]

### Content Angle
[Suggested approach for writing - inspiring? practical? analytical?]

### Additional Resources
[Links to dive deeper if needed]
```

Sau đó chuyển sang:
- **storytelling.md** - Nếu viết blog/article cảm xúc
- **technical.md** - Nếu hướng dẫn/documentation
- **data-report.md** - Nếu analytical piece

---

## Ví Dụ Thực Tế

### Case Study: Nghiên Cứu "AI trong Marketing"

**Bước 1 - Information gaps:**

```
Topic: AI trong Marketing

Đã biết:
- AI đang hot, nhiều người nói
- Có tools như ChatGPT, Midjourney

Cần tìm:
- [ ] AI marketing cụ thể là gì? (không phải general AI)
- [ ] Statistics về adoption tại VN
- [ ] Ví dụ cụ thể companies dùng ở VN
- [ ] Tools phổ biến nhất
- [ ] ROI khi dùng AI marketing
- [ ] Challenges khi implement
```

**Bước 2 - Research strategy:**

Tier 1 (Foundation):
- Định nghĩa AI marketing
- Các categories (content creation, analytics, automation...)

Tier 2 (Context):
- Statistics về AI adoption in marketing
- Industry trends 2024-2025
- Expert predictions

Tier 3 (Color):
- Case study công ty Việt Nam
- Specific tools và pricing
- Tips implement cho SMEs

**Bước 3 - Search & collect:**

*[Giả sử đã search và collect info]*

```markdown
## AI Marketing Research Notes

### Definition
**Source:** HubSpot, McKinsey
- AI marketing = sử dụng AI để analyze data, predict behavior, 
  personalize content, automate tasks trong marketing
- Gồm: predictive analytics, chatbots, content generation, 
  ad optimization

### Statistics
**Source:** Gartner 2024
- 80% marketing teams sẽ dùng AI vào 2025
- 45% marketers tại Đông Nam Á đã dùng AI tools

**Source:** Vietnam E-commerce Report 2024
- 35% doanh nghiệp VN dùng AI trong marketing (tăng từ 12% năm 2022)
- ROI trung bình: 3.2x investment trong 12 tháng đầu

### Vietnam Examples
**Source:** VnExpress, Case study Tiki
- Tiki: Dùng AI recommendation engine → tăng 40% cross-sell
- Shopee: Chatbot xử lý 70% customer inquiries
- The Coffee House: AI analyze customer data → personalized offers

### Tools Popular in VN
1. ChatGPT/Claude - Content creation
2. Canva AI - Design automation  
3. Meta Ads AI - Ad optimization
4. Google Analytics AI - Insights
5. Local: Haravan AI (e-commerce)

### Expert Quote
**Source:** Interview with CMO of VNG
"AI không thay thế marketer, nhưng marketer dùng AI sẽ thay thế 
marketer không dùng AI" - Nguyễn Văn A, CMO VNG

### Challenges
- Initial investment cao
- Lack of AI skills trong team
- Data quality issues
- Privacy concerns
```

**Bước 4 - Validate:**

✅ Cross-checked:
- Statistics từ 2 nguồn (Gartner + VN E-commerce Report)
- Tiki case từ official press release
- Expert quote from credible interview

⚠️ Note:
- ROI 3.2x cần disclaimer (varies by use case)
- Tools list biased toward popular ones, không comprehensive

**Bước 5 - Organize output:**

```markdown
## Content Brief: AI trong Marketing

### Core Message
AI đang transform marketing tại Việt Nam, từ content creation đến 
customer insights, với ROI ấn tượng nhưng cần approach đúng cách.

### Key Points to Cover

1. **AI marketing là gì và tại sao quan trọng**
   - Definition: Sử dụng AI để analyze, predict, personalize, automate
   - Tại sao bây giờ: Data explosion + AI tools accessible + competitive pressure
   - Context VN: 35% adoption, tăng 3x trong 2 năm

2. **Use cases thực tế tại Việt Nam**
   - Tiki: Recommendation engine (+40% cross-sell)
   - Shopee: Chatbot (70% inquiries)
   - The Coffee House: Personalization
   - ROI trung bình: 3.2x trong 12 tháng

3. **Tools và cách bắt đầu**
   - Entry-level: ChatGPT, Canva AI (low investment)
   - Mid-level: Meta Ads AI, GA4 insights
   - Advanced: Haravan AI, custom solutions
   - Start small, scale up

4. **Challenges và cách vượt qua**
   - Investment: Start với free/low-cost tools
   - Skills gap: Training + hire experts
   - Data quality: Clean data first
   - Privacy: Follow GDPR-style guidelines

### Supporting Materials

Statistics:
- 35% doanh nghiệp VN dùng AI marketing (VN E-commerce Report 2024)
- 3.2x ROI trung bình trong 12 tháng
- 70% customer inquiries tự động hóa (Shopee case)

Examples:
- Tiki recommendation engine
- The Coffee House personalization
- Shopee chatbot

Quotes:
"AI không thay thế marketer, nhưng marketer dùng AI sẽ thay thế 
marketer không dùng AI" - CMO VNG

### Vietnam Context
- Adoption rate 35% (above SEA average 30%)
- E-commerce companies leading
- SMEs slow to adopt (cost + skill barriers)
- Increasing interest in local solutions (Haravan)

### Content Angle
**Inspiring + Practical**
- Hook: "Doanh nghiệp Việt đang tận dụng AI như thế nào?"
- Story: Tiki case study (relatable, successful)
- Practical: Step-by-step cho SMEs
- Call-to-action: Start small today

### Additional Resources
- Gartner AI Marketing Report 2024
- VN E-commerce Report 2024
- Tiki Tech Blog
- List of AI tools với pricing
```

→ Ready để chuyển sang **storytelling.md** hoặc **technical.md**

---

## Research Best Practices

### 1. Start Broad → Go Narrow
```
AI → AI in marketing → AI marketing in Vietnam → 
AI marketing tools for Vietnamese SMEs
```

### 2. Prioritize Recent + Local
- Recent: <1 year cho tech/trends
- Local: Vietnam examples > global examples

### 3. Bookmark as You Go
Lưu sources ngay, đừng quên sau:
```
[Title] - [URL] - [Date accessed] - [Key takeaway]
```

### 4. Vietnam Lens
Mỗi global insight, tự hỏi:
- Có áp dụng tại VN không?
- Cần adapt gì?
- Có example VN tương tự?

### 5. Quality > Quantity
3-5 sources chất lượng > 20 sources lướt qua

---

## Common Pitfalls - Tránh

### ❌ Research mãi không viết
**Problem:** Over-research, perfectionism  
**Fix:** Set time limit (30-60 phút), then start writing

### ❌ Copy-paste thông tin
**Problem:** Plagiarism risk  
**Fix:** Paraphrase, cite sources, add own analysis

### ❌ Quá nhiều global info, ít VN context
**Problem:** Không relevant cho audience Việt  
**Fix:** 50-50 rule - 50% global best practices, 50% VN applications

### ❌ Outdated information
**Problem:** Tech/trends change fast  
**Fix:** Check dates, prioritize recent sources

### ❌ Không verify facts
**Problem:** Misinformation  
**Fix:** Cross-check critical facts với 2+ sources

---

## Integration với Tools

### Khi có web_search available:

```python
# Pattern 1: Quick overview
web_search("[topic] là gì")
web_search("[topic] in Vietnam")

# Pattern 2: Statistics
web_search("[topic] statistics 2024")
web_search("[topic] VN market size")

# Pattern 3: Examples
web_search("[topic] case study Vietnam")
web_search("[topic] success stories")

# Pattern 4: Trends
web_search("[topic] trends 2025")
web_search("[topic] future predictions")
```

### Khi có google_drive_search:

```python
# Tìm internal docs
google_drive_search("[topic] presentation")
google_drive_search("[topic] report")
google_drive_search("[topic] analysis")
```

Combine internal knowledge + external research = comprehensive content

---

## Checklist

Trước khi kết thúc research:

- [ ] Đã có định nghĩa rõ ràng cho topic?
- [ ] Đã có 3-5 facts/statistics với sources?
- [ ] Đã có ít nhất 2 examples (1 VN preferred)?
- [ ] Đã validate critical facts với multiple sources?
- [ ] Đã organize thành content brief rõ ràng?
- [ ] Đã note Vietnam-specific context?
- [ ] Đã suggest content angle cho writer?
- [ ] Đã bookmark all sources?

---

## Tips Nâng Cao

### 1. Expert Sourcing
Khi cần expert input:
- LinkedIn: Tìm thought leaders VN
- Twitter/X: Industry conversations
- Podcasts/Webinars: Recent discussions
- Local conferences: VN-specific insights

### 2. Competitor Research
Xem người khác viết gì về topic:
- Top 5 articles trên Google
- Competitor blogs
- Social media discussions
→ Identify gaps, differentiate angle

### 3. Question Mining
Tìm questions people ask:
- Google "People also ask"
- Reddit/Quora discussions
- Facebook groups (VN)
→ Address these trong content

### 4. Visual Research
Không chỉ text:
- Infographics
- Charts/data visualizations
- Screenshots of tools
- Photos of examples
→ Enrich content với visuals

---

**Token budget:** ~2,000 tokens  
**Next step:** Chuyển content brief → output module  
**Note:** Balance research depth với writing time - đừng over-research
