# GoClaw — Windows Setup Guide (Docker + 9Router)

> Complete step-by-step guide to install, configure, and run GoClaw on **Windows** using **Docker Desktop** and **9Router** as the free AI provider.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Part 1: Install 9Router](#part-1-install-9router)
- [Part 2: Configure GoClaw](#part-2-configure-goclaw)
- [Part 3: Fix Windows Compatibility Issues](#part-3-fix-windows-compatibility-issues)
- [Part 4: Build & Launch](#part-4-build--launch)
- [Part 5: Verify Installation](#part-5-verify-installation)
- [Part 6: Dashboard Login](#part-6-dashboard-login)
- [Part 7: Add LLM Provider (Dashboard)](#part-7-add-llm-provider-dashboard)
- [Part 8: Create an AI Agent (Dashboard)](#part-8-create-an-ai-agent-dashboard)
- [Part 9: Chat with Your Agent](#part-9-chat-with-your-agent)
- [Part 10: Explore the Dashboard](#part-10-explore-the-dashboard)
- [Valid Provider Types](#valid-provider-types)
- [Docker Compose Files Reference](#docker-compose-files-reference)
- [Management Commands](#management-commands)
- [Troubleshooting](#troubleshooting)
- [Appendix A: API Commands](#appendix-a-api-commands-for-automation)
- [Appendix B: API Quick Reference](#appendix-b-api-quick-reference)

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    Your Windows Machine                       │
│                                                              │
│  ┌────────────────┐     ┌──────────────────────────────────┐ │
│  │    9Router      │     │        Docker Desktop            │ │
│  │  :20128         │     │                                  │ │
│  │                 │     │  ┌────────────┐  ┌────────────┐  │ │
│  │  Qwen (free)    │◄────┤  │  GoClaw    │  │ PostgreSQL │  │ │
│  │  Gemini (free)  │     │  │  Gateway   │  │ 18+pgvector│  │ │
│  │  + 40 more...   │     │  │  :18790    │  │  :5432     │  │ │
│  │                 │     │  └────────────┘  └────────────┘  │ │
│  └────────────────┘     │  ┌────────────┐                  │ │
│                          │  │ Dashboard  │                  │ │
│  Browser ◄───────────────┤  │ (React SPA)│                  │ │
│  http://localhost:3000   │  │  :3000     │                  │ │
│                          │  └────────────┘                  │ │
│                          └──────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

| Service | URL | Purpose |
|---------|-----|---------|
| **GoClaw Gateway** | http://localhost:18790 | AI agent API (OpenAI-compatible) |
| **Dashboard** | http://localhost:3000 | Web UI for managing agents, skills, traces |
| **9Router** | http://localhost:20128 | Free AI model router (40+ providers) |
| **PostgreSQL** | localhost:5432 | Database with pgvector for embeddings |
| **Swagger Docs** | http://localhost:18790/docs | Interactive API explorer |

---

## Prerequisites

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Docker Desktop | Latest | `docker --version` |
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | Latest | `git --version` |

> **Note**: Docker Desktop must be running with **WSL2 backend** enabled.

---

## Part 1: Install 9Router

9Router is a free, open-source AI model router that aggregates 40+ providers into a single OpenAI-compatible API.

### 1.1 Install globally

```powershell
npm install -g 9router
```

### 1.2 Start 9Router

Open a **dedicated terminal** (9Router runs in the foreground):

```powershell
9router
```

It starts:
- Dashboard at `http://localhost:20128`
- OpenAI-compatible API at `http://localhost:20128/v1`

### 1.3 Connect free providers

1. Open http://localhost:20128/dashboard/providers
2. Login with default password: **`123456`**
3. Click **Connect** on free providers:
   - **Qwen** — unlimited free (qwen3-coder-plus, etc.)
   - **Gemini CLI** — Google's Gemini models via CLI auth
4. Click **Free Test** → verify both show green ✅

### 1.4 Note your API key

The default 9Router API key is `sk_9router`. You can also find/generate keys in the 9Router dashboard under Settings.

---

## Part 2: Configure GoClaw

### 2.1 Clone the repository

```powershell
git clone https://github.com/nextlevelbuilder/goclaw.git
cd goclaw
```

### 2.2 Generate secrets

Run in PowerShell to generate cryptographic keys:

```powershell
# 64-character hex encryption key (for AES-256-GCM API key encryption)
$encKey = -join ((1..32) | ForEach-Object { '{0:x2}' -f (Get-Random -Minimum 0 -Maximum 256) })

# 32-character hex gateway token (for API authentication)
$gwToken = -join ((1..16) | ForEach-Object { '{0:x2}' -f (Get-Random -Minimum 0 -Maximum 256) })

Write-Output "GOCLAW_ENCRYPTION_KEY=$encKey"
Write-Output "GOCLAW_GATEWAY_TOKEN=$gwToken"
```

### 2.3 Create `.env` file

Create a `.env` file in the project root with the generated secrets:

```env
# === GoClaw Environment ===

# Auto-generated secrets (paste your generated values)
GOCLAW_ENCRYPTION_KEY=<your-64-char-hex-key>
GOCLAW_GATEWAY_TOKEN=<your-32-char-hex-token>

# 9Router Configuration
# "host.docker.internal" lets Docker containers reach your Windows host
GOCLAW_OPENROUTER_API_KEY=sk_9router
GOCLAW_OPENROUTER_BASE_URL=http://host.docker.internal:20128/v1

# Provider override
GOCLAW_PROVIDER=openrouter

# Auto-upgrade database schema on startup (REQUIRED for fresh installs)
GOCLAW_AUTO_UPGRADE=true

# PostgreSQL credentials (used by docker-compose.postgres.yml)
POSTGRES_USER=goclaw
POSTGRES_PASSWORD=goclaw
POSTGRES_DB=goclaw
```

> **IMPORTANT**: `host.docker.internal` is critical. Docker containers cannot use `localhost` to reach host processes — they need this special DNS name provided by Docker Desktop.

---

## Part 3: Fix Windows Compatibility Issues

Two issues must be fixed before GoClaw will run on Windows.

### 3.1 Fix CRLF line endings in `docker-entrypoint.sh`

**What happens**: Windows saves files with `\r\n` (CRLF) line endings. When Docker copies this file into a Linux container, the shell interprets `#!/bin/sh\r` as looking for `/bin/sh\r` (with a carriage return), which doesn't exist.

**Error you'll see**:
```
[FATAL tini (7)] exec /app/docker-entrypoint.sh failed: No such file or directory
```

**Fix** — choose one method:

#### Method A: VS Code (easiest)
1. Open `docker-entrypoint.sh` in VS Code
2. Look at the bottom-right status bar → click **CRLF**
3. Select **LF**
4. Save the file (Ctrl+S)

#### Method B: PowerShell
```powershell
$content = [System.IO.File]::ReadAllText("docker-entrypoint.sh")
$content = $content -replace "`r`n", "`n"
[System.IO.File]::WriteAllText("docker-entrypoint.sh", $content, `
  (New-Object System.Text.UTF8Encoding $false))
```

#### Method C: Git config (prevents future issues)
```powershell
git config core.autocrlf input
git checkout -- docker-entrypoint.sh
```

### 3.2 Fix Docker capability for permission issues

**What happens**: `docker-compose.yml` drops ALL Linux capabilities with `cap_drop: ALL`, including `DAC_OVERRIDE`. The entrypoint runs as root to create runtime directories, but without `DAC_OVERRIDE`, root cannot write to directories owned by the `goclaw` user (UID 1000).

**Error you'll see**:
```
mkdir: can't create directory '/app/data/.runtime/': Permission denied
```

**Fix** — edit `docker-compose.yml`, find the `cap_add` section and add `DAC_OVERRIDE`:

```yaml
    cap_add:
      - SETUID
      - SETGID
      - CHOWN
      - DAC_OVERRIDE    # <-- ADD THIS LINE
```

---

## Part 4: Build & Launch

### 4.1 Build and start all services

```powershell
docker compose `
  -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml `
  up -d --build
```

This builds from source and starts:
- **goclaw-postgres-1** — PostgreSQL 18 with pgvector
- **goclaw-goclaw-1** — GoClaw gateway
- **goclaw-goclaw-ui-1** — Web dashboard (Nginx + React)

### 4.2 Wait for healthy containers

```powershell
docker compose `
  -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml `
  ps
```

All containers should show `Up` or `Up (healthy)`.

---

## Part 5: Verify Installation

### 5.1 Check gateway logs

```powershell
docker logs goclaw-goclaw-1 --tail 20
```

**Expected successful output:**

```
level=INFO msg="auto-upgrade: SQL migrations applied" version=14
level=INFO msg="registered provider" name=openrouter
level=INFO msg="builtin tools seeded" count=32
level=INFO msg="registered all RPC methods"
level=INFO msg="skills watcher started" dirs=6 watched=14
level=INFO msg="lane created" name=main concurrency=30
level=INFO msg="lane created" name=subagent concurrency=50
level=INFO msg="lane created" name=team concurrency=100
level=INFO msg="lane created" name=cron concurrency=30
level=INFO msg="gateway starting" addr=0.0.0.0:18790
```

### 5.2 Health check

```powershell
Invoke-RestMethod -Uri http://localhost:18790/health

# Expected: {"status":"ok","protocol":3}
```

### 5.3 Check all services

| Check | Command / URL | Expected |
|-------|---------------|----------|
| Gateway health | `http://localhost:18790/health` | `{"status":"ok"}` |
| Dashboard | `http://localhost:3000` | Login page |
| 9Router | `http://localhost:20128` | Dashboard |
| API Docs | `http://localhost:18790/docs` | Swagger UI |

---

## Part 6: Dashboard Login

1. Open http://localhost:3000
2. Select the **Token** tab
3. Enter credentials:

| Field | Value |
|-------|-------|
| **User ID** | any email (e.g. `admin@local`) |
| **Gateway Token** | your `GOCLAW_GATEWAY_TOKEN` from `.env` |

4. Click **Connect**

After login you'll see:
- **Overview** — gateway status, database, uptime, tools count
- **Agents** — manage AI agents
- **Skills** — 5 core skills (docx, pdf, pptx, xlsx, skill-creator)
- **Tools** — 32 built-in tools
- **Channels** — messaging integrations
- **MCP Servers** — external tool servers

---

## Part 7: Add LLM Provider (Dashboard)

Now connect 9Router to GoClaw through the web dashboard.

### 7.1 Navigate to Providers

1. Open http://localhost:3000/providers
2. Click **"+ Add Provider"** (top-right corner)

### 7.2 Fill in provider details

Fill in the form with these values:

| Field | Value | Notes |
|-------|-------|-------|
| **Name** | `9router` | Internal identifier (lowercase, no spaces) |
| **Display Name** | `9Router` | Shown in the UI |
| **Provider Type** | `OpenAI Compatible` | **Critical** — select this from the dropdown. Do NOT select "OpenAI" |
| **API Base URL** | `http://host.docker.internal:20128/v1` | Docker internal address for host access |
| **API Key** | `sk_9router` | Default 9Router key |
| **Enabled** | ✅ On | Toggle to enable |

3. Click **Save** or **Create**

### 7.3 Verify the provider

1. Back on the Providers list, you should see **9Router** with a green status
2. Click the **⋮** menu (or the provider row) → **Verify** / **Test Connection**
3. It should return success — confirming GoClaw can reach 9Router

> **IMPORTANT**: If you see `openai` or `OpenAI` in the provider type dropdown, **do NOT select it**. That's for direct OpenAI API keys. For 9Router (or any OpenAI-compatible endpoint like LiteLLM, LocalAI, Ollama), always select **`OpenAI Compatible`** (`openai_compat` in the API).

### 7.4 Provider type quick reference

The dashboard dropdown maps to these API values:

| Dashboard Label | API Value | When to Use |
|-----------------|-----------|-------------|
| OpenAI Compatible | `openai_compat` | 9Router, LiteLLM, LocalAI, vLLM, any `/v1/chat/completions` endpoint |
| OpenRouter | `openrouter` | OpenRouter.ai with an OpenRouter API key |
| Anthropic | `anthropic_native` | Direct Anthropic Claude API key |
| Google Gemini | `gemini_native` | Direct Google Gemini API key |
| Groq | `groq` | Direct Groq API key |
| DeepSeek | `deepseek` | Direct DeepSeek API key |
| Ollama | `ollama` | Local Ollama instance (no API key needed) |

---

## Part 8: Create an AI Agent (Dashboard)

### 8.1 Navigate to Agents

1. Open http://localhost:3000/agents
2. Click **"+ New Agent"** (or **"Create Agent"**)

### 8.2 Fill in agent details

| Field | Value | Notes |
|-------|-------|-------|
| **Agent Key** | `my-assistant` | Slug format: lowercase, numbers, hyphens only |
| **Display Name** | `My Assistant` | Shown in the chat UI |
| **Agent Type** | `chat` | Standard conversational agent |
| **Description** | `A helpful AI assistant powered by Qwen` | Brief description |
| **Provider** | `9router` | Select from dropdown — must match the provider name from Part 7 |
| **Model** | `qwen/qwen3-coder-plus` | Must match a model available in your 9Router |
| **System Prompt** | `You are a helpful AI assistant. Be concise and clear.` | Instructions for the AI's behavior |

3. Click **Save** or **Create**

> **WARNING — Model mismatch is the #1 setup error!**
>
> The model name must match a provider you have **actually connected** in 9Router (Part 1.3):
> - ✅ Connected **Qwen** in 9Router → use model `qwen/qwen3-coder-plus`
> - ✅ Connected **Gemini CLI** in 9Router → use model `gemini/gemini-2.5-flash`
> - ❌ Did NOT connect **OpenAI** in 9Router → `openai/gpt-4o-mini` **will fail** with `"No credentials for provider: openai"`
>
> Check your connected providers at http://localhost:20128/dashboard/providers

### 8.3 Agent settings explained

After creation, the dashboard shows additional settings you can configure:

| Setting | Default | Description |
|---------|---------|-------------|
| **Context Window** | 200,000 | Max tokens in conversation context |
| **Max Tool Iterations** | 20 | Max tool-use loops per response |
| **Memory** | Enabled | Long-term memory (pgvector) |
| **Restrict to Workspace** | Yes | Agent can only access its own workspace |
| **Status** | Active | Agent is ready to receive messages |

---

## Part 9: Chat with Your Agent

### 9.1 Via Dashboard (recommended)

1. Open http://localhost:3000
2. In the **left sidebar**, select **"My Assistant"** from the agent dropdown
3. Click **"+ New Chat"**
4. Type a message (e.g. *"Hello! What can you do?"*) and press **Enter**
5. Wait for the response — it may take a few seconds on the first message

**Dashboard chat features:**
- **Real-time streaming** — responses appear token by token
- **Conversation history** — previous chats appear in the left sidebar
- **Multiple agents** — switch between agents using the dropdown
- **Tool usage** — the agent can use 32+ built-in tools (file ops, web search, etc.)
- **Memory** — the agent remembers facts across conversations

### 9.2 Via messaging channels (optional)

After the agent is working in the dashboard, you can connect messaging channels:

1. Go to http://localhost:3000/channels
2. Click **"+ Add Channel"**
3. Select your platform (Telegram, Discord, Slack, WhatsApp, Zalo, Feishu)
4. Enter the required credentials (e.g. Telegram bot token)
5. Assign your agent to the channel

### 9.3 Via API (for developers)

See [Appendix A: API Commands](#appendix-a-api-commands-for-automation) for programmatic access.

---

## Part 10: Explore the Dashboard

After your agent is running, explore the other dashboard pages:

### Overview (`/overview`)
- Gateway status, protocol version, database connection
- Total agents, skills, tools count
- System uptime and resource usage

### Skills (`/skills`)
- **5 core skills** bundled: docx, pdf, pptx, xlsx, skill-creator
- Click a skill to see details, parameters, and dependencies
- Some skills require Python packages — click **"Install Dependencies"** if prompted

### Tools (`/tools`)
- **32 built-in tools** organized by group:
  - **fs** — read_file, write_file, edit_file, list_files, search, glob
  - **runtime** — exec (shell commands with approval workflow)
  - **web** — web_search, web_fetch
  - **memory** — memory_search, memory_get, knowledge_graph_search
  - **media** — create_image, create_audio, create_video, read_document
  - **teams** — team_tasks, team_message
- Each tool shows its parameters, description, and which agents can use it

### MCP Servers (`/mcp-servers`)
- Connect external MCP (Model Context Protocol) servers
- Supports **stdio**, **SSE**, and **streamable-http** transports
- Per-agent and per-user access control

### Traces (`/traces`)
- View LLM call traces with detailed spans
- See token usage, latency, cache hit rates
- Debug tool calls and agent reasoning

### Channels (`/channels`)
- Manage messaging integrations (Telegram, Discord, Slack, etc.)
- Configure per-channel agent assignment
- View message statistics

---

## Valid Provider Types

When creating a provider via API, `provider_type` must be one of:

| Type | Description |
|------|-------------|
| `openai_compat` | Any OpenAI-compatible API (9Router, LiteLLM, LocalAI, etc.) |
| `anthropic_native` | Anthropic Claude (native HTTP+SSE with prompt caching) |
| `gemini_native` | Google Gemini (native API) |
| `openrouter` | OpenRouter.ai |
| `groq` | Groq |
| `deepseek` | DeepSeek |
| `mistral` | Mistral AI |
| `xai` | xAI Grok |
| `minimax_native` | MiniMax |
| `cohere` | Cohere |
| `perplexity` | Perplexity |
| `dashscope` | DashScope (Qwen) |
| `bailian` | Bailian Coding |
| `ollama` | Local Ollama (no API key) |
| `ollama_cloud` | Ollama Cloud (API key required) |
| `claude_cli` | Claude CLI (stdio + MCP bridge) |
| `chatgpt_oauth` | ChatGPT via OAuth |
| `suno` | Suno (music generation) |

---

## Docker Compose Files Reference

| File | Purpose | When to use |
|------|---------|-------------|
| `docker-compose.yml` | Base service definition | Always |
| `docker-compose.postgres.yml` | PostgreSQL 18 + pgvector | Always (required) |
| `docker-compose.selfservice.yml` | Web dashboard (React SPA) | Recommended |
| `docker-compose.upgrade.yml` | One-shot schema upgrade | Manual upgrades |
| `docker-compose.browser.yml` | Headless Chrome | Browser automation |
| `docker-compose.sandbox.yml` | Docker code sandbox | Isolated code exec |
| `docker-compose.otel.yml` | OpenTelemetry + Jaeger | Tracing/debugging |
| `docker-compose.redis.yml` | Redis cache backend | High-traffic setups |
| `docker-compose.tailscale.yml` | Tailscale VPN mesh | Remote access |

**Common combinations:**

```powershell
# Recommended: Gateway + Dashboard + PostgreSQL
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml `
  up -d --build

# Minimal: Gateway + PostgreSQL (no dashboard)
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  up -d --build

# Full: + Tracing (Jaeger UI at http://localhost:16686)
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml `
  -f docker-compose.otel.yml `
  up -d --build
```

---

## Enable AI Coding Agents (Claude CLI + Gemini CLI)

GoClaw can delegate tasks to local AI coding agent CLIs (**Claude Code** and **Gemini CLI**) running inside the Docker container. This is enabled via the `ENABLE_CODING_AGENTS` build argument.

> **Note on Antigravity**: Google Antigravity is an IDE/platform, not a standalone CLI binary. For CLI-based Gemini integration, use **Gemini CLI** (`@google/gemini-cli`) which is what gets installed here.

### Build with coding agents enabled

1. Add to your `.env` file:

```env
ENABLE_CODING_AGENTS=true
```

2. Rebuild:

```powershell
docker compose `
  -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml `
  up -d --build
```

This installs inside the container:
- **Node.js 20+** and **npm** (required runtime)
- **Claude Code CLI** (`claude` binary) — via `@anthropic-ai/claude-code`
- **Gemini CLI** (`gemini` binary) — via `@google/gemini-cli`

### Configure the providers

After building, add a provider via the Dashboard or API:

#### Option A: Claude CLI provider

| Field | Value |
|-------|-------|
| **Provider Type** | `Claude CLI (Local)` |
| **Name** | `claude-cli` |

Then create an agent using provider `claude-cli` with model `sonnet` (or `opus`, `haiku`).

#### Option B: ACP provider (Claude, Gemini, or Codex)

The ACP provider can orchestrate any of the installed CLI agents:

**Via API:**
```powershell
$headers = @{
  "Authorization" = "Bearer <YOUR_GATEWAY_TOKEN>"
  "X-User-ID"     = "admin@local"
  "Content-Type"  = "application/json"
}

# For Gemini CLI agent
$body = '{
  "name": "gemini-agent",
  "display_name": "Gemini Agent",
  "provider_type": "acp",
  "api_base": "gemini",
  "enabled": true,
  "settings": {
    "idle_ttl": "5m",
    "perm_mode": "approve-all",
    "work_dir": "/app/workspace"
  }
}'
Invoke-RestMethod -Uri "http://localhost:18790/v1/providers" `
  -Headers $headers -Method POST -Body $body

# For Claude CLI via ACP
$body = '{
  "name": "claude-agent",
  "display_name": "Claude Agent",
  "provider_type": "acp",
  "api_base": "claude",
  "enabled": true,
  "settings": {
    "idle_ttl": "5m",
    "perm_mode": "approve-all",
    "work_dir": "/app/workspace"
  }
}'
Invoke-RestMethod -Uri "http://localhost:18790/v1/providers" `
  -Headers $headers -Method POST -Body $body
```

### Authentication inside Docker

Each CLI requires its own authentication:

| CLI | Auth Method | Notes |
|-----|-------------|-------|
| **Claude CLI** | `claude login` inside container | Requires Anthropic account with API access |
| **Gemini CLI** | `gemini auth` inside container | Free tier: 1,000 requests/day with Google account |

To authenticate, shell into the running container:

```powershell
docker exec -it goclaw-goclaw-1 sh
claude login          # Follow prompts for Anthropic auth
gemini auth           # Follow prompts for Google auth
```

---

## Management Commands

```powershell
# === Logs ===
docker logs goclaw-goclaw-1 -f                    # Live gateway logs
docker logs goclaw-goclaw-1 --tail 50              # Last 50 lines
docker logs goclaw-postgres-1 --tail 20            # PostgreSQL logs

# === Lifecycle ===
# Start
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml up -d

# Restart
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml restart

# Stop
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml down

# Rebuild from source (after code changes)
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml up -d --build

# === Upgrade ===
# Pull latest images
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml pull

# Check schema status
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.upgrade.yml run --rm upgrade --status

# === Reset (DELETES ALL DATA) ===
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml down
docker volume rm goclaw_goclaw-data goclaw_postgres-data
docker compose -f docker-compose.yml `
  -f docker-compose.postgres.yml `
  -f docker-compose.selfservice.yml up -d --build

# === Inspect ===
docker exec -it goclaw-goclaw-1 sh                 # Shell into gateway
docker exec -it goclaw-postgres-1 psql -U goclaw   # PostgreSQL console
```

---

## Troubleshooting

### Container crash: `exec failed: No such file or directory`

| | |
|---|---|
| **Error** | `[FATAL tini (7)] exec /app/docker-entrypoint.sh failed: No such file or directory` |
| **Cause** | CRLF line endings in `docker-entrypoint.sh` (Windows `\r\n` vs Linux `\n`) |
| **Fix** | Convert to LF — see [Part 3.1](#31-fix-crlf-line-endings-in-docker-entrypointsh) |

### Container crash: `Permission denied`

| | |
|---|---|
| **Error** | `mkdir: can't create directory '/app/data/.runtime/': Permission denied` |
| **Cause** | Missing `DAC_OVERRIDE` Linux capability in `docker-compose.yml` |
| **Fix** | Add `DAC_OVERRIDE` to `cap_add` — see [Part 3.2](#32-fix-docker-capability-for-permission-issues) |

### Schema compatibility check failed (v0 → v14)

| | |
|---|---|
| **Error** | `schema compatibility check failed: gateway requires schema v14, database is at v0` |
| **Cause** | Fresh database, migrations not applied |
| **Fix** | Set `GOCLAW_AUTO_UPGRADE=true` in `.env` |

### LLM call: `No credentials for provider: openai`

| | |
|---|---|
| **Error** | `HTTP 400: 9router: No credentials for provider: openai` |
| **Cause** | Agent model set to `openai/gpt-4o-mini` but 9Router has no OpenAI connected |
| **Fix** | Change agent model to one matching your 9Router providers (e.g. `qwen/qwen3-coder-plus`) |

### API: `unsupported provider_type`

| | |
|---|---|
| **Error** | `invalid request: unsupported provider_type` |
| **Cause** | Used `openai` instead of `openai_compat` |
| **Fix** | Use `openai_compat` for any OpenAI-compatible API — see [Valid Provider Types](#valid-provider-types) |

### API: `agent_key must be a valid slug`

| | |
|---|---|
| **Error** | `agent_key must be a valid slug (lowercase letters, numbers, hyphens only)` |
| **Cause** | Used `name` field instead of `agent_key`, or key contains invalid characters |
| **Fix** | Use `agent_key` with only lowercase letters, numbers, and hyphens |

### API: `X-GoClaw-User-Id header is required`

| | |
|---|---|
| **Error** | `X-GoClaw-User-Id header is required` |
| **Cause** | Used `X-User-ID` instead of the correct header name |
| **Fix** | Use `X-GoClaw-User-Id` for agent-related endpoints |

### API: `agent not found: default`

| | |
|---|---|
| **Error** | `agent not found: default` |
| **Cause** | Chat API called without specifying agent, no default agent set |
| **Fix** | Set `"model": "my-assistant"` in chat request body (use your `agent_key`) |

---

## Appendix A: API Commands (for Automation)

For advanced users or CI/CD automation, here are the equivalent API commands for everything done via the dashboard above.

### A.1 List providers

```powershell
$headers = @{
  "Authorization" = "Bearer <YOUR_GATEWAY_TOKEN>"
  "X-User-ID"     = "admin@local"
}
Invoke-RestMethod -Uri "http://localhost:18790/v1/providers" `
  -Headers $headers -Method GET | ConvertTo-Json -Depth 5
```

### A.2 Create 9Router provider

```powershell
$headers = @{
  "Authorization" = "Bearer <YOUR_GATEWAY_TOKEN>"
  "X-User-ID"     = "admin@local"
  "Content-Type"  = "application/json"
}
$body = '{
  "name": "9router",
  "display_name": "9Router",
  "provider_type": "openai_compat",
  "api_base": "http://host.docker.internal:20128/v1",
  "api_key": "sk_9router",
  "enabled": true
}'
Invoke-RestMethod -Uri "http://localhost:18790/v1/providers" `
  -Headers $headers -Method POST -Body $body | ConvertTo-Json -Depth 5
```

### A.3 Verify provider

```powershell
Invoke-RestMethod -Uri "http://localhost:18790/v1/providers/<PROVIDER_ID>/verify" `
  -Headers $headers -Method POST | ConvertTo-Json
```

### A.4 Create agent

> **Note**: Agent endpoints require `X-GoClaw-User-Id` header (not `X-User-ID`).

```powershell
$headers = @{
  "Authorization"    = "Bearer <YOUR_GATEWAY_TOKEN>"
  "X-GoClaw-User-Id" = "admin@local"
  "Content-Type"     = "application/json"
}
$body = '{
  "agent_key": "my-assistant",
  "display_name": "My Assistant",
  "agent_type": "chat",
  "description": "A helpful AI assistant powered by Qwen",
  "provider": "9router",
  "model": "qwen/qwen3-coder-plus",
  "system_prompt": "You are a helpful AI assistant. Be concise and clear."
}'
Invoke-RestMethod -Uri "http://localhost:18790/v1/agents" `
  -Headers $headers -Method POST -Body $body | ConvertTo-Json -Depth 5
```

### A.5 Chat via API (OpenAI-compatible)

```powershell
$headers = @{
  "Authorization"    = "Bearer <YOUR_GATEWAY_TOKEN>"
  "X-GoClaw-User-Id" = "admin@local"
  "Content-Type"     = "application/json"
}
$body = '{
  "model": "my-assistant",
  "messages": [
    {"role": "user", "content": "Hello! What can you do?"}
  ]
}'
Invoke-RestMethod -Uri "http://localhost:18790/v1/chat/completions" `
  -Headers $headers -Method POST -Body $body | ConvertTo-Json -Depth 5
```

### A.6 Delete agent

```powershell
$headers = @{
  "Authorization"    = "Bearer <YOUR_GATEWAY_TOKEN>"
  "X-GoClaw-User-Id" = "admin@local"
}
Invoke-RestMethod -Uri "http://localhost:18790/v1/agents/<AGENT_ID>" `
  -Headers $headers -Method DELETE
```

> **Gotchas for API users:**
> - Provider type must be `openai_compat` (not `openai`)
> - `agent_key` must be a valid slug (lowercase, numbers, hyphens only)
> - Use `X-GoClaw-User-Id` (not `X-User-ID`) for agent/chat endpoints
> - Set `"model"` in chat request to your `agent_key`, not the LLM model name

---

## Appendix B: API Quick Reference

All endpoints require: `Authorization: Bearer <GOCLAW_GATEWAY_TOKEN>`

| Method | Endpoint | Description | Extra Header |
|--------|----------|-------------|--------------|
| GET | `/health` | Health check | — |
| GET | `/v1/providers` | List providers | — |
| POST | `/v1/providers` | Create provider | — |
| GET | `/v1/providers/{id}/models` | List models | — |
| POST | `/v1/providers/{id}/verify` | Test provider | — |
| DELETE | `/v1/providers/{id}` | Delete provider | — |
| GET | `/v1/agents` | List agents | `X-GoClaw-User-Id` |
| POST | `/v1/agents` | Create agent | `X-GoClaw-User-Id` |
| PUT | `/v1/agents/{id}` | Update agent | `X-GoClaw-User-Id` |
| DELETE | `/v1/agents/{id}` | Delete agent | `X-GoClaw-User-Id` |
| POST | `/v1/chat/completions` | Chat (OpenAI-compat) | `X-GoClaw-User-Id` |
| GET | `/v1/skills` | List skills | — |
| GET | `/v1/tools/builtin` | List tools (32) | — |
| GET | `/v1/channels/instances` | List channels | — |
| POST | `/v1/mcp/servers` | Add MCP server | — |
| GET | `/v1/traces` | List traces | — |
| GET | `/v1/usage/summary` | Usage stats | — |
| GET | `/docs` | Swagger UI | — |

---

## Next Steps

After the initial setup is working:

1. **Connect messaging channels** — Dashboard → Channels → Telegram, Discord, Slack, Zalo, WhatsApp, Feishu
2. **Add MCP servers** — Dashboard → MCP Servers → connect external tool servers
3. **Install skill dependencies** — Dashboard → Skills → click "Install Dependencies" for missing Python packages
4. **Create specialized agents** — Different agents with different models for different tasks
5. **Set up agent teams** — Dashboard → Teams → coordinated multi-agent workflows with shared task boards
6. **Configure browser automation** — Add `docker-compose.browser.yml` for web interaction tools
7. **Enable tracing** — Add `docker-compose.otel.yml` + `--build` for Jaeger tracing UI at http://localhost:16686

---

*Last updated: March 18, 2026*
