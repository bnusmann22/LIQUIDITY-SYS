import React from 'react';
import GlassCard from './GlassCard';

const MetricCard = ({ label, value, detail }) => {
  return (
    <GlassCard className="min-h-[116px] flex flex-col justify-center">
      <div className="text-sm text-muted">{label}</div>
      <div className="text-2xl font-bold text-text mt-1">{value}</div>
      <div className="text-xs text-muted mt-1">{detail}</div>
    </GlassCard>
  );
};

export default MetricCard;