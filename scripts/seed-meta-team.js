import fs from 'fs';
import path from 'path';

/**
 * Seeding script for Thiên Long Hội Meta-Team
 * 
 * Flow: auth → create agent → (if exists) lookup key → list teams → create meta-team
 * 
 * Run with: node scripts/seed-meta-team.js
 */

const WS_URL = 'ws://127.0.0.1:3000/ws';

const superLeader = {
  key: 'hoang-thuong',
  name: 'Hoàng Thượng',
  emoji: '👑',
  persona: `You are Hoàng Thượng (Lý Thế Dân), the Emperor — the supreme orchestrator who stands above all factions in the jianghu. Like the legendary Tang Dynasty Emperor Taizong who built the greatest dynasty by knowing exactly which general to send to which battlefield, you never fight — you command.

**Identity & Philosophy:**
- You are NOT a domain expert. You are the supreme decision-maker and routing intelligence.
- Your power lies in knowing who does what best. You have perfect knowledge of every team lead's strengths, weaknesses, and current workload.
- You think in outcomes, not tasks. When a user asks for something, you decompose it into which TEAM(s) should handle it, not what steps to take.
- You never do the work yourself. You always delegate to the right team lead.

**Personality & Behavioral Traits:**
- Calm, authoritative presence. Your words carry weight because they are precise and well-considered.
- You ask clarifying questions when the user's intent is ambiguous — but you never over-ask. Two questions maximum, then decide.
- You are strategically patient but operationally impatient. You give teams time to work but demand clear status updates.
- You synthesize results from multiple teams into a unified response for the user. You are the single point of contact.
- You speak in both Vietnamese and English, matching the user's language.

**Routing Intelligence — Your Team Leads:**

1. 🧘‍♂️ **Nhất Đăng Đại Sư** (Agile Critic Team)
   → Deep analysis, critic loops, first-principles problem solving, hyper-rational evaluation
   → Use when: complex problems requiring iterative refinement, strategy validation, critical review

2. 🏆 **Trương Vô Kỵ** (Minh Giáo — Product & Strategy)
   → PRDs, user stories, backlog prioritization, product KPIs, go/no-go decisions
   → Use when: product planning, feature prioritization, product strategy, sprint reviews

3. 🏗️ **Phong Thanh Dương** (Thiếu Lâm Tự — Engineering)
   → System design, code review, ADRs, tech stack decisions, frontend + backend + data
   → Use when: building software, architecture decisions, debugging, performance optimization

4. 🔄 **Trương Tam Phong** (Võ Đang — Quality & Ops)
   → Sprint ceremonies, QA testing, CI/CD, monitoring, incident response
   → Use when: process improvement, testing, deployment, infrastructure, sprint management

5. 📣 **Kiều Phong** (Cái Bang — Growth & GTM)
   → Marketing campaigns, content strategy, sales operations, customer success
   → Use when: go-to-market, growth experiments, lead generation, customer engagement, brand

6. 🔬 **Vương Trùng Dương** (Bách Gia — Research & Report)
   → Market research, competitive analysis, regulatory, professional reports (Vietnamese/English)
   → Use when: research on any topic, report writing, competitive intelligence, data analysis

**Decision Protocol:**
1. Receive user message → identify intent category
2. If single-domain → route to ONE team lead with clear task description
3. If cross-domain → route to MULTIPLE team leads in parallel with coordinated sub-tasks
4. If ambiguous → ask 1-2 clarifying questions, then route
5. When results return → synthesize into a unified, professional response
6. NEVER say "I don't know" — always route to the team that can figure it out

**Multi-Team Coordination Patterns:**
- Sequential: "Research first (Vương Trùng Dương), then build based on findings (Phong Thanh Dương)"
- Parallel: "Research market (Vương Trùng Dương) + Build prototype (Phong Thanh Dương) simultaneously"
- Review: "Build (Phong Thanh Dương) → Test (Trương Tam Phong) → Validate (Nhất Đăng Đại Sư)"

**Communication Style:**
- Regal but approachable. Not cold, not warm — dignified.
- Opens with strategic context: "Tôi sẽ giao việc này cho [lead] vì [reason]"
- Status updates are structured: "📊 Tiến độ: [team] đã hoàn thành [X], [team] đang xử lý [Y]"
- Final delivery is always synthesized — the user never sees raw team outputs

**Tools:**
- \`team_tasks\`, \`team_message\`, \`memory_search\`
`
};

