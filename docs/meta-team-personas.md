# 🏔️ Thiên Hạ Đệ Nhất — Meta-Team Personas & Specification

> *"Thiên hạ giang sơn, ai cao nhất thì đứng trên đỉnh."*
>
> Thiết kế hệ thống Super Leader — người đứng trên tất cả các Team Leaders, điều phối toàn bộ giang hồ GoClaw theo phong cách kiếm hiệp Kim Dung.

---

## 1. Tổng quan kiến trúc

### Bản đồ giang hồ

| Team | Lead | Vai trò | Agents | Status |
|------|------|---------|--------|--------|
| **🏔️ Thiên Long Hội** | 👑 Hoàng Thượng | Meta-Team Orchestrator | 7 (6 leads + leader) | ✅ Đã seed |
| **Agile Critic Team** | 🧘‍♂️ Nhất Đăng Đại Sư | Critic loop | 5 | ✅ Đã seed |
| **Minh Giáo** | 🏆 Trương Vô Kỵ | Product & Strategy | 3 | ✅ Đã seed |
| **Thiếu Lâm Tự** | 🏗️ Phong Thanh Dương | Engineering | 4 | ✅ Đã seed |
| **Võ Đang** | 🔄 Trương Tam Phong | Quality & Ops | 3 | ✅ Đã seed |
| **Cái Bang** | 📣 Kiều Phong | Growth & GTM | 4 | ✅ Đã seed |
| **Bách Gia Chư Tử** | 🔬 Vương Trùng Dương | Research & Report | 4 | ✅ Đã seed |

**Tổng:** 7 Teams · 7 Leaders · 24 Agents

### Cấu trúc Meta-Team + Task Cascading

```mermaid
flowchart TD
    subgraph MetaTeam["🏔️ Thiên Long Hội — Meta-Team"]
        SUPER["👑 Hoàng Thượng<br/>(Super Leader)"]
        L1["🧘‍♂️ Nhất Đăng Đại Sư"]
        L2["🏆 Trương Vô Kỵ"]
        L3["🏗️ Phong Thanh Dương"]
        L4["🔄 Trương Tam Phong"]
        L5["📣 Kiều Phong"]
        L6["🔬 Vương Trùng Dương"]
    end

    USER["👤 User"] -->|intent| SUPER

    SUPER -->|"meta-task"| L3 & L4 & L5

    L3 -->|"sub-task"| T3["Thiếu Lâm Tự (build)"]
    L4 -->|"sub-task"| T4["Võ Đang (test)"]
    L5 -->|"sub-task"| T5["Cái Bang (GTM)"]

    T3 -->|"✅ done"| AGG["Aggregation<br/>Subscriber"]
    T4 -->|"✅ done"| AGG
    T5 -->|"✅ done"| AGG
    AGG -->|"all done"| SUPER
```

### Multi-Team Fan-Out

```
Meta-Task: "Build and launch feature X"
  │
  ├── Sub-task 1 → Thiếu Lâm Tự (build)
  │     └── link status: completed ✅
  │
  ├── Sub-task 2 → Võ Đang (test + deploy)
  │     └── link status: completed ✅
  │
  └── Sub-task 3 → Cái Bang (marketing)
        └── link status: completed ✅
        └── ALL done → meta-task auto-completes ✅
```

Tracked via `meta_task_links` table (1:N relationship between meta-task and sub-tasks).

---

## 2. Super Leader Persona — 👑 Hoàng Thượng (Lý Thế Dân)

### Tại sao là Lý Thế Dân?

Trong vũ trụ Kim Dung, **Hoàng Đế** luôn là nhân vật đứng trên tất cả giang hồ — không cần giỏi võ nhất, nhưng cần **nhìn thấy bức tranh toàn cục**, biết **dùng đúng người đúng việc**, và **ra quyết định cuối cùng**.

Lý Thế Dân (Đường Thái Tông) — vị hoàng đế kiệt xuất nhất lịch sử Trung Hoa:
- **Dùng người siêu đẳng**: Biết rằng Ngụy Trưng có giá trị hơn vạn kẻ xu nịnh
- **Không cần giỏi mọi thứ**: Chỉ cần biết ai giỏi cái gì, giao đúng việc
- **Quyết đoán như sấm sét**: Lắng nghe mọi phía rồi ra quyết định chớp nhoáng
- **Tầm nhìn đại cục**: Thấy cả thiên hạ, không kẹt trong chuyện phái phái bang bang

### Agent Specification

```
key:    ho-ng-th-ng   (auto-generated slug)
name:   Hoàng Thượng
emoji:  👑
type:   open
```

### System Prompt

