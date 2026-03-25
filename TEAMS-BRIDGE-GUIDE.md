# MS Teams → GoClaw: Power Automate Bridge Guide

> Connect Microsoft Teams to your GoClaw agent. Users message in Teams → Power Automate forwards to GoClaw → AI response returns to Teams.

---

## Architecture

```
┌──────────┐     ┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│ MS Teams │────▶│ Power        │────▶│  Cloudflare    │────▶│ GoClaw       │
│  (user)  │◀────│ Automate     │◀────│  Tunnel        │◀────│ localhost    │
│          │     │ (cloud)      │     │                │     │ :18790       │
└──────────┘     └──────────────┘     └────────────────┘     └──────────────┘
```

### Why GoClaw, not 9Router directly?

| | 9Router (`r9ujq8z.9router.com/v1`) | GoClaw (`localhost:18790`) |
|---|---|---|
| Chat completions | ✅ Raw LLM only | ✅ With agent context |
| Agent memory | ❌ | ✅ Remembers across chats |
| Session continuity | ❌ | ✅ `session_key` tracking |
| Tools (32 built-in) | ❌ | ✅ web_search, files, etc. |
| Skills | ❌ | ✅ docx, pdf, xlsx, etc. |
| System prompts | ❌ Manual | ✅ Per-agent config |

**Bottom line**: 9Router is the LLM engine; GoClaw adds agents, memory, tools. You need GoClaw for the full experience.

---

## Part 1: Set Up Cloudflare Tunnel

This exposes your local GoClaw (`localhost:18790`) to the internet so Power Automate can reach it.

### 1.1 Install cloudflared

```powershell
# Option A: winget (recommended)
winget install --id Cloudflare.cloudflared

# Option B: Download manually
# https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
```

Verify:
```powershell
cloudflared --version
```

### 1.2 Quick Tunnel (no Cloudflare account needed)

This creates an instant public URL — no account, no DNS setup:

```powershell
cloudflared tunnel --url http://localhost:18790
```

**Output** (example):
```
INF +----------------------------+
INF |  Your quick Tunnel has been created! Visit it at:
INF |  https://abc123-random-name.trycloudflare.com
INF +----------------------------+
```

> **Copy this URL** — you'll need it for Power Automate. The URL changes each time you restart cloudflared.

### 1.3 Verify the tunnel

Open a **new** PowerShell window and test:

```powershell
# Replace with YOUR tunnel URL
Invoke-RestMethod -Uri "https://abc123-random-name.trycloudflare.com/health"

# Expected: { "status": "ok", "protocol": 3 }
```

### 1.4 Persistent Tunnel (optional, for production)

For a permanent URL that doesn't change:

1. Sign up at https://dash.cloudflare.com
2. Go to **Zero Trust** → **Networks** → **Tunnels** → **Create a tunnel**
3. Follow the wizard to install the connector and configure a hostname
4. Point the hostname to `http://localhost:18790`

> **For now, the quick tunnel (`1.2`) is perfect for testing.**

---

## Part 2: Deploy the Relay Script

The relay script (`teams-goclaw-relay.ps1`) handles:
- Stripping Teams HTML from messages
- Resolving agent IDs
- Calling GoClaw's wake API
- Formatting responses for Teams

### 2.1 Test the relay locally

Before setting up Power Automate, verify the relay works:

```powershell
.\test-teams-bridge.ps1 -Agent "research-analyst" -Message "Hello, xin chào!"
```

Expected output:
```
[OK] Agent resolved: Chiến Lược Gia (uuid-here)
[OK] Response received in 5.2s
----- AI Response -----
Xin chào! Tôi là Chiến Lược Gia...
```

### 2.2 Test via the tunnel

```powershell
.\test-teams-bridge.ps1 -Agent "research-analyst" `
  -Message "What is 2+2?" `
  -GatewayUrl "https://abc123-random-name.trycloudflare.com"
```

---

## Part 3: Set Up Power Automate Flow

### 3.1 Create a new flow

1. Go to https://make.powerautomate.com
2. Click **+ Create** → **Automated cloud flow**
3. Name: `GoClaw Teams Bridge`
4. Trigger: search for **"When a new channel message is added"** (Microsoft Teams)
5. Click **Create**