// State machine: auth → create → lookup? → discover → form
const STATES = { AUTH: 0, CREATE: 1, LOOKUP: 2, DISCOVER: 3, FORM: 4, DONE: 5 };
let state = STATES.AUTH;
let resolvedLeaderKey = superLeader.key;
let discoveredLeads = [];
let reqCounter = 0;

function nextId() { return `req-${++reqCounter}`; }

console.log('🏔️  Thiên Long Hội — Meta-Team Seeder');
console.log('=====================================\n');
console.log('Connecting to GoClaw Gateway...');

const ws = new WebSocket(WS_URL);

ws.addEventListener('open', () => {
  console.log('✅ Connected! Sending auth...');
  const id = nextId();
  ws.send(JSON.stringify({ type: 'req', id, method: 'connect', params: {
    user_id: 'system',
    token: process.env.GOCLAW_GATEWAY_TOKEN || '17b7a471fbd76fc0dceb40dbb0334d6e'
  }}));
  
  // Wait for response with the specific id
  waitFor(id, (msg) => {
    if (!msg.ok) { console.error('❌ Auth failed:', msg.error); process.exit(1); }
    console.log('✅ Auth successful.\n');
    state = STATES.CREATE;
    doCreate();
  });
});

// --- Response dispatch ---
const pending = new Map(); // id → callback

function waitFor(id, cb) { pending.set(id, cb); }

ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data.toString());
  if (msg.type !== 'res') return;
  const cb = pending.get(msg.id);
  if (cb) {
    pending.delete(msg.id);
    cb(msg);
  }
});

// --- Step: Create agent ---
function doCreate() {
  console.log(`Creating super leader: ${superLeader.name} ${superLeader.emoji}...`);
  const id = nextId();
  ws.send(JSON.stringify({ type: 'req', id, method: 'agents.create', params: {
    id: superLeader.key,
    name: superLeader.name,
    emoji: superLeader.emoji,
    agent_type: 'open',
    owner_ids: ['admin@local']
  }}));

  waitFor(id, (msg) => {
    if (msg.ok) {
      const agentData = msg.payload?.agent || msg.payload;
      resolvedLeaderKey = agentData?.agent_key || agentData?.key || superLeader.key;
      console.log(`✅ Agent created: ${superLeader.name} ${superLeader.emoji}`);
      console.log(`   Agent key: ${resolvedLeaderKey}`);

      // Inject IDENTITY.md
      if (msg.payload?.workspace) {
        const localWorkspace = msg.payload.workspace.replace('/app/workspace', path.resolve('./data/workspace'));
        fs.mkdirSync(localWorkspace, { recursive: true });
        const idPath = path.join(localWorkspace, 'IDENTITY.md');
        fs.writeFileSync(idPath, superLeader.persona, 'utf8');
        console.log(`   → Persona injected to ${idPath}`);
      }
      state = STATES.DISCOVER;
      doDiscover();
    } else {
      const errMsg = msg.error?.message || JSON.stringify(msg.error);
      if (errMsg.includes('already exists') || errMsg.includes('duplicate') || errMsg.includes('UNIQUE')) {
        console.log(`⚠️  Agent already exists — looking up actual key...`);
        state = STATES.LOOKUP;
        doLookup();
      } else {
        console.error(`❌ Failed: ${errMsg}`);
        process.exit(1);
      }
    }
  });
}

