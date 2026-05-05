"use client";

import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

const getColor = (value) => {
  if (value > 110) return '#10B981';
  if (value >= 100) return '#F59E0B';
  return '#EF4444';
};

export default function LCRGauge({ lcr }) {
  const data = [
    {
      name: 'LCR',
      value: Math.min(lcr, 150), // cap at 150 for display
      fill: getColor(lcr)
    }
  ];

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          barSize={10}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#E5E7EB' }}
            background
            clockWise
            dataKey="value"
          />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={{ top: 0, left: 350, lineHeight: '24px' }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-center mt-2">
        <div className="text-2xl font-bold text-text">{lcr}%</div>
        <div className="text-sm text-muted">LCR Ratio</div>
      </div>
    </div>
  );
}