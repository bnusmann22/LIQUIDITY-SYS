"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-2 glass-border p-3 rounded-lg text-sm">
        <p className="font-semibold text-text">{`Bucket: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${signedMoney(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function StressComparisonChart({ buckets, normalGaps, stressGaps }) {
  const data = buckets.map((bucket, index) => ({
    bucket,
    normal: normalGaps[index],
    stress: stressGaps[index]
  }));

  return (
    <div className="h-[300px] w-full">
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
          <Legend />
          <Bar dataKey="normal" fill="#10B981" radius={[2, 2, 0, 0]} />
          <Bar dataKey="stress" fill="#EF4444" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function signedMoney(value) {
  return `${value < 0 ? "-" : "+"}$${Math.abs(value).toFixed(1)}B`;
}