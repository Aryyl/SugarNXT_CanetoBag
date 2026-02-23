import React from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PolTrendChart() {
    const data = [
        { time: '10:00 AM', live: 13.5, lab: 13.4 },
        { time: '10:15 AM', live: 13.8, lab: 13.6 },
        { time: '10:30 AM', live: 13.4, lab: 13.7 },
        { time: '10:45 AM', live: 14.1, lab: 13.9 },
        { time: '11:00 AM', live: 14.4, lab: 14.2 },
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-[17px] font-bold text-gray-900">Pol % Trend Analysis</h2>
                    <p className="text-[13px] text-gray-500 mt-1">Comparing Real-time NIR vs. Lab Samples (Last 60 mins)</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-6 bg-[#1A56DB] rounded-sm"></div>
                        <span className="text-xs font-bold text-gray-700">Live NIR</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-6 bg-gray-400 rounded-sm"></div>
                        <span className="text-xs font-bold text-gray-700">Lab Check</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-[200px] -ml-6">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorLive" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1C64F2" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#1C64F2" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                        <YAxis hide domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />

                        {/* Lab Check (Dashed Line) */}
                        <Line type="monotone" dataKey="lab" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" dot={false} />

                        {/* Live NIR (Solid Line with Area) */}
                        <Area type="monotone" dataKey="live" stroke="#1C64F2" strokeWidth={3} fillOpacity={1} fill="url(#colorLive)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
