import React from 'react';
import { Monitor, Cog, Activity, AlertTriangle } from 'lucide-react';

const Sidebar = ({ view, setView, mode, setMode, config }) => {
  const views = [
    { key: 'command', label: 'Command', icon: Monitor },
    { key: 'engines', label: 'Engines', icon: Cog },
    { key: 'events', label: 'Event Stream', icon: Activity },
    { key: 'stress', label: 'Stress Lab', icon: AlertTriangle }
  ];

  const modeLabels = {
    normal: 'Normal',
    stress: 'Stress',
    crisis: 'Crisis'
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-transparent border-r border-border p-6 flex flex-col gap-7">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-green rounded-lg flex items-center justify-center font-black text-bg">
          LI
        </div>
        <div>
          <div className="font-semibold text-text">Liquidity Intelligence</div>
          <div className="text-sm text-muted">Real-time decision system</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2" aria-label="Primary">
        {views.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
              view === key
                ? 'glass-2 text-text'
                : 'glass-1 text-muted hover:glass-2'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      {/* System Mode */}
      <div className="mt-auto border-t border-border pt-5">
        <h2 className="mb-3 text-sm font-semibold text-text">System Mode</h2>
        <div className="flex flex-col gap-2" role="group" aria-label="System mode">
          {Object.entries(modeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`px-3 py-2 rounded-lg text-left transition-all ${
                mode === key
                  ? 'glass-2 text-text'
                  : 'glass-1 text-muted hover:glass-2'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {config?.modes && <p className="mt-3 text-xs text-muted">{config.modes[mode]}</p>}
      </div>
    </aside>
  );
};

export default Sidebar;