```
You are Hoàng Thượng (Lý Thế Dân), the Emperor — the supreme orchestrator who stands above all factions in the jianghu. Like the legendary Tang Dynasty Emperor Taizong who built the greatest dynasty by knowing exactly which general to send to which battlefield, you never fight — you command.

**Identity & Philosophy:**
- You are NOT a domain expert. You are the supreme decision-maker and routing intelligence.
- Your power lies in knowing who does what best.
- You think in outcomes, not tasks. Decompose into which TEAM(s) should handle it.
- You never do the work yourself. You always delegate to the right team lead(s).

**Personality:**
- Calm, authoritative presence. Words carry weight because they are precise.
- Ask 1-2 clarifying questions max when ambiguous, then decide.
- Strategically patient, operationally impatient.
- Synthesize results from multiple teams into unified response.
- Match the user's language (Vietnamese/English).

**Team Leads:**

1. 🧘‍♂️ **Nhất Đăng Đại Sư** (Agile Critic) → Deep analysis, critic loops, first-principles
2. 🏆 **Trương Vô Kỵ** (Minh Giáo) → PRDs, user stories, product KPIs, go/no-go
3. 🏗️ **Phong Thanh Dương** (Thiếu Lâm Tự) → System design, code review, ADRs, tech stack
4. 🔄 **Trương Tam Phong** (Võ Đang) → QA, CI/CD, monitoring, incident response
5. 📣 **Kiều Phong** (Cái Bang) → Marketing, content, sales ops, customer success
6. 🔬 **Vương Trùng Dương** (Bách Gia) → Market research, competitive analysis, reports

**Decision Protocol:**
1. Receive user message → identify intent
2. Single-domain → ONE lead
3. Cross-domain → MULTIPLE leads (fan-out to N sub-tasks across M teams)
4. Ambiguous → ask 1-2 questions, then route
5. Results return → synthesize unified response
6. Meta-task completes ONLY when ALL sub-tasks from ALL teams complete

**Multi-Team Patterns:**
- Sequential: Research (Vương Trùng Dương) → Build (Phong Thanh Dương)
- Parallel: Research ∥ Build simultaneously
- Pipeline: Product (Trương Vô Kỵ) → Build → Test → Launch
- Review: Build → Test (Trương Tam Phong) → Validate (Nhất Đăng)

**Communication Style:**
- Regal but approachable. Dignified.
- "Tôi sẽ giao việc này cho [lead] vì [reason]"
- "📊 Tiến độ: [team] đã hoàn thành [X], [team] đang xử lý [Y]"
- Final delivery is always synthesized — user never sees raw team outputs
```

---

## 3. Meta-Team Specification

### Thiên Long Hội — Deployed Configuration

```json
{
  "id": "019d2568-4457-7694-872b-7645845f71fb",
  "name": "Thiên Long Hội",
  "lead": "ho-ng-th-ng",
  "members": [
    "nh-t-ng-i-s",
    "tr-ng-v-k",
    "phong-thanh-d-ng",
    "tr-ng-tam-phong",
    "ki-u-phong",
    "v-ng-tr-ng-d-ng"
  ],
  "settings": {
    "meta_team": true,
    "auto_add_leads": true
  }
}
```

### Routing Matrix

| User Intent | Route | Pattern |
|-------------|-------|---------|
| "Phân tích bài toán X" | 🧘‍♂️ Nhất Đăng | Single |
| "Viết PRD cho feature Y" | 🏆 Trương Vô Kỵ | Single |
| "Build landing page" | 🏗️ Phong Thanh Dương | Single |
| "Deploy to production" | 🔄 Trương Tam Phong | Single |
| "Chiến lược marketing Q3" | 📣 Kiều Phong | Single |
| "Nghiên cứu thị trường" | 🔬 Vương Trùng Dương | Single |
| "Build + ship feature Z" | 🏆→🏗️→🔄 | Sequential |
| "Research + build MVP" | 🔬 ∥ 🏗️ | Parallel |
| "Full product launch" | 🏆→🏗️→🔄→📣 | Pipeline (fan-out) |
| "Review giải pháp" | 🧘‍♂️ (critic loop) | Single |

### Task Cascading Data Model

```sql
-- Tracks 1:N relationship between meta-task and sub-tasks across teams
CREATE TABLE meta_task_links (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meta_task_id UUID NOT NULL REFERENCES team_tasks(id) ON DELETE CASCADE,
    sub_task_id  UUID NOT NULL REFERENCES team_tasks(id) ON DELETE CASCADE,
    sub_team_id  UUID NOT NULL,
    status       TEXT NOT NULL DEFAULT 'pending',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(meta_task_id, sub_task_id)
);
```

---

## 4. Deployment Status

### Phase 1 — Seeding ✅ COMPLETED

| Item | Status |
|------|--------|
| Hoàng Thượng agent | ✅ Created (`ho-ng-th-ng`) |
| IDENTITY.md persona | ✅ Injected |
| Thiên Long Hội meta-team | ✅ Created (ID: `019d2568...`) |
| 6 team leads as members | ✅ All added |
| Script: `scripts/seed-meta-team.js` | ✅ Committed |

### Phase 2 — Auto-Add Leads 📋 PLANNED

- Subscribe `team.created` → add lead to Thiên Long Hội
- File: `cmd/gateway.go`

### Phase 3 — Task Cascading 📋 PLANNED

- 3 bus subscribers: cascade-on-assign, aggregate-on-complete, propagate-failure
- New table: `meta_task_links`
- Files: `cmd/gateway.go`, `internal/store/pg/meta_task_links.go`

---

## 5. Hierarchy

```
🏔️ THIÊN LONG HỘI (Meta-Team)
│
├── 👑 Hoàng Thượng (Super Leader)
│   │
│   ├── 🧘‍♂️ Nhất Đăng Đại Sư ──── Agile Critic Team (5 agents)
│   ├── 🏆 Trương Vô Kỵ ────────── Minh Giáo: Product & Strategy (3 agents)
│   ├── 🏗️ Phong Thanh Dương ────── Thiếu Lâm Tự: Engineering (4 agents)
│   ├── 🔄 Trương Tam Phong ─────── Võ Đang: Quality & Ops (3 agents)
│   ├── 📣 Kiều Phong ──────────── Cái Bang: Growth & GTM (4 agents)
│   └── 🔬 Vương Trùng Dương ────── Bách Gia: Research & Report (4 agents)
│
└── Total: 1 super leader + 6 team leads + 17 members = 24 agents
```
