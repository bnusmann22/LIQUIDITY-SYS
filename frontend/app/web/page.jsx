import Link from 'next/link';
import GlassCard from '../../components/GlassCard';

export default function LandingPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-black text-text leading-tight">
          Liquidity Intelligence Platform
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          Real-time decision system for liquidity management under uncertainty.
          Monitor cash flows, predict gaps, and execute automated actions.
        </p>
        <Link href="/" className="inline-block glass-1 glass-border px-8 py-4 rounded-lg text-text hover:glass-2 transition-all font-semibold">
          Access Dashboard
        </Link>
      </section>

      {/* Key Metrics */}
      <section className="grid grid-cols-4 gap-6 max-[720px]:grid-cols-2">
        <GlassCard className="text-center">
          <div className="text-3xl font-bold text-green">$2.4T</div>
          <div className="text-muted">Assets Under Management</div>
        </GlassCard>
        <GlassCard className="text-center">
          <div className="text-3xl font-bold text-green">200ms</div>
          <div className="text-muted">Decision Latency</div>
        </GlassCard>
        <GlassCard className="text-center">
          <div className="text-3xl font-bold text-green">99.9%</div>
          <div className="text-muted">Uptime</div>
        </GlassCard>
        <GlassCard className="text-center">
          <div className="text-3xl font-bold text-green">24/7</div>
          <div className="text-muted">Monitoring</div>
        </GlassCard>
      </section>

      {/* Features Preview */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Core Capabilities</h2>
        <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
          <GlassCard title="Real-time Monitoring" className="text-center">
            <p className="text-muted">Continuous surveillance of cash positions, inflows, and outflows with millisecond precision.</p>
          </GlassCard>
          <GlassCard title="Predictive Analytics" className="text-center">
            <p className="text-muted">Machine learning models forecast liquidity gaps and identify potential stress scenarios.</p>
          </GlassCard>
          <GlassCard title="Automated Actions" className="text-center">
            <p className="text-muted">Execute liquidity management decisions automatically based on predefined rules and AI recommendations.</p>
          </GlassCard>
        </div>
      </section>

      {/* Architecture Overview */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">System Architecture</h2>
        <GlassCard className="p-8">
          <div className="text-center space-y-4">
            <div className="text-lg">Data Sources → Event Processing → Engines → Decisions</div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="glass-1 glass-border p-4 rounded-lg">
                <div className="font-semibold">Sources</div>
                <div className="text-muted">Banks, Payments, Markets</div>
              </div>
              <div className="glass-1 glass-border p-4 rounded-lg">
                <div className="font-semibold">Events</div>
                <div className="text-muted">Normalized Financial Events</div>
              </div>
              <div className="glass-1 glass-border p-4 rounded-lg">
                <div className="font-semibold">Engines</div>
                <div className="text-muted">Time Bucket, Liquidity, Risk, Forecasting</div>
              </div>
              <div className="glass-1 glass-border p-4 rounded-lg">
                <div className="font-semibold">Decisions</div>
                <div className="text-muted">Actions & Recommendations</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}