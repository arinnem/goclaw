const WebSocket = require("ws");

function sendRPC(ws, method, params) {
  return new Promise((resolve, reject) => {
    const id = String(Date.now() + Math.random());
    const frame = JSON.stringify({ type: "req", id, method, params });

    const handler = (raw) => {
      try {
        const msg = JSON.parse(raw.toString());
        if (msg.type === "res" && msg.id === id) {
          ws.removeListener("message", handler);
          if (!msg.ok) {
            reject(new Error(`${method}: ${msg.error?.message || JSON.stringify(msg.error)}`));
          } else {
            resolve(msg.payload);
          }
        }
      } catch (e) { /* ignore non-JSON */ }
    };
    ws.on("message", handler);
    ws.send(frame);
  });
}

const ws = new WebSocket("ws://localhost:3000/ws");
ws.on("open", async () => {
  try {
    await sendRPC(ws, "connect", { token: "17b7a471fbd76fc0dceb40dbb0334d6e", user_id: "admin@local" });
    const list = await sendRPC(ws, "agents.list", {});
    console.log(JSON.stringify(list.agents, null, 2));
  } catch(e) { console.error(e); }
  process.exit(0);
});
