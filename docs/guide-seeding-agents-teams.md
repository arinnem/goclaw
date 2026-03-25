# GoClaw Agent & Team Seeding Guide

> **Comprehensive Tutorial**: How to programmatically create AI agents and teams in GoClaw using the WebSocket RPC API, including authentication, payload schemas, common errors, and production best practices.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Prerequisites](#2-prerequisites)
3. [WebSocket Connection & Authentication](#3-websocket-connection--authentication)
4. [Creating Agents (`agents.create`)](#4-creating-agents-agentscreate)
5. [Creating Teams (`teams.create`)](#5-creating-teams-teamscreate)
6. [Injecting Agent Personas (IDENTITY.md)](#6-injecting-agent-personas-identitymd)
7. [Common Errors & Troubleshooting](#7-common-errors--troubleshooting)
8. [Complete Working Script](#8-complete-working-script)
9. [Post-Seeding Verification](#9-post-seeding-verification)
10. [Advanced: Agent Configuration](#10-advanced-agent-configuration)

---

## 1. Overview

GoClaw agents and teams can be created in two ways:

| Method | Best For |
|--------|----------|
| **Dashboard UI** | Creating 1–3 agents manually via the web interface |
| **WebSocket Script** | Bulk-seeding 5+ agents with full persona injection, automated team linking |

This guide covers the **scripted approach**, using Node.js to send JSON-RPC frames over WebSocket to the GoClaw Gateway. The same principles apply if you script in Python, Go, or any WebSocket-capable language.

### Architecture Flow

```
Your Script (Node.js)
    │
    ▼ WebSocket (ws://localhost:3000/ws)
    │
GoClaw Gateway (Go)
    │
    ├── router.go        → Authenticates the connection
    ├── agents_create.go → Creates agent records in PostgreSQL
    ├── teams.go         → Creates teams and links agents
    └── bootstrap.go     → Seeds workspace directories + IDENTITY.md
```

---

## 2. Prerequisites

| Requirement | Details |
|-------------|---------|
| **GoClaw running** | `docker compose -f docker-compose.yml -f docker-compose.postgres.yml -f docker-compose.selfservice.yml up -d` |
| **PostgreSQL** | Required for DB-backed agent/team storage |
| **Gateway Token** | Found in `.env` as `GOCLAW_GATEWAY_TOKEN` |
| **Node.js 18+** | The built-in `WebSocket` API is used (no `ws` package needed) |

### Finding Your Gateway Token

```bash
# From the project root
grep GOCLAW_GATEWAY_TOKEN .env
```

Example output:
```
GOCLAW_GATEWAY_TOKEN=17b7a471fbd76fc0dceb40dbb0334d6e
```

### Finding Your WebSocket URL

The WebSocket endpoint is exposed on the port defined by `GOCLAW_PORT` in your `.env` or `docker-compose.yml`:

```
ws://localhost:<GOCLAW_PORT>/ws
```

Default: `ws://localhost:18790/ws` (Docker) or `ws://localhost:3000/ws` (dev mode).

---

## 3. WebSocket Connection & Authentication

### 3.1 Frame Protocol

GoClaw uses a simple JSON-RPC-like protocol over WebSocket:

**Request Frame:**
```json
{
  "type": "req",
  "id": "<unique_request_id>",
  "method": "<method_name>",
  "params": { ... }
}
```

**Success Response:**
```json
{
  "type": "res",
  "id": "<matching_request_id>",
  "ok": true,
  "payload": { ... }
}
```

**Error Response:**
```json
{
  "type": "res",
  "id": "<matching_request_id>",
  "ok": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "human-readable error"
  }
}
```

### 3.2 The `connect` Handshake (MANDATORY)

> **⚠️ CRITICAL**: The very first message sent over any new WebSocket connection **MUST** be a `connect` request. **Any other method sent first will be rejected** with `UNAUTHORIZED: first request must be 'connect'`.

```javascript
ws.send(JSON.stringify({
  type: 'req',
  id: 'auth',
  method: 'connect',
  params: {
    user_id: 'admin@local',
    token: process.env.GOCLAW_GATEWAY_TOKEN || 'YOUR_TOKEN_HERE'
  }
}));
```

#### Connect Parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | string | **Yes** | Gateway token from `.env`. Without it, you get `viewer` role (read-only). |
| `user_id` | string | **Yes** | Your user identity. Determines agent ownership visibility. |
| `locale` | string | No | Language preference: `"en"`, `"vi"`, `"zh"`. Affects error messages. |
| `tenant_id` | string | No | Multi-tenant scope (UUID or slug). |
| `sender_id` | string | No | For browser pairing reconnection only. |

#### Authentication Paths (from `router.go`)

The backend resolves your identity through 4 paths, in order:

| Path | Condition | Role Granted |
|------|-----------|-------------|
| **1. Gateway Token** | `token` matches `GOCLAW_GATEWAY_TOKEN` | `admin` (or `owner` if `user_id` is in `GATEWAY_OWNER_IDS`) |
| **1b. API Key** | `token` is a valid API key | Role derived from key scopes |
| **2. No Token Configured** | Server has no `GOCLAW_GATEWAY_TOKEN` set | `operator` |
| **3. Browser Pairing** | No/wrong token, pairing service enabled | `operator` (if paired) or pending |
| **4. Fallback** | Everything else | `viewer` (read-only) |

> **💡 For scripting, always use Path 1** (provide the gateway token). This gives you `admin` role, which is required for `agents.create` and `teams.create`.

#### Success Response Example

```json
{
  "type": "res",
  "id": "auth",
  "ok": true,
  "payload": {
    "protocol": "1.0",
    "role": "admin",
    "user_id": "admin@local",
    "tenant_id": "...",
    "is_owner": false,
    "server": { "name": "goclaw", "version": "dev" }
  }
}
```

---

## 4. Creating Agents (`agents.create`)

### 4.1 Method Signature

| Property | Value |
|----------|-------|
| **Method** | `agents.create` |
| **Required Role** | `admin` or higher |
| **Source** | `internal/gateway/methods/agents_create.go` |

### 4.2 Request Parameters

```json
{
  "type": "req",
  "id": "1",
  "method": "agents.create",
  "params": {
    "name": "Triệu Mẫn",
    "emoji": "🦊",
    "avatar": "",
    "agent_type": "open",
    "owner_ids": ["admin@local"],
    "workspace": "",
    "other_config": {
      "description": "Intent Analyzer agent"
    },
    "tools_config": null,
    "sandbox_config": null,
    "memory_config": null
  }
}
```

#### Full Parameter Reference

| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | string | **Yes** | — | Display name. Also used to generate the `agent_key` (slug). |
| `emoji` | string | No | `""` | Emoji displayed in the UI next to the agent name. |
| `avatar` | string | No | `""` | URL to a custom avatar image. |
| `agent_type` | string | No | `"open"` | `"open"` = per-user context files; `"predefined"` = shared context files. |
| `owner_ids` | string[] | No | `[client.UserID()]` | **First entry** becomes `owner_id` in the DB. Falls back to calling user's ID, then `"system"`. |
| `workspace` | string | No | `/app/workspace/agents/<agent_key>` | Custom workspace directory path (inside Docker). |
| `tenant_id` | string | No | Connection's tenant | For cross-tenant creation (owner role only). |
| `other_config` | object | No | `null` | JSON blob for `description`, `thinking_level`, `max_tokens`, `self_evolve`, `skill_evolve`, `workspace_sharing`, `shell_deny_groups`, etc. |
| `tools_config` | object | No | `null` | Per-agent tool policy overrides (tool whitelist/blacklist, prefix). |
| `sandbox_config` | object | No | `null` | Per-agent sandbox settings. |
| `memory_config` | object | No | `null` | Per-agent memory/RAG settings. |
| `subagents_config` | object | No | `null` | Sub-agent delegation settings. |
| `compaction_config` | object | No | `null` | Context compaction settings. |
| `context_pruning` | object | No | `null` | Context pruning settings. |

### 4.3 Agent ID Generation (The Slug Problem)

> **⚠️ CRITICAL GOTCHA**: GoClaw does **NOT** use your provided `name` as the agent ID directly. It runs `config.NormalizeAgentID(name)` which:

1. Converts to lowercase
2. Strips all diacritics and non-ASCII characters
3. Replaces spaces/special chars with hyphens
4. Collapses consecutive hyphens

**This means Vietnamese names get mangled:**

| Display Name | Generated `agent_key` |
|---|---|
| `Nhất Đăng Đại Sư` | `nh-t-ng-i-s` |
| `Triệu Mẫn` | `tri-u-m-n` |
| `Vương Ngữ Yên` | `v-ng-ng-y-n` |
| `Dương Quá` | `d-ng-qu` |
| `Độc Cô Cầu Bại` | `c-c-c-u-b-i` |

**Why This Matters:**
- When creating a **Team**, you must reference agents by their `agent_key` (the mangled slug), NOT their display name.
- If you plan to reference agents in scripts, **capture the `agentId` from the success response** rather than hardcoding expected slugs.

### 4.4 Success Response

```json
{
  "type": "res",
  "id": "1",
  "ok": true,
  "payload": {
    "ok": true,
    "agentId": "tri-u-m-n",
    "name": "Triệu Mẫn",
    "workspace": "/app/workspace/agents/tri-u-m-n"
  }
}
```

> **💡 Best Practice**: Store the returned `agentId` in a map for later use when creating teams.

### 4.5 Agent Visibility (The Owner Problem)

The `agents.list` method filters agents based on who is viewing:

```go
// From agents.go line 111-115
if m.isOwnerUser(userID) {
    agents, err = m.agentStore.List(ctx, "")    // Owner sees ALL agents
} else {
    agents, err = m.agentStore.ListAccessible(ctx, userID) // Others see only their own + shared
}
```

**This means:**
- If you create agents with `owner_ids: ['system']` but you log in as `admin@local`, the agents will be **invisible** in the dashboard.
- **Always set `owner_ids` to match the user who will view/manage agents in the UI.**

```javascript
// ✅ CORRECT: Agents visible to dashboard user
owner_ids: ['admin@local']

// ❌ WRONG: Agents invisible to non-owner users
owner_ids: ['system']
```

**Emergency Fix (SQL):**
If you already created agents with the wrong owner:
```sql
docker compose -f docker-compose.yml -f docker-compose.postgres.yml exec postgres \
  psql -U goclaw goclaw -c \
  "UPDATE agents SET owner_id = 'admin@local' WHERE agent_key IN ('nh-t-ng-i-s', 'tri-u-m-n');"
```

---

## 5. Creating Teams (`teams.create`)

### 5.1 Method Signature

| Property | Value |
|----------|-------|
| **Method** | `teams.create` |
| **Required Role** | `admin` or higher |
| **Source** | `internal/gateway/methods/teams.go` |

### 5.2 Request Parameters

```json
{
  "type": "req",
  "id": "100",
  "method": "teams.create",
  "params": {
    "name": "Agile Critic Team",
    "lead": "nh-t-ng-i-s",
    "members": [
      "tri-u-m-n",
      "v-ng-ng-y-n",
      "d-ng-qu",
      "c-c-c-u-b-i"
    ],
    "description": "5-agent team with Orchestrator, Intent, Methodology, Architect, Critic roles.",
    "settings": {}
  }
}
```

#### Parameter Reference

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | **Yes** | Team display name. |
| `lead` | string | **Yes** | Agent key (slug) or UUID of the team lead. |
| `members` | string[] | **Yes** | Array of agent keys (slugs) or UUIDs for team members. Lead is auto-included. |
| `description` | string | No | Team description displayed in the UI. |
| `settings` | object | No | Team-level settings (access control, notifications, workspace scope). |

### 5.3 What Happens During Team Creation

1. **Lead validation**: The backend calls `resolveAgentInfo()` to look up the lead agent by key or UUID. If not found → error.
2. **Single-lead enforcement**: Each agent can only lead **one** team. If the lead already leads another team → error.
3. **Member validation**: Each member key is resolved. If any member is not found → error.
4. **Team record creation**: A `TeamData` row is inserted in `agent_teams`.
5. **Membership records**: Lead gets `lead` role, members get `member` role in `agent_team_members`.
6. **Auto-link creation**: Outbound `agent_links` are auto-created from lead → each member (enables delegation).
7. **Cache invalidation**: All member agents' caches are flushed so `TEAM.md` gets injected into their system prompts.

### 5.4 Success Response

```json
{
  "type": "res",
  "id": "100",
  "ok": true,
  "payload": {
    "team": {
      "id": "a1b2c3d4-...",
      "name": "Agile Critic Team",
      "lead_agent_id": "...",
      "description": "...",
      "status": "active",
      "created_by": "admin@local"
    }
  }
}
```

---

## 6. Injecting Agent Personas (IDENTITY.md)

When an agent is created, GoClaw automatically generates an `IDENTITY.md` inside the agent's workspace with the name and emoji. However, for **rich system prompts** (detailed personas, behavioral rules, tool instructions), you should write a custom `IDENTITY.md`.

### 6.1 Container Path vs Host Path

| Context | Path |
|---------|------|
| **Inside Docker** | `/app/workspace/agents/<agent_key>/IDENTITY.md` |
| **On Host (via volume mount)** | `./data/workspace/agents/<agent_key>/IDENTITY.md` |

When your seeding script runs **outside** Docker (on the host), you must translate the container path to the local volume mount:

```javascript
// The response returns a Docker-internal path
const containerPath = msg.payload.workspace;
// e.g., "/app/workspace/agents/tri-u-m-n"

// Map to host path
const hostPath = containerPath.replace(
  '/app/workspace',
  path.resolve('./data/workspace')
);

// Ensure directory exists
fs.mkdirSync(hostPath, { recursive: true });

// Write persona
fs.writeFileSync(
  path.join(hostPath, 'IDENTITY.md'),
  agentPersonaContent,
  'utf8'
);
```

### 6.2 Alternative: DB-Level Context Files

You can also set context files via the WebSocket API:

```json
{
  "type": "req",
  "id": "set-soul",
  "method": "agents.files.set",
  "params": {
    "agentId": "tri-u-m-n",
    "fileName": "IDENTITY.md",
    "content": "You are Triệu Mẫn, the Intent Analyzer..."
  }
}
```

This writes the file to the **database** (not filesystem), which is preferred for DB-backed setups because:
- Files survive workspace directory resets
- Files are visible in the dashboard UI under Agent > Context Files
- Files are properly scoped per tenant

---

## 7. Common Errors & Troubleshooting

### Error Reference Table

| Error Code | Message | Cause | Fix |
|------------|---------|-------|-----|
| `UNAUTHORIZED` | `first request must be 'connect'` | Sent a non-`connect` method before authenticating | Always send `connect` as the **first** WebSocket message |
| `UNAUTHORIZED` | `first request must be 'connect'` (on 2nd+ message) | Script fires requests before waiting for `connect` response | Add `await` or callback-based flow |
| `INVALID_REQUEST` | `unknown method: agent.create` | Wrong method name (singular vs plural) | Use `agents.create` (plural), NOT `agent.create` |
| `INVALID_REQUEST` | `agent already exists: <key>` | Agent with that normalized slug already exists | Delete existing agent first, or skip creation |
| `INVALID_REQUEST` | `lead agent: agent not found: <key>` | Team references a non-existent agent key | Ensure agent is created **before** team, use correct slug |
| `INVALID_REQUEST` | `agent "X" already leads team "Y"` | Agent already leads another team | Delete old team or choose a different lead |
| `INVALID_REQUEST` | `name is required` | Missing `name` field in params | Always provide `name` |
| `INVALID_REQUEST` | `lead is required` | Missing `lead` field in team params | Always provide `lead` agent key |
| `INVALID_REQUEST` | `cannot create agent with reserved id 'default'` | Agent name normalizes to `"default"` | Choose a different name |
| `ENOENT` | `no such file or directory: /app/workspace/...` | Script tried to write to Docker path from host | Map `/app/workspace` → `./data/workspace` |

### 7.1 Race Condition: Auth Not Ready

The most common scripting error is sending requests before the `connect` handshake completes:

```javascript
// ❌ WRONG: Fires immediately after open, no handshake wait
ws.on('open', () => {
  ws.send(connectMessage);
  ws.send(agentCreateMessage); // UNAUTHORIZED!
});

// ✅ CORRECT: Wait for connect response
ws.on('open', () => ws.send(connectMessage));
ws.on('message', (data) => {
  const msg = JSON.parse(data);
  if (msg.id === 'auth' && msg.ok) {
    createFirstAgent(); // Now safe to send
  }
});
```

### 7.2 Sequential Agent Creation

Agents must be created **one at a time** to properly capture their auto-generated `agentId` for team references:

```javascript
let createdAgents = 0;
const agentIdMap = {};

ws.on('message', (data) => {
  const msg = JSON.parse(data);

  // Capture generated agent ID
  if (msg.ok && msg.payload?.agentId) {
    agentIdMap[agents[createdAgents - 1].key] = msg.payload.agentId;
  }

  createdAgents++;
  if (createdAgents < agents.length) {
    createNextAgent();
  } else {
    createTeam(agentIdMap);
  }
});
```

### 7.3 Agent Name Collision

If you run the script twice, you'll get `agent already exists` errors. Handle this gracefully:

```javascript
if (!msg.ok && msg.error?.message?.includes('already exists')) {
  console.log(`⏭️  Skipping (already exists): ${ag.name}`);
  // Still increment counter and continue
  createdAgents++;
  createNextAgent();
}
```

### 7.4 Invisible Agents (Wrong Owner)

**Symptom:** Script succeeds, but agents don't appear in the dashboard.

**Root Cause:** The `owner_id` in the database doesn't match the user viewing the dashboard.

**Diagnosis:**
```sql
-- Check who owns the agents
docker compose exec postgres psql -U goclaw goclaw -c \
  "SELECT agent_key, owner_id FROM agents WHERE agent_key LIKE '%tri-u%';"
```

**Fix:**
```sql
-- Reassign to dashboard user
docker compose exec postgres psql -U goclaw goclaw -c \
  "UPDATE agents SET owner_id = 'admin@local' WHERE owner_id = 'system';"
```

**Prevention:** Always set `owner_ids` in your script to match your dashboard login:
```javascript
owner_ids: ['admin@local']
```

---

## 8. Complete Working Script

A production-ready reference script lives at:

```
scripts/seed-agile-critic-team.js
```

### Minimal Example

```javascript
import fs from 'fs';
import path from 'path';

const WS_URL = 'ws://127.0.0.1:3000/ws';
const GATEWAY_TOKEN = process.env.GOCLAW_GATEWAY_TOKEN || 'YOUR_TOKEN';
const OWNER_ID = 'admin@local';

const agents = [
  { name: 'My Agent', emoji: '🤖', persona: 'You are a helpful AI assistant.' }
];

const ws = new WebSocket(WS_URL);
let createdAgents = 0;
const agentIds = [];

ws.addEventListener('open', () => {
  ws.send(JSON.stringify({
    type: 'req', id: 'auth', method: 'connect',
    params: { user_id: OWNER_ID, token: GATEWAY_TOKEN }
  }));
});

ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data.toString());

  // Auth success → create first agent
  if (msg.id === 'auth' && msg.ok) {
    console.log('✅ Connected. Creating agents...');
    createNext();
    return;
  }

  // Agent creation response
  if (msg.ok && msg.payload?.agentId) {
    agentIds.push(msg.payload.agentId);
    console.log(`✅ Created: ${msg.payload.name} → ${msg.payload.agentId}`);

    // Write persona to host workspace
    const hostWs = msg.payload.workspace.replace(
      '/app/workspace', path.resolve('./data/workspace')
    );
    fs.mkdirSync(hostWs, { recursive: true });
    fs.writeFileSync(path.join(hostWs, 'IDENTITY.md'), agents[createdAgents-1].persona, 'utf8');
  }

  createdAgents++;
  if (createdAgents < agents.length) {
    createNext();
  } else {
    console.log('All agents created:', agentIds);
    // Optionally create team here using agentIds[0] as lead
    ws.close();
  }
});

function createNext() {
  const ag = agents[createdAgents];
  ws.send(JSON.stringify({
    type: 'req',
    id: String(createdAgents + 1),
    method: 'agents.create',
    params: {
      name: ag.name,
      emoji: ag.emoji,
      agent_type: 'open',
      owner_ids: [OWNER_ID]
    }
  }));
}
```

Run with:
```bash
node scripts/your-seed-script.js
```

---

## 9. Post-Seeding Verification

### 9.1 Dashboard Check

1. Open the GoClaw dashboard in your browser
2. Navigate to **Agents** → verify all agents appear with correct names, emojis, models
3. Navigate to **Agent Teams** → verify the team appears with correct lead and members
4. Click on a team → verify the member list and delegation links

### 9.2 API Check

Send a `health` request via WebSocket to see connected agents:

```json
{ "type": "req", "id": "h", "method": "health", "params": {} }
```

Or list agents:
```json
{ "type": "req", "id": "list", "method": "agents.list", "params": {} }
```

### 9.3 Database Check

```sql
-- List all agents
docker compose exec postgres psql -U goclaw goclaw -c \
  "SELECT agent_key, display_name, owner_id, status FROM agents;"

-- List all teams
docker compose exec postgres psql -U goclaw goclaw -c \
  "SELECT id, name, status, created_by FROM agent_teams;"

-- List team members
docker compose exec postgres psql -U goclaw goclaw -c \
  "SELECT t.name, a.agent_key, m.role
   FROM agent_team_members m
   JOIN agent_teams t ON t.id = m.team_id
   JOIN agents a ON a.id = m.agent_id;"
```

### 9.4 Functional Test

Send a chat message to the team lead agent to verify:
- The lead's system prompt includes `TEAM.md` (listing all team members)
- The lead can delegate tasks to members via `team_tasks` tool
- Members respond with their unique personas

---

## 10. Advanced: Agent Configuration

### 10.1 Provider & Model Configuration

The `agents.create` endpoint does **NOT** accept `provider` and `model` as top-level params. Instead, these inherit from the global config defaults:

```go
// From agents_create.go
agentData.Provider = m.cfg.Agents.Defaults.Provider
agentData.Model    = m.cfg.Agents.Defaults.Model
```

To set provider/model per-agent, use `agents.update` **after** creation:

```json
{
  "type": "req",
  "id": "update-1",
  "method": "agents.update",
  "params": {
    "agentId": "tri-u-m-n",
    "provider": "openai-codex",
    "model": "gpt-5.4"
  }
}
```

### 10.2 Available RPC Methods Reference

| Category | Method | Description |
|----------|--------|-------------|
| **System** | `connect` | WebSocket handshake (MUST be first) |
| | `health` | Server health + connected clients |
| | `status` | Agent roster + session count |
| **Agents** | `agents.list` | List all accessible agents |
| | `agents.create` | Create a new agent |
| | `agents.update` | Update agent config |
| | `agents.delete` | Delete an agent |
| | `agents.files.list` | List agent context files |
| | `agents.files.get` | Read a context file |
| | `agents.files.set` | Write/overwrite a context file |
| **Teams** | `teams.list` | List all teams |
| | `teams.create` | Create a new team |
| | `teams.get` | Get team details + members |
| | `teams.update` | Update team settings |
| | `teams.delete` | Delete a team |
| | `teams.members.add` | Add a member to a team |
| | `teams.members.remove` | Remove a member |
| **Chat** | `chat.send` | Send a message to an agent |
| | `chat.history` | Get chat history |
| | `chat.abort` | Abort a running agent |

### 10.3 Deleting & Re-Creating

To cleanly re-seed, delete existing agents and teams first:

```json
// Delete a team (by UUID from teams.list response)
{ "type": "req", "id": "d1", "method": "teams.delete", "params": { "teamId": "<uuid>" } }

// Delete an agent (by agent_key)
{ "type": "req", "id": "d2", "method": "agents.delete", "params": { "agentId": "tri-u-m-n" } }
```

---

## Appendix: Key Source Files

| File | Purpose |
|------|---------|
| `internal/gateway/router.go` | Authentication paths (4 tiers) |
| `internal/gateway/methods/agents_create.go` | `agents.create` handler + slug generation |
| `internal/gateway/methods/agents.go` | `agents.list` visibility filter (owner vs accessible) |
| `internal/gateway/methods/teams.go` | `teams.create` handler + auto-linking |
| `internal/gateway/methods/teams_crud.go` | Team CRUD operations |
| `internal/store/agent_store.go` | `AgentData` struct (DB schema) |
| `pkg/protocol/methods.go` | All 50+ RPC method string constants |
| `internal/config/normalize.go` | `NormalizeAgentID()` slug generation |
| `scripts/seed-agile-critic-team.js` | Working reference script |
