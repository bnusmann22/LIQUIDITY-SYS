import {
  addEvent,
  executeTopAction,
  getConfig,
  getSnapshot,
  normalizeMode,
  normalizeScenario
} from "../models/liquidityModel.js";

export const getHealth = (req, res) => {
  res.json({ ok: true, service: "liquidity-backend", timestamp: new Date().toISOString() });
};

export const getConfiguration = (req, res) => {
  res.json(getConfig());
};

export const getState = (req, res) => {
  res.json(getSnapshot(req.query.mode, req.query.scenario));
};

export const triggerSpikeEvent = (req, res) => {
  const event = addEvent(true);
  res.status(201).json({ event, snapshot: getSnapshot(req.body?.mode, req.body?.scenario) });
};

export const executeAction = (req, res) => {
  const action = typeof req.body?.action === "string" ? req.body.action : "no_action";
  res.status(202).json(executeTopAction(action));
};

export const streamUpdates = (req, res) => {
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
};
