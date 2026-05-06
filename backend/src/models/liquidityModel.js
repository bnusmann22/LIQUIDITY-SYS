export const buckets = ["intraday", "1-7 days", "8-30 days", "1-3 months", "3-12 months"];

export const sources = [
  { name: "core_banking", data: "transactions, balances, accounts", mode: "stream" },
  { name: "payment_systems", data: "transfers, withdrawals, settlements", mode: "stream" },
  { name: "treasury", data: "assets, liabilities, funding positions", mode: "batch + stream" },
  { name: "external_markets", data: "interest rates, bond prices, fx rates", mode: "stream" }
];

export const engines = [
  { name: "Time Bucket Engine", functions: ["Intraday distribution", "Horizon mapping", "Flow maturity view"] },
  { name: "Liquidity Engine", functions: ["Cash position", "Liquidity buffer", "HQLA classification", "Haircut application"] },
  { name: "Risk Engine", functions: ["LCR", "NSFR", "Net cash gap", "Funding concentration"] },
  { name: "Forecasting Engine", functions: ["Withdrawal prediction", "Deposit behavior", "Cash flow projection"] },
  { name: "Anomaly Detection", functions: ["Withdrawal spikes", "Unusual activity", "Funding drops"] },
  { name: "Stress Testing", functions: ["Bank run", "Market freeze", "Credit downgrade"] }
];

export const scenarios = {
  bank_run: { label: "Bank Run", outflow: 1.65, haircut: 0.18, survivalPenalty: 7 },
  market_freeze: { label: "Market Freeze", outflow: 1.35, haircut: 0.28, survivalPenalty: 5 },
  credit_downgrade: { label: "Credit Downgrade", outflow: 1.45, haircut: 0.22, survivalPenalty: 6 }
};

export const modeCopy = {
  normal: "Monitoring and optimization posture.",
  stress: "Real-time alerts and decision support posture.",
  crisis: "Automation and survival action posture."
};

const allowedModes = new Set(Object.keys(modeCopy));
const allowedScenarios = new Set(Object.keys(scenarios));

let sequence = 1024;
let auditCount = 0;
let eventLog = Array.from({ length: 14 }, () => createEvent());

export function normalizeMode(mode) {
  return allowedModes.has(mode) ? mode : "normal";
}

export function normalizeScenario(scenario) {
  return allowedScenarios.has(scenario) ? scenario : "bank_run";
}

export function createEvent(forceSpike = false) {
  const source = sources[Math.floor(Math.random() * sources.length)];
  const isOutflow = forceSpike || Math.random() > 0.46;
  const baseAmount = forceSpike ? 2.1 + Math.random() * 1.7 : 0.12 + Math.random() * 1.25;

  return {
    event_id: `evt_${sequence++}`,
    timestamp: new Date().toISOString(),
    entity_id: `entity_${Math.floor(100 + Math.random() * 899)}`,
    amount: Number(baseAmount.toFixed(2)),
    currency: "USD",
    flow_type: isOutflow ? "outflow" : "inflow",
    source_system: source.name,
    confidence_score: Number((0.73 + Math.random() * 0.26).toFixed(2))
  };
}

export function addEvent(forceSpike = false) {
  eventLog = [createEvent(forceSpike), ...eventLog].slice(0, 40);
  return eventLog[0];
}

export function getConfig() {
  return { buckets, sources, engines, scenarios, modes: modeCopy };
}

export function getSnapshot(modeInput = "normal", scenarioInput = "bank_run") {
  const mode = normalizeMode(modeInput);
  const selectedScenario = normalizeScenario(scenarioInput);
  const state = computeState(mode);
  const projection = scenarioProjection(state, selectedScenario);

  return {
    generatedAt: new Date().toISOString(),
    mode,
    selectedScenario,
    metrics: state,
    projection,
    riskLabel: riskLabel(state),
    recommendations: recommendations(state, projection),
    alerts: alerts(state),
    events: eventLog.slice(0, 12)
  };
}

