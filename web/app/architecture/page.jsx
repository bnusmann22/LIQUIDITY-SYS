import GlassCard from '../../../shared/components/GlassCard';
import { ArrowRight } from 'lucide-react';

const engines = [
  {
    name: 'Time Bucket Engine',
    description: 'Analyzes liquidity across regulatory time horizons (overnight, 1-6 days, 6-30 days, etc.)',
    details: ['LCR calculation', 'NSFR monitoring', 'Gap analysis', 'Maturity ladders']
  },
  {
    name: 'Liquidity Forecasting Engine',
    description: 'Predicts future cash positions using statistical models and machine learning',
    details: ['Time series analysis', 'Regression models', 'Monte Carlo simulation', 'Confidence bands']
  },
  {
    name: 'Risk Assessment Engine',
    description: 'Evaluates liquidity risk levels and triggers appropriate alerts',
    details: ['Threshold monitoring', 'Risk scoring', 'Alert generation', 'Severity classification']
  },
  {
    name: 'Anomaly Detection Engine',
    description: 'Identifies unusual patterns that may indicate liquidity issues',
    details: ['Statistical tests', 'Pattern matching', 'Correlation analysis', 'Outlier detection']
  },
  {
    name: 'Stress Testing Engine',
    description: 'Simulates extreme scenarios to test liquidity resilience',
    details: ['Scenario modeling', 'Shock propagation', 'Recovery analysis', 'Contingency planning']
  },
  {
    name: 'Decision Engine',
    description: 'Recommends and executes liquidity management actions',
    details: ['Rule evaluation', 'Action prioritization', 'Automated execution', 'Audit logging']
  }
];

export default function ArchitecturePage() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-black text-text">System Architecture</h1>
        <p className="text-lg text-muted max-w-3xl mx-auto">
          A modular, event-driven architecture that processes financial data streams
          in real-time to provide actionable liquidity intelligence.
        </p>
      </section>

      {/* Data Flow Diagram */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">Data Flow Architecture</h2>
        <GlassCard className="p-8">
          <div className="text-center space-y-8">
            <div className="grid grid-cols-5 gap-4 items-center max-[1080px]:grid-cols-3 max-[720px]:grid-cols-1">
              <div className="glass-1 glass-border p-6 rounded-lg text-center">
                <div className="text-2xl font-bold text-green mb-2">1</div>
                <div className="font-semibold">Sources</div>
                <div className="text-sm text-muted">Banks, Markets, Payments</div>
              </div>
              <ArrowRight className="text-green max-[1080px]:rotate-90" size={32} />
              <div className="glass-1 glass-border p-6 rounded-lg text-center">
                <div className="text-2xl font-bold text-green mb-2">2</div>
                <div className="font-semibold">Events</div>
                <div className="text-sm text-muted">Normalize & Enrich</div>
              </div>
              <ArrowRight className="text-green max-[1080px]:rotate-90" size={32} />
              <div className="glass-1 glass-border p-6 rounded-lg text-center">
                <div className="text-2xl font-bold text-green mb-2">3</div>
                <div className="font-semibold">Engines</div>
                <div className="text-sm text-muted">Analyze & Predict</div>
              </div>
              <ArrowRight className="text-green max-[1080px]:hidden" size={32} />
              <div className="glass-1 glass-border p-6 rounded-lg text-center col-span-2 max-[1080px]:col-span-1">
                <div className="text-2xl font-bold text-green mb-2">4</div>
                <div className="font-semibold">Decisions & Actions</div>
                <div className="text-sm text-muted">Execute & Monitor</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Engine Details */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Engine Components</h2>
        <div className="grid grid-cols-2 gap-6 max-[720px]:grid-cols-1">
          {engines.map((engine) => (
            <GlassCard key={engine.name} title={engine.name}>
              <p className="text-muted mb-4">{engine.description}</p>
              <ul className="space-y-2">
                {engine.details.map((detail) => (
                  <li key={detail} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green rounded-full mr-3"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Technical Specs */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Technical Specifications</h2>
        <div className="grid grid-cols-3 gap-6 max-[720px]:grid-cols-1">
          <GlassCard title="Performance" className="text-center">
            <div className="text-2xl font-bold text-green mb-2">200ms</div>
            <div className="text-muted">Average decision latency</div>
          </GlassCard>
          <GlassCard title="Scalability" className="text-center">
            <div className="text-2xl font-bold text-green">10M+</div>
            <div className="text-muted">Events processed per hour</div>
          </GlassCard>
          <GlassCard title="Reliability" className="text-center">
            <div className="text-2xl font-bold text-green">99.9%</div>
            <div className="text-muted">System uptime</div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}