### 3.2 Configure the trigger

| Setting | Value |
|---------|-------|
| **Team** | Select your Team |
| **Channel** | Select the channel for GoClaw bot |
| **Message Type** | `Message` |

> **Tip**: Create a dedicated channel like `#goclaw-bot` to avoid triggering on every message.

### 3.3 Add condition: Skip bot's own messages

1. Click **+ New step** → **Condition**
2. Set: `triggerOutputs()?['body/from/application']` **is equal to** (leave blank/null)
3. In the **If yes** branch, add the remaining steps below

This prevents infinite loops when the bot replies.

### 3.4 Add HTTP action (call GoClaw)

In the **If yes** branch:

1. Click **+ Add an action** → search **HTTP**
2. Configure:

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URI** | `https://<YOUR-TUNNEL-URL>/v1/agents/<AGENT_ID>/wake` |
| **Headers** | See below |
| **Body** | See below |

**Headers** (click "Show advanced options"):
```
Authorization: Bearer 17b7a471fbd76fc0dceb40dbb0334d6e
Content-Type: application/json
X-GoClaw-User-Id: teams-@{triggerOutputs()?['body/from/user/displayName']}
```

**Body**:
```json
{
  "message": "@{triggerOutputs()?['body/body/plainTextContent']}",
  "session_key": "teams-@{triggerOutputs()?['body/channelIdentity/channelId']}",
  "user_id": "teams-@{triggerOutputs()?['body/from/user/displayName']}"
}
```

**Timeout**: Under Settings (⋮ menu), set timeout to `PT3M` (3 minutes).

### 3.5 Get your Agent ID

You need the agent's **UUID**, not the key. Run:

```powershell
$headers = @{
  "Authorization"    = "Bearer 17b7a471fbd76fc0dceb40dbb0334d6e"
  "X-GoClaw-User-Id" = "admin@local"
}
$agent = Invoke-RestMethod -Uri "http://localhost:18790/v1/agents/research-analyst" `
  -Headers $headers -Method GET
Write-Output "Agent ID: $($agent.id)"
```

Copy this UUID into the HTTP action URI.

### 3.6 Add reply action

1. Click **+ Add an action** → search **"Reply with a message in a channel"** (Microsoft Teams)
2. Configure:

| Field | Value |
|-------|-------|
| **Team** | Same team as trigger |
| **Channel** | Same channel as trigger |
| **Message** | `@{body('HTTP')?['content']}` |
| **Message ID** | `@{triggerOutputs()?['body/id']}` (replies as thread) |

### 3.7 Add error handling

1. Click the **...** menu on the Reply action → **Configure run after**
2. Check: ✅ "is successful"
3. After the Reply, add a **parallel branch** for failures:
   - **Condition**: HTTP action failed
   - **Reply**: "⚠️ GoClaw is unavailable. Please try again later."

### 3.8 Save and test

1. Click **Save**
2. Go to your Teams channel and post: `Hello GoClaw!`
3. Wait ~30–60 seconds for the AI response
4. Check the flow run history in Power Automate for any errors

---

## Part 4: Troubleshooting

| Problem | Solution |
|---------|----------|
| **Flow doesn't trigger** | Verify Teams connector is authorized; check trigger channel matches |
| **HTTP 401 Unauthorized** | Verify `Authorization: Bearer <token>` in HTTP headers |
| **HTTP timeout** | Increase timeout to `PT5M`; or use a simpler agent without tools |
| **"agent not found"** | Use agent UUID (not key) in the URL; run the lookup command in 3.5 |
| **Tunnel URL changed** | Restart cloudflared; update the HTTP action URI |
| **Bot replies to itself** | Add the condition check in step 3.3 |
| **HTML in messages** | Use `body/body/plainTextContent` (not `body/body/content`) for plain text |

---

## Security Considerations

> [!WARNING]
> - The quick tunnel URL is **public**. Anyone with the URL can access your GoClaw API.
> - For production: use a **persistent Cloudflare Tunnel** with Cloudflare Access (SSO/MFA).
> - Rotate `GOCLAW_GATEWAY_TOKEN` periodically.
> - Consider adding IP allowlisting on the tunnel.

---

*Last updated: March 18, 2026*
