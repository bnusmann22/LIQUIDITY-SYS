import React from 'react';

const Topbar = ({ clock, mode, scenarioLabel }) => {
  return (
    <header className="fixed top-0 left-60 right-0 h-16 backdrop-blur-xl bg-[rgba(10,15,25,0.6)] border-b border-border px-6 flex items-center justify-between z-10">
      <div className="flex items-center gap-4">
        <div className="text-sm font-bold uppercase text-green">Bank liquidity control room</div>
        <div className="text-lg font-black text-text">Live Cash, Risk, Forecasts, and Decisions</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="glass-1 glass-border px-4 py-2 rounded-lg text-right">
          <div className="font-bold text-text">{clock || '--:--:--'}</div>
          <div className="text-xs text-muted">Latency target: 200ms</div>
        </div>
        <div className="glass-1 glass-border px-3 py-1 rounded-full text-xs font-bold text-text">
          {scenarioLabel || 'Normal'}
        </div>
      </div>
    </header>
  );
};

export default Topbar;