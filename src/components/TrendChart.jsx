import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function TrendChart({ data, dataKey, yAxisLabel, strokeColor = "#16a34a", optimalVal = 50 }) {
    return (
        <div className="w-full h-full bg-[#EAEDF1] p-2 rounded-md border border-gray-300 shadow-inner flex flex-col">
            <div className="flex-1 min-h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" vertical={false} />
                        <XAxis dataKey="time" stroke="#9CA3AF" fontSize={9} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9CA3AF" fontSize={9} tickLine={false} axisLine={false} label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fontSize: 10, fill: '#6B7280' }} />

                        {/* Optimal Target Line */}
                        <ReferenceLine y={optimalVal} stroke="#6B7280" strokeDasharray="3 3" opacity={0.5} />

                        {/* High Performance Trend Line */}
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={strokeColor}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
