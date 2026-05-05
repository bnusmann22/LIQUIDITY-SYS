import GlassCard from '../../../components/GlassCard';
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
    <div className="space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-black text-text">Platform Features</h1>
        <p className="text-lg text-muted max-w-3xl mx-auto">
          Comprehensive liquidity intelligence powered by specialized engines
          working together to provide real-time insights and automated decision support.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-8">Core Engines</h2>
        <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <GlassCard key={feature.title} className="text-center">
                <Icon size={48} className="mx-auto mb-4 text-green" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted mb-4">{feature.description}</p>
                <ul className="text-left space-y-1">
                  {feature.functions.map((func) => (
                    <li key={func} className="text-sm text-muted flex items-center">
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
        <h2 className="text-2xl font-bold mb-8">Data Integration</h2>
        <GlassCard>
          <p className="text-lg mb-6 text-center">
            Seamless integration with multiple data sources for comprehensive liquidity visibility.
          </p>
          <div className="grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
            {dataSources.map((source) => (
              <div key={source} className="glass-1 glass-border p-4 rounded-lg text-center">
                <div className="font-semibold text-text">{source}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}