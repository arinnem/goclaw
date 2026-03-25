# Phân Tích Data → Insights

**Module:** Process  
**Mục đích:** Chuyển đổi dữ liệu thô thành insights có ý nghĩa để viết content

## Khi Nào Dùng Module Này

**Load module này khi:**
- User cung cấp dữ liệu thô (số liệu, bảng, biểu đồ)
- Data có nhưng chưa rõ ý nghĩa/insight
- Cần tìm patterns, trends từ data
- Phải trả lời "So what?" từ một tập số liệu

**Không cần dùng khi:**
- User đã cung cấp insights sẵn
- Chỉ có ý tưởng/keywords, không có data
- Data đơn giản, insight rõ ràng

---

## Quy Trình Phân Tích

### Bước 1: Hiểu Data

**Trả lời 4 câu hỏi:**

1. **Data này đo lường gì?**
   - Metric gì? (doanh thu, lượt truy cập, engagement...)
   - Đơn vị? (VNĐ, %, người, lần...)
   
2. **Phạm vi thời gian?**
   - Snapshot (một thời điểm) hay time series?
   - So sánh với kỳ nào? (MoM, YoY, QoQ?)

3. **Context/benchmark?**
   - So với mục tiêu?
   - So với đối thủ?
   - So với industry average?

4. **Độ tin cậy?**
   - Sample size đủ lớn?
   - Data source đáng tin?
   - Có outliers cần điều chỉnh?

### Bước 2: Tìm Patterns

**5 loại patterns chính:**

#### 1. Trends (Xu hướng)
```
Tăng/giảm theo thời gian?
Tốc độ thay đổi?
Có bền vững không?
```

**Ví dụ:**
```
Data: Doanh thu Q1: 1B, Q2: 1.2B, Q3: 1.5B, Q4: 1.9B
Pattern: Tăng trưởng gia tốc (20% → 25% → 27%)
```

#### 2. Comparisons (So sánh)
```
Cao/thấp hơn benchmark?
Gap bao nhiêu?
Có significant không?
```

**Ví dụ:**
```
Data: Traffic website 10K/tháng, industry avg 15K
Pattern: Thấp hơn 33% so với trung bình ngành
```

#### 3. Distributions (Phân bố)
```
Tập trung ở đâu?
Có phân tầng rõ ràng?
80/20 rule áp dụng?
```

**Ví dụ:**
```
Data: 80% doanh thu từ 20% khách hàng
Pattern: Concentration risk cao
```

#### 4. Correlations (Tương quan)
```
Hai metrics có liên hệ?
Tăng cái này → cái kia thay đổi?
Nhân quả hay chỉ correlation?
```

**Ví dụ:**
```
Data: Tăng 10% budget ads → tăng 5% conversions
Pattern: Hiệu quả quảng cáo giảm dần (diminishing returns)
```

#### 5. Anomalies (Bất thường)
```
Có điểm nào bất thường?
Tại sao lại khác?
Temporary hay structural?
```

**Ví dụ:**
```
Data: Sales tháng 11 tăng đột biến 300%
Pattern: Spike do Black Friday (seasonal)
```

### Bước 3: Extract Insights

**Insight = Pattern + Context + Implication**

Từ mỗi pattern, trả lời:

1. **"Điều này có nghĩa gì?"** (Meaning)
2. **"Tại sao lại như vậy?"** (Why)
3. **"Quan trọng như thế nào?"** (Importance)
4. **"Nên làm gì?"** (Action)

**Template:**
```
[Pattern] cho thấy [meaning], có thể do [why]. 
Điều này [important/not important] vì [reason].
Cần [action] để [outcome].
```

**Ví dụ:**
```
Pattern: Doanh thu tăng 40% YoY nhưng profit margin giảm từ 25% → 18%

Insight:
"Doanh thu tăng trưởng mạnh (40% YoY) nhưng lợi nhuận suy giảm (margin -7%), 
cho thấy tăng trưởng không bền vững. Có thể do giá cạnh tranh quá thấp hoặc 
chi phí vận hành tăng. Điều này đáng báo động vì làm giảm khả năng sinh lời 
dài hạn. Cần review lại pricing strategy và optimize cost structure."
```

### Bước 4: Prioritize Insights

**Xếp hạng insights theo:**

1. **Impact** - Ảnh hưởng lớn đến business/audience
2. **Actionability** - Có thể hành động dựa trên insight này
3. **Novelty** - Điều gì mới/bất ngờ/counterintuitive

**Framework: ICE Score**
- Impact (1-10)
- Clarity (1-10) - Rõ ràng, dễ hiểu
- Evidence (1-10) - Data mạnh

Chọn top 3-5 insights để viết content.

---

## Output Format

Sau khi phân tích, structure insights theo format này để dễ chuyển sang output modules:

```markdown
## Key Findings

1. **[Insight Title]**
   - Pattern: [Mô tả pattern]
   - Data: [Số liệu cụ thể]
   - Implication: [Ý nghĩa]
   - Action: [Đề xuất nếu có]

2. **[Insight Title]**
   ...

## Supporting Data

- [Bảng/biểu đồ/số liệu chi tiết]
- [Context/benchmark]

## Recommendations (optional)

- [Next steps dựa trên insights]
```

