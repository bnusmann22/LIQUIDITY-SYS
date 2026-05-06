'use client';

import Link from 'next/link';
import GlassCard from '@shared/components/GlassCard';

const getDashboardUrl = () => {
  // Check if we're in production (Vercel deployment)
  const isProduction = typeof window !== 'undefined' &&
    (window.location.hostname.includes('vercel.app') ||
     window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');

  return isProduction
    ? 'https://liquidity-system.vercel.app/'
    : 'http://localhost:3000';
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-8 sm:py-16">
      <div className="w-full max-w-4xl space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text leading-tight">
            Liquidity Intelligence Platform
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-md sm:max-w-xl mx-auto px-4 sm:px-0">
            Real-time decision system for liquidity management under uncertainty.
            Monitor cash flows, predict gaps, and execute automated actions.
          </p>
          <Link href={getDashboardUrl()} target="_blank" className="inline-block glass-1 glass-border px-8 py-4 rounded-lg text-text hover:glass-2 transition-all font-semibold text-sm sm:text-base min-h-[44px]">
            Access Dashboard
          </Link>
        </section>

        {/* Key Metrics */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <GlassCard className="text-center p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-green">$2.4T</div>
            <div className="text-xs md:text-sm text-muted">Assets Under Management</div>
          </GlassCard>
          <GlassCard className="text-center p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-green">200ms</div>
            <div className="text-xs md:text-sm text-muted">Decision Latency</div>
          </GlassCard>
          <GlassCard className="text-center p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-green">99.9%</div>
            <div className="text-xs md:text-sm text-muted">Uptime</div>
          </GlassCard>
          <GlassCard className="text-center p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-green">24/7</div>
            <div className="text-xs md:text-sm text-muted">Monitoring</div>
          </GlassCard>
        </section>

        {/* Features Preview */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Core Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <GlassCard title="Real-time Monitoring" className="text-center p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-muted">Continuous surveillance of cash positions, inflows, and outflows with millisecond precision.</p>
            </GlassCard>
            <GlassCard title="Predictive Analytics" className="text-center p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-muted">Machine learning models forecast liquidity gaps and identify potential stress scenarios.</p>
            </GlassCard>
            <GlassCard title="Automated Actions" className="text-center p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-muted">Execute liquidity management decisions automatically based on predefined rules and AI recommendations.</p>
            </GlassCard>
          </div>
        </section>

        {/* Architecture Overview */}
        <section>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6">System Architecture</h2>
          <GlassCard className="p-4 sm:p-6">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="text-sm sm:text-base px-2">Data Sources → Event Processing → Engines → Decisions</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="glass-1 glass-border p-2 sm:p-3 rounded-lg">
                  <div className="font-semibold">Sources</div>
                  <div className="text-muted">Banks, Payments, Markets</div>
                </div>
                <div className="glass-1 glass-border p-2 sm:p-3 rounded-lg">
                  <div className="font-semibold">Events</div>
                  <div className="text-muted">Normalized Financial Events</div>
                </div>
                <div className="glass-1 glass-border p-2 sm:p-3 rounded-lg">
                  <div className="font-semibold">Engines</div>
                  <div className="text-muted">Time Bucket, Liquidity, Risk, Forecasting</div>
                </div>
                <div className="glass-1 glass-border p-2 sm:p-3 rounded-lg">
                  <div className="font-semibold">Decisions</div>
                  <div className="text-muted">Actions & Recommendations</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}