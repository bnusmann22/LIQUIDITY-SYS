import GlassCard from '../../../shared/components/GlassCard';
import GlassButton from '../../../shared/components/GlassButton';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-text mb-4">Contact Us</h1>
        <p className="text-lg text-muted">
          Get in touch to learn more about the Liquidity Intelligence Platform
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 max-[720px]:grid-cols-1">
        <GlassCard title="Send us a message">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Name</label>
              <input
                type="text"
                className="w-full glass-1 glass-border px-4 py-3 rounded-lg text-text placeholder-muted focus:glass-2 focus:border-green transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Email</label>
              <input
                type="email"
                className="w-full glass-1 glass-border px-4 py-3 rounded-lg text-text placeholder-muted focus:glass-2 focus:border-green transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full glass-1 glass-border px-4 py-3 rounded-lg text-text placeholder-muted focus:glass-2 focus:border-green transition-all resize-none"
                placeholder="Tell us about your liquidity management needs..."
              />
            </div>
            <GlassButton type="submit" variant="primary" className="w-full">
              Send Message
            </GlassButton>
          </form>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard title="Platform Information">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-text mb-1">Technology</h4>
                <p className="text-muted text-sm">Real-time event processing with machine learning and automated decision systems.</p>
              </div>
              <div>
                <h4 className="font-semibold text-text mb-1">Compliance</h4>
                <p className="text-muted text-sm">Built for regulatory compliance with LCR, NSFR, and other liquidity requirements.</p>
              </div>
              <div>
                <h4 className="font-semibold text-text mb-1">Security</h4>
                <p className="text-muted text-sm">Enterprise-grade security with end-to-end encryption and audit trails.</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Key Features">
            <ul className="space-y-2 text-sm text-muted">
              <li>• Real-time liquidity monitoring</li>
              <li>• Predictive analytics and forecasting</li>
              <li>• Automated risk assessment</li>
              <li>• Stress testing capabilities</li>
              <li>• Regulatory reporting automation</li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}