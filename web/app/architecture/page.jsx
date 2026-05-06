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
    <div className="min-h-screen flex items-center justify-center px-8 py-16">
      <div className="w-full max-w-4xl space-y-8">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-black text-text">System Architecture</h1>
          <p className="text-base text-muted max-w-2xl mx-auto">
            A modular, event-driven architecture that processes financial data streams
            in real-time to provide actionable liquidity intelligence.
          </p>
        </section>

        {/* Data Flow Diagram */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-center">Data Flow Architecture</h2>
          <GlassCard className="p-6">
            <div className="text-center space-y-6">
              <div className="grid grid-cols-5 gap-3 items-center max-[1080px]:grid-cols-3 max-[720px]:grid-cols-1">
                <div className="glass-1 glass-border p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-green mb-2">1</div>
                  <div className="font-semibold text-sm">Sources</div>
                  <div className="text-xs text-muted">Banks, Markets, Payments</div>
                </div>
                <ArrowRight className="text-green max-[1080px]:rotate-90" size={24} />
                <div className="glass-1 glass-border p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-green mb-2">2</div>
                  <div className="font-semibold text-sm">Events</div>
                  <div className="text-xs text-muted">Normalize & Enrich</div>
                </div>
                <ArrowRight className="text-green max-[1080px]:rotate-90" size={24} />
                <div className="glass-1 glass-border p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-green mb-2">3</div>
                  <div className="font-semibold text-sm">Engines</div>
                  <div className="text-xs text-muted">Analyze & Predict</div>
                </div>
                <ArrowRight className="text-green max-[1080px]:hidden" size={24} />
                <div className="glass-1 glass-border p-4 rounded-lg text-center col-span-2 max-[1080px]:col-span-1">
                  <div className="text-xl font-bold text-green mb-2">4</div>
                  <div className="font-semibold text-sm">Decisions & Actions</div>
                  <div className="text-xs text-muted">Execute & Monitor</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Engine Details */}
        <section>
          <h2 className="text-xl font-bold mb-6">Engine Components</h2>
          <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
            {engines.map((engine) => (
              <GlassCard key={engine.name} title={engine.name} className="p-4">
                <p className="text-sm text-muted mb-3">{engine.description}</p>
                <ul className="space-y-1">
                  {engine.details.map((detail) => (
                    <li key={detail} className="flex items-center text-xs">
                      <div className="w-1.5 h-1.5 bg-green rounded-full mr-2"></div>
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
          <h2 className="text-xl font-bold mb-6">Technical Specifications</h2>
          <div className="grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
            <GlassCard title="Performance" className="text-center p-4">
              <div className="text-xl font-bold text-green mb-2">200ms</div>
              <div className="text-sm text-muted">Average decision latency</div>
            </GlassCard>
            <GlassCard title="Scalability" className="text-center p-4">
              <div className="text-xl font-bold text-green">10M+</div>
              <div className="text-sm text-muted">Events processed per hour</div>
            </GlassCard>
            <GlassCard title="Reliability" className="text-center p-4">
              <div className="text-xl font-bold text-green">99.9%</div>
              <div className="text-sm text-muted">System uptime</div>
            </GlassCard>
          </div>
        </section>
      </div>
    </div>
  );
}