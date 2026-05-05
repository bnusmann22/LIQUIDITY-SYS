import cors from "cors";
import express from "express";
import {
  addEvent,
  executeTopAction,
  getConfig,
  getSnapshot,
  normalizeMode,
  normalizeScenario
} from "./liquidityModel.js";

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "liquidity-backend", timestamp: new Date().toISOString() });
});

app.get("/api/config", (req, res) => {
  res.json(getConfig());
});

app.get("/api/state", (req, res) => {
  res.json(getSnapshot(req.query.mode, req.query.scenario));
});

app.post("/api/events/spike", (req, res) => {
  const event = addEvent(true);
  res.status(201).json({ event, snapshot: getSnapshot(req.body?.mode, req.body?.scenario) });
});

app.post("/api/actions/execute", (req, res) => {
  const action = typeof req.body?.action === "string" ? req.body.action : "no_action";
  res.status(202).json(executeTopAction(action));
});

app.get("/api/stream", (req, res) => {
  const mode = normalizeMode(req.query.mode);
  const scenario = normalizeScenario(req.query.scenario);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const send = () => {
    addEvent(false);
    res.write(`event: snapshot\n`);
    res.write(`data: ${JSON.stringify(getSnapshot(mode, scenario))}\n\n`);
  };

  send();
  const interval = setInterval(send, 2600);
  req.on("close", () => clearInterval(interval));
});

app.listen(port, () => {
  console.log(`Liquidity backend running on http://localhost:${port}`);
});
