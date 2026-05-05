"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="glass-2 glass-border p-3 rounded-lg text-sm">
        <p className="font-semibold text-text">{`${label}: ${signedMoney(value)}`}</p>
      </div>
    );
  }
  return null;
};

export default function LiquidityChart({ buckets, values, title, stress = false }) {
  const data = buckets.map((bucket, index) => ({
    bucket,
    value: values[index]
  }));

  const getBarColor = (value) => {
    if (value >= 0) return '#10B981'; // green
    return stress ? '#EF4444' : '#F59E0B'; // red for stress, amber otherwise
  };

  return (
    <div className="mt-3 h-[360px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey="bucket"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            tickFormatter={(value) => signedMoney(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function signedMoney(value) {
  return `${value < 0 ? "-" : "+"}$${Math.abs(value).toFixed(1)}B`;
}
