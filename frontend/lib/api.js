export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

function getHeaders(customHeaders = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = { ...customHeaders };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function loginApi(username, password) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) throw new Error("Invalid credentials");
  return response.json();
}

export async function fetchConfig() {
  const response = await fetch(`${API_BASE}/api/config`, { cache: "no-store", headers: getHeaders() });
  if (response.status === 401) throw new Error("Unauthorized");
  if (!response.ok) throw new Error("Unable to load platform configuration");
  return response.json();
}

export async function fetchSnapshot(mode, scenario) {
  const response = await fetch(`${API_BASE}/api/state?mode=${mode}&scenario=${scenario}`, { cache: "no-store", headers: getHeaders() });
  if (response.status === 401) throw new Error("Unauthorized");
  if (!response.ok) throw new Error("Unable to load liquidity snapshot");
  return response.json();
}

export async function injectOutflowSpike(mode, scenario) {
  const response = await fetch(`${API_BASE}/api/events/spike`, {
    method: "POST",
    headers: getHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ mode, scenario })
  });
  if (response.status === 401) throw new Error("Unauthorized");
  if (!response.ok) throw new Error("Unable to inject outflow spike");
  return response.json();
}

export async function executeAction(action) {
  const response = await fetch(`${API_BASE}/api/actions/execute`, {
    method: "POST",
    headers: getHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ action })
  });
  if (response.status === 401) throw new Error("Unauthorized");
  if (!response.ok) throw new Error("Unable to execute action");
  return response.json();
}