Sau đó chuyển sang output module phù hợp:
- **storytelling.md** - Nếu cần truyền cảm hứng từ data
- **data-report.md** - Nếu formal business report
- **executive.md** - Nếu brief cho decision-makers

---

## Ví Dụ Thực Tế

### Case Study: Phân Tích Traffic Website

**Input data:**
```
- Tháng 1: 50K visitors
- Tháng 2: 52K visitors (+4%)
- Tháng 3: 48K visitors (-8%)
- Tháng 4: 65K visitors (+35%)
- Bounce rate: T1-T3: 45%, T4: 32%
- Avg time on site: T1-T3: 2 phút, T4: 4.5 phút
```

**Bước 1 - Hiểu data:**
- Đo lường: Traffic & engagement metrics
- Phạm vi: 4 tháng, MoM comparison
- Context: Không có benchmark (cần lưu ý)
- Độ tin cậy: OK (consistent tracking)

**Bước 2 - Patterns:**
1. **Trend:** Volatile T1-T3, spike đột biến T4
2. **Anomaly:** T4 khác biệt rõ rệt (traffic +35%, engagement gấp đôi)
3. **Correlation:** Traffic tăng + engagement tăng (cùng chiều)

**Bước 3 - Insights:**

**Insight 1:**
```
Traffic tăng đột biến 35% trong tháng 4, kèm theo bounce rate giảm mạnh 
(45% → 32%) và thời gian trên site tăng gấp đôi (2 → 4.5 phút). 

Điều này cho thấy không chỉ có nhiều người truy cập hơn, mà chất lượng 
traffic cũng tốt hơn đáng kể - visitors thực sự quan tâm đến nội dung.

Có thể do: (1) Thay đổi content strategy, (2) SEO improvements, hoặc 
(3) Viral post trong tháng 4.

Cần investigate xem đã làm gì khác trong T4 để replicate success.
```

**Bước 4 - Prioritize:**
- Impact: 9/10 (major improvement)
- Clarity: 8/10 (rõ ràng)
- Evidence: 9/10 (data mạnh)
→ **Priority 1**

**Output format:**
```markdown
## Key Finding

**Traffic tăng trưởng breakthrough tháng 4 với chất lượng cao**

- Pattern: Spike 35% traffic kèm engagement tăng gấp đôi
- Data: 
  - Visitors: 48K → 65K (+35%)
  - Bounce rate: 45% → 32% (-13 điểm phần trăm)
  - Time on site: 2 phút → 4.5 phút (+125%)
- Implication: Không chỉ có nhiều traffic, mà chất lượng đột phá
- Action: Phân tích content/campaigns tháng 4 để replicate

## Hypothesis

1. Thay đổi content strategy (cần verify)
2. SEO improvements (cần check rankings)
3. Viral post (cần check top posts T4)
```

→ Chuyển sang **storytelling.md** để viết case study hay **data-report.md** cho báo cáo

---

## Anti-Patterns - Tránh

### ❌ Không chỉ liệt kê số liệu
```
BAD:
- Q1: 100M doanh thu
- Q2: 120M doanh thu
- Q3: 130M doanh thu
```

### ✅ Extract insight
```
GOOD:
Doanh thu tăng trưởng ổn định (20-25% QoQ) nhưng momentum 
đang chậm lại (Q2: +20% → Q3: +8%). Cần action để maintain 
growth trajectory.
```

### ❌ Không insights quá obvious
```
BAD: "Doanh thu tăng là tốt"
```

### ✅ Dig deeper
```
GOOD: "Doanh thu tăng nhưng CAC (chi phí thu hút khách) cũng 
tăng nhanh hơn, cho thấy efficiency đang giảm"
```

### ❌ Không data dump
```
BAD: [Paste 100 rows Excel]
```

### ✅ Synthesize
```
GOOD: "Từ 100 data points, 3 insights nổi bật là..."
```

---

## Checklist

Trước khi chuyển sang output module:

- [ ] Đã hiểu rõ data đo lường gì?
- [ ] Đã tìm ít nhất 2-3 patterns?
- [ ] Mỗi pattern đều có insight (not just description)?
- [ ] Insights có answer "So what?"?
- [ ] Đã prioritize insights theo impact?
- [ ] Output format rõ ràng để viết content?
- [ ] Đã note cần thêm data/context gì không?

---

## Tips Nâng Cao

### 1. Segment Analysis
Khi có nhiều data, chia nhỏ:
- By customer type (B2B vs B2C)
- By channel (organic vs paid)
- By geography (miền Bắc vs Nam)

### 2. Time-Based Cuts
- Weekday vs weekend
- Business hours vs after hours
- Seasonal patterns

### 3. Cohort Analysis
- New users vs returning
- High-value vs low-value customers
- Early adopters vs late majority

### 4. Root Cause Analysis
Khi thấy pattern, đào sâu:
```
Traffic giảm 
  → Từ channel nào?
    → Organic search giảm
      → Rankings thay đổi?
        → Google algorithm update
```

---

**Token budget:** ~2,000 tokens  
**Next step:** Chuyển insights → output module  
**Note:** Module này focus vào analysis for content creation, không phải statistical modeling
