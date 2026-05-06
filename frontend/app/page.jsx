"use client";

import { useEffect, useMemo, useState } from "react";
import LiquidityChart from "../components/LiquidityChart";
import CashFlowChart from "../components/CashFlowChart";
import LCRGauge from "../components/LCRGauge";
import StressComparisonChart from "../components/StressComparisonChart";
import GlassCard from "@shared/components/GlassCard";
import GlassButton from "@shared/components/GlassButton";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import { API_BASE, executeAction, fetchConfig, fetchSnapshot, injectOutflowSpike } from "@shared/lib/api";
import { useRouter } from "next/navigation";

const views = ["command", "engines", "events", "stress"];
const modeLabels = {
  normal: "Normal",
  stress: "Stress",
  crisis: "Crisis"
};

export default function DashboardPage() {
  const [view, setView] = useState("command");
  const [mode, setMode] = useState("normal");
  const [scenario, setScenario] = useState("bank_run");
  const [config, setConfig] = useState(null);
  const [snapshot, setSnapshot] = useState(null);
  const [clock, setClock] = useState("");
  const [auditLine, setAuditLine] = useState("All actions are recorded with event lineage.");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  };

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    setClock(new Date().toLocaleTimeString());
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchConfig()
      .then(setConfig)
      .catch((err) => {
        if (err.message === "Unauthorized") {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setError(err.message);
        }
      });
  }, [router]);

  useEffect(() => {
    let closed = false;
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchSnapshot(mode, scenario)
      .then((data) => {
        if (!closed) setSnapshot(data);
      })
      .catch((err) => {
        if (err.message === "Unauthorized") {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setError(err.message);
        }
      });

    const stream = new EventSource(`${API_BASE}/api/stream?mode=${mode}&scenario=${scenario}&token=${token}`);
    stream.addEventListener("snapshot", (event) => {
      setSnapshot(JSON.parse(event.data));
      setError("");
    });
    stream.onerror = () => setError("Live stream disconnected. Check that the Express backend is running.");

    return () => {
      closed = true;
      stream.close();
    };
  }, [mode, scenario, router]);

  const topAction = snapshot?.recommendations?.[0]?.action ?? "no_action";
  const scenarioLabel = config?.scenarios?.[scenario]?.label ?? "Bank Run";
  const riskClass = snapshot?.riskLabel === "Critical" ? "bg-red/15 text-red" : snapshot?.riskLabel === "Watch" ? "bg-amber/20 text-amber" : "bg-green/15 text-green";

  const metrics = useMemo(() => {
    if (!snapshot) return [];
    return [
      ["Cash Position", money(snapshot.metrics.cash), `${signedPercent((snapshot.metrics.net / 18.4) * 100)} intraday`],
      ["LCR", percent(snapshot.metrics.lcr), "Regulatory floor: 100%"],
      ["NSFR", percent(snapshot.metrics.nsfr), "Stable funding view"],
      ["Survival Days", snapshot.metrics.survivalDays, `${scenarioLabel}: ${snapshot.projection.survivalDays} days`]
    ];
  }, [scenarioLabel, snapshot]);

  async function handleSpike() {
    const result = await injectOutflowSpike(mode, scenario);
    setSnapshot(result.snapshot);
  }

  async function handleExecute() {
    const result = await executeAction(topAction);
    setAuditLine(`${result.auditId}: ${result.action} ${result.status} with lineage ${result.lineageEvent}.`);
  }

  if (!config || !snapshot) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-bg px-6">
        <GlassCard>
          <p className="font-bold">Starting Liquidity Intelligence Platform</p>
          <p className="mt-2 text-sm text-muted">{error || "Loading backend state..."}</p>
        </GlassCard>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <Sidebar view={view} setView={setView} mode={mode} setMode={setMode} config={config} />
      <Topbar clock={clock} mode={mode} scenarioLabel={scenarioLabel} onLogout={handleLogout} />
      <main className="ml-60 mt-16 p-6">
        {error ? <GlassCard className="mb-4 border-l-red glass-border"><p className="text-sm text-red">{error}</p></GlassCard> : null}

        <section className="mb-6 grid grid-cols-4 gap-4 max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1" aria-label="Liquidity metrics">
          {metrics.map(([label, value, detail]) => (
            <MetricCard key={label} label={label} value={value} detail={detail} />
          ))}
        </section>

        {view === "command" ? (
          <section className="grid gap-6">
            <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(320px,0.85fr)] gap-6 max-[1080px]:grid-cols-1">
              <GlassCard
                title="Liquidity Horizon"
                subtitle="Net cash gaps across regulatory time buckets."
                action={<StatusBadge status={snapshot.riskLabel} />}
              >
                <LiquidityChart buckets={config.buckets} values={snapshot.metrics.gaps} title="Net Gap" />
              </GlassCard>

              <GlassCard title="Decision Queue" subtitle="Recommended actions under uncertainty.">
                <div className="grid gap-3">
                  {snapshot.recommendations.map((item) => (
                    <GlassCard key={item.action} className="p-3">
                      <div className="font-semibold text-sm text-text">{item.action}</div>
                      <div className="text-sm text-muted">{item.detail}</div>
                    </GlassCard>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
              <GlassCard title="Alerting System">
                <div className="grid gap-3">
                  {snapshot.alerts.map((alert) => (
                    <GlassCard
                      key={alert.name}
                      className={`p-3 border-l-4 ${
                        alert.severity === "critical" ? "border-l-red" :
                        alert.severity === "warning" ? "border-l-amber" : "border-l-green"
                      }`}
                    >
                      <div className="font-semibold text-sm text-text">{alert.name}</div>
                      <div className="text-sm text-muted">{alert.severity.toUpperCase()} - {alert.detail}</div>
                    </GlassCard>
                  ))}
                </div>
              </GlassCard>

              <GlassCard title="Data Sources">
                <div className="grid grid-cols-2 gap-3 max-[720px]:grid-cols-1">
                  {config.sources.map((source) => (
                    <GlassCard key={source.name} className="p-4 min-h-20">
                      <div className="font-semibold text-sm text-text">{source.name}</div>
                      <div className="text-sm text-muted">{source.data}</div>
                      <div className="mt-2 text-xs font-bold text-green">{source.mode}</div>
                    </GlassCard>
                  ))}
                </div>
              </GlassCard>

              <GlassCard title="Automation">
                <div className="grid gap-4">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-text">Semi-auto approval</span>
                    <input className="h-5 w-10 accent-green" type="checkbox" />
                  </label>
                  <GlassButton onClick={handleExecute} variant="primary" className="w-full">
                    Execute Top Action
                  </GlassButton>
                  <p className="text-sm text-muted">{auditLine}</p>
                </div>
              </GlassCard>
            </div>
          </section>
        ) : null}

        {view === "engines" ? (
          <section className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
            {config.engines.map((engine) => (
              <GlassCard key={engine.name} title={engine.name} subtitle="Active service module" className="min-h-36">
                <ul className="mt-3 list-disc pl-5 text-sm text-muted">
                  {engine.functions.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </GlassCard>
            ))}
          </section>
        ) : null}

        {view === "events" ? (
          <GlassCard
            title="Normalized Financial Events"
            subtitle="Common schema from Kafka-style stream and batch feeds."
            action={<GlassButton onClick={handleSpike}>Inject Outflow Spike</GlassButton>}
          >
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse">
                <thead>
                  <tr className="text-left text-xs uppercase text-muted">
                    <th className="border-b border-border p-3">Event ID</th>
                    <th className="border-b border-border p-3">Time</th>
                    <th className="border-b border-border p-3">Entity</th>
                    <th className="border-b border-border p-3">Flow</th>
                    <th className="border-b border-border p-3">Amount</th>
                    <th className="border-b border-border p-3">Source</th>
                    <th className="border-b border-border p-3">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.events.map((event) => (
                    <tr key={event.event_id} className="text-sm hover:bg-[rgba(255,255,255,0.08)]">
                      <td className="border-b border-border p-3 text-text">{event.event_id}</td>
                      <td className="border-b border-border p-3 text-text">{new Date(event.timestamp).toLocaleTimeString()}</td>
                      <td className="border-b border-border p-3 text-text">{event.entity_id}</td>
                      <td className="border-b border-border p-3 text-text">{event.flow_type}</td>
                      <td className="border-b border-border p-3 text-text">{money(event.amount)}</td>
                      <td className="border-b border-border p-3 text-text">{event.source_system}</td>
                      <td className="border-b border-border p-3 text-text">{event.confidence_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        ) : null}

        {view === "stress" ? (
          <section className="grid grid-cols-[minmax(320px,0.85fr)_minmax(0,1.5fr)] gap-6 max-[1080px]:grid-cols-1">
            <GlassCard title="Stress Scenario">
              <div className="grid gap-3">
                {Object.entries(config.scenarios).map(([key, item]) => (
                  <GlassCard
                    key={key}
                    className={`p-4 cursor-pointer ${scenario === key ? "glass-2" : "glass-1"}`}
                    onClick={() => setScenario(key)}
                  >
                    <div className="font-semibold text-sm text-text">{item.label}</div>
                    <div className="text-sm text-muted">Outflow {item.outflow.toFixed(2)}x, haircut {Math.round(item.haircut * 100)}%</div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>

            <GlassCard
              title="Scenario Impact"
              subtitle="Projected LCR and liquidity gap deterioration."
              action={<StatusBadge status="critical" />}
            >
              <StressComparisonChart
                buckets={config.buckets}
                normalGaps={snapshot.metrics.gaps}
                stressGaps={snapshot.projection.gaps}
              />
            </GlassCard>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function money(value) {
  return `$${Math.abs(Number(value)).toFixed(1)}B`;
}

function percent(value) {
  return `${Math.round(Number(value))}%`;
}

function signedPercent(value) {
  const number = Number(value);
  return `${number < 0 ? "-" : "+"}${Math.abs(number).toFixed(1)}%`;
}