export function executeTopAction(action) {
  auditCount += 1;
  const topEvent = eventLog[0];
  return {
    auditId: `audit_${String(auditCount).padStart(4, "0")}`,
    action,
    lineageEvent: topEvent?.event_id ?? "none",
    status: "queued",
    timestamp: new Date().toISOString()
  };
}

function computeState(mode) {
  const modeStress = mode === "normal" ? 1 : mode === "stress" ? 1.18 : 1.42;
  const recent = eventLog.slice(0, 12);
  const inflows = recent.filter((event) => event.flow_type === "inflow").reduce((sum, event) => sum + event.amount, 0);
  const outflows = recent.filter((event) => event.flow_type === "outflow").reduce((sum, event) => sum + event.amount, 0) * modeStress;
  const net = inflows - outflows;
  const cash = 18.4 + net;
  const hqla = 25.8 * (mode === "crisis" ? 0.88 : mode === "stress" ? 0.94 : 1);
  const stressedOutflow = Math.max(12, outflows * 2.8 + 10.5);
  const lcr = (hqla / stressedOutflow) * 100;
  const nsfr = 112 - Math.max(0, outflows - inflows) * 2.6 - (mode === "crisis" ? 9 : mode === "stress" ? 4 : 0);
  const survivalDays = Math.max(2, Math.round(cash / Math.max(0.75, outflows / 5)));
  const gaps = buckets.map((bucket, index) => {
    const drift = [net, net * 0.72, net * 0.48, net * 0.25, net * 0.14][index];
    const base = [2.8, 1.4, -0.8, 0.9, 2.2][index];
    return Number((base + drift - index * modeStress * 0.45).toFixed(2));
  });

  return { inflows, outflows, net, cash, hqla, lcr, nsfr, survivalDays, gaps };
}

function scenarioProjection(state, selectedScenario) {
  const scenario = scenarios[selectedScenario];
  const projectedOutflow = state.outflows * scenario.outflow + 8;
  const projectedHqla = state.hqla * (1 - scenario.haircut);

  return {
    lcr: (projectedHqla / projectedOutflow) * 100,
    survivalDays: Math.max(1, state.survivalDays - scenario.survivalPenalty),
    gaps: state.gaps.map((gap, index) => Number((gap - scenario.outflow * (index + 1.2)).toFixed(2)))
  };
}

function riskLabel(state) {
  if (state.lcr < 95 || state.gaps[0] < -2) return "Critical";
  if (state.lcr < 110 || state.gaps[0] < 0) return "Watch";
  return "Stable";
}

function recommendations(state, projection) {
  return [
    state.lcr < 105
      ? { action: "increase_liquidity_buffer", detail: "Raise HQLA buffer before the next settlement cycle." }
      : { action: "rebalance_funding_sources", detail: "Reduce concentration and improve stable funding mix." },
    state.gaps[0] < 0
      ? { action: "delay_noncritical_outflows", detail: "Hold discretionary payments until intraday gap recovers." }
      : { action: "optimize_cash_position", detail: "Keep excess funds in near-cash instruments." },
    projection.survivalDays < 7
      ? { action: "access_central_bank_facility", detail: "Pre-stage collateral for emergency liquidity access." }
      : { action: "monitor_behavioral_flows", detail: "Watch deposit behavior and high-confidence withdrawal signals." }
  ];
}

function alerts(state) {
  const items = [];
  if (state.lcr < 100) items.push({ severity: "critical", name: "LCR_breach", detail: `Current LCR is ${Math.round(state.lcr)}%.` });
  if (state.gaps[0] < 0) items.push({ severity: "warning", name: "negative_intraday_gap", detail: `Intraday gap is ${signedMoney(state.gaps[0])}.` });
  if (state.outflows > state.inflows * 1.35) items.push({ severity: "warning", name: "high_outflow_velocity", detail: "Recent outflows exceed modeled inflows." });
  if (!items.length) items.push({ severity: "info", name: "liquidity_buffer_calculation", detail: "Liquidity buffer remains above internal floor." });
  return items;
}

function signedMoney(value) {
  return `${value < 0 ? "-" : "+"}$${Math.abs(value).toFixed(1)}B`;
}
