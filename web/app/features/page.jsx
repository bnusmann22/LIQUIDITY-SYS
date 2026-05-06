import GlassCard from '../../../shared/components/GlassCard';
import { Clock, TrendingUp, AlertTriangle, BarChart3, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Time Bucket Engine',
    description: 'Regulatory time bucket analysis for LCR and NSFR compliance.',
    functions: ['Daily liquidity projections', 'Intraday gap monitoring', 'Regulatory reporting']
  },
  {
    icon: TrendingUp,
    title: 'Liquidity Forecasting',
    description: 'Predictive models for cash flow forecasting and gap analysis.',
    functions: ['Machine learning predictions', 'Scenario modeling', 'Confidence intervals']
  },
  {
    icon: AlertTriangle,
    title: 'Risk Assessment',
    description: 'Real-time risk evaluation with automated alerting system.',
    functions: ['Threshold monitoring', 'Risk score calculation', 'Alert prioritization']
  },
  {
    icon: BarChart3,
    title: 'Anomaly Detection',
    description: 'Identify unusual patterns in financial data streams.',
    functions: ['Statistical outlier detection', 'Pattern recognition', 'Event correlation']
  },
  {
    icon: Shield,
    title: 'Stress Testing',
    description: 'Simulate extreme market conditions and liquidity crises.',
    functions: ['Scenario generation', 'Impact analysis', 'Recovery planning']
  },
  {
    icon: Zap,
    title: 'Decision Automation',
    description: 'Execute liquidity management actions based on AI recommendations.',
    functions: ['Rule evaluation', 'Action prioritization', 'Automated execution', 'Audit logging']
  }
];

const dataSources = [
  'Real-time banking APIs',
  'Payment system feeds',
  'Market data providers',
  'Regulatory reporting systems',
  'Internal ledger databases'
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-16">
      <div className="w-full max-w-4xl space-y-8">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-black text-text">Platform Features</h1>
          <p className="text-base text-muted max-w-2xl mx-auto">
            Comprehensive liquidity intelligence powered by specialized engines
            working together to provide real-time insights and automated decision support.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6">Core Engines</h2>
          <div className="grid grid-cols-3 gap-4 max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <GlassCard key={feature.title} className="text-center p-4">
                  <Icon size={32} className="mx-auto mb-3 text-green" />
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted mb-3">{feature.description}</p>
                  <ul className="text-left space-y-1">
                    {feature.functions.map((func) => (
                      <li key={func} className="text-xs text-muted flex items-center">
                        <div className="w-1 h-1 bg-green rounded-full mr-2"></div>
                        {func}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6">Data Integration</h2>
          <GlassCard className="p-6">
            <p className="text-sm mb-4 text-center">
              Seamless integration with multiple data sources for comprehensive liquidity visibility.
            </p>
            <div className="grid grid-cols-3 gap-3 max-[720px]:grid-cols-1">
              {dataSources.map((source) => (
                <div key={source} className="glass-1 glass-border p-3 rounded-lg text-center">
                  <div className="font-semibold text-sm text-text">{source}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}