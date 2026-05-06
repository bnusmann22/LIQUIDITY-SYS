"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "@shared/lib/api";
import GlassCard from "@shared/components/GlassCard";
import GlassButton from "@shared/components/GlassButton";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginApi(username, password);
      localStorage.setItem("token", data.token);
      // Set cookie for middleware (expires in 8 hours like JWT)
      document.cookie = `token=${data.token}; path=/; max-age=${8 * 60 * 60}; samesite=strict`;
      router.push("/");
    } catch (err) {
      setError(err.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-md">
        <GlassCard title="LIQUIDITY SYS Authentication">
          <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
            {error && <div className="text-red text-sm border-l-2 border-red pl-2">{error}</div>}
            
            <div className="flex flex-col gap-1">
              <label className="text-sm text-muted">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded p-2 text-text outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-muted">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded p-2 text-text outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors"
                required
              />
            </div>

            <GlassButton type="submit" variant="primary" className="mt-2 w-full" disabled={loading}>
              {loading ? "Authenticating..." : "Login"}
            </GlassButton>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