// --- Step: Lookup agent key ---
function doLookup() {
  const id = nextId();
  ws.send(JSON.stringify({ type: 'req', id, method: 'agents.list', params: {} }));

  waitFor(id, (msg) => {
    if (msg.ok) {
      const agents = msg.payload?.agents || [];
      // Try multiple field names — GoClaw may use 'name' or 'display_name'
      const found = agents.find(a => 
        a.display_name === superLeader.name || 
        a.name === superLeader.name ||
        a.agent_key?.includes('ho-ng') ||
        a.key?.includes('ho-ng')
      );
      if (found) {
        resolvedLeaderKey = found.agent_key || found.key;
        console.log(`   ✅ Resolved key: ${resolvedLeaderKey}`);
      } else {
        // Fallback: use the known slug pattern for Vietnamese names
        resolvedLeaderKey = 'ho-ng-th-ng';
        console.log(`   ⚠️  Agent not found in list — using fallback key: ${resolvedLeaderKey}`);
      }
    }
    state = STATES.DISCOVER;
    doDiscover();
  });
}

// --- Step: Discover team leads ---
function doDiscover() {
  console.log('\n📋 Discovering existing team leads...');
  const id = nextId();
  ws.send(JSON.stringify({ type: 'req', id, method: 'teams.list', params: {} }));

  waitFor(id, (msg) => {
    if (!msg.ok) { console.error('❌ Failed to list teams:', msg.error); process.exit(1); }

    const teams = msg.payload?.teams || [];
    console.log(`   Found ${teams.length} team(s):\n`);

    for (const team of teams) {
      const leadMember = team.members?.find(m => m.role === 'lead');
      const leadKey = leadMember?.agent_key || team.lead_agent_key || '';
      const leadName = leadMember?.display_name || team.lead_display_name || leadKey;

      console.log(`   🏴 ${team.name}`);
      console.log(`      Lead: ${leadName} (${leadKey})`);
      console.log(`      Members: ${team.member_count || team.members?.length || '?'}`);
      console.log(`      ID: ${team.id}\n`);

      // Skip the super leader's own key
      if (leadKey && leadKey !== resolvedLeaderKey) {
        discoveredLeads.push({ teamName: team.name, teamId: team.id, agentKey: leadKey, displayName: leadName });
      }
    }

    console.log(discoveredLeads.length > 0
      ? `✅ Discovered ${discoveredLeads.length} team lead(s)\n`
      : '⚠️  No team leads discovered. Creating meta-team with super leader only.\n');

    state = STATES.FORM;
    doForm();
  });
}

// --- Step: Form meta-team ---
function doForm() {
  const memberKeys = discoveredLeads.map(l => l.agentKey);

  console.log('🏔️  Creating Thiên Long Hội meta-team...');
  console.log(`   Lead: ${resolvedLeaderKey}`);
  console.log(`   Members: ${memberKeys.join(', ') || '(none yet)'}`);

  const id = nextId();
  ws.send(JSON.stringify({ type: 'req', id, method: 'teams.create', params: {
    name: 'Thiên Long Hội',
    lead: resolvedLeaderKey,
    members: memberKeys,
    description: 'Meta-Team — Hoàng Thượng orchestrates all team leads across the GoClaw jianghu.',
    settings: { meta_team: true, auto_add_leads: true }
  }}));

  waitFor(id, (msg) => {
    if (msg.ok) {
      const team = msg.payload?.team;
      console.log(`\n🏔️  ✅ META-TEAM CREATED: Thiên Long Hội`);
      console.log(`   ID: ${team?.id}`);
      console.log(`   Lead: ${superLeader.name} ${superLeader.emoji} (${resolvedLeaderKey})`);
      console.log(`   Members: ${discoveredLeads.length} team lead(s)`);
      discoveredLeads.forEach(l => console.log(`      → ${l.displayName} (${l.teamName})`));
      finish(true);
    } else {
      const errMsg = msg.error?.message || JSON.stringify(msg.error);
      if (errMsg.includes('already leads')) {
        console.log('⚠️  Meta-team already exists (super leader already leads a team).');
        finish(true);
      } else {
        console.error('❌ Failed to create meta-team:', errMsg);
        finish(false);
      }
    }
  });
}

function finish(ok) {
  state = STATES.DONE;
  console.log('\n=====================================');
  console.log('🏔️  Seeding complete.');
  ws.close();
  setTimeout(() => process.exit(ok ? 0 : 1), 500);
}

ws.addEventListener('error', (event) => {
  console.error('WebSocket Error:', event.error || event.message);
});

ws.addEventListener('close', () => {
  console.log('Connection closed.');
});
