export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function fetchConfig() {
  const response = await fetch(`${API_BASE}/api/config`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load platform configuration");
  return response.json();
}

export async function fetchSnapshot(mode, scenario) {
  const response = await fetch(`${API_BASE}/api/state?mode=${mode}&scenario=${scenario}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load liquidity snapshot");
  return response.json();
}

export async function injectOutflowSpike(mode, scenario) {
  const response = await fetch(`${API_BASE}/api/events/spike`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, scenario })
  });
  if (!response.ok) throw new Error("Unable to inject outflow spike");
  return response.json();
}

export async function executeAction(action) {
  const response = await fetch(`${API_BASE}/api/actions/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action })
  });
  if (!response.ok) throw new Error("Unable to execute action");
  return response.json();
}
