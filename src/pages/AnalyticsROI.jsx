import React from 'react';
import { IndianRupee, TrendingUp, Calendar, Leaf, Target, BarChart, Zap } from 'lucide-react';
import { LineChart, Line, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip, Legend } from 'recharts';
import TopBar from '../components/TopBar';
import { useSugarMill } from '../context/SugarMillContext';

export default function AnalyticsROI() {
    const { metrics } = useSugarMill();

    // Mock Data for Production Line Chart using context for 'Today'
    const productionData = Array.from({ length: 14 }, (_, i) => {
        if (i === 13) return { day: 'Today', tonnage: Number(metrics.input.totalCane), target: 1240 };
        return {
            day: `Day ${i + 1}`,
            tonnage: 1150 + ((i * 7 + 13) % 150) + (i * 5),
            target: 1240
        };
    });

    // Mock Data for Monthly Comparison
    const monthlyData = [
        { month: 'Jan', '2023': 32000, '2024': 34500 },
        { month: 'Feb', '2023': 30500, '2024': 33000 },
        { month: 'Mar', '2023': 34000, '2024': 37200 },
        { month: 'Apr', '2023': 31000, '2024': 35100 },
        { month: 'May', '2023': 29500, '2024': 34000 },
        { month: 'Jun', '2023': 33000, '2024': 36500 },
    ];

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-gray-50 pb-12">
            <TopBar breadcrumb="Analytics & ROI" title="Financial Performance" />

            <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-[1400px]">
                {/* Page Header */}
                <div>
                    <h1 className="text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">Analytics & ROI Dashboard</h1>
                    <p className="text-gray-500 font-medium mt-1 text-[15px]">Financial and operational performance tracking driven by AI optimizations.</p>
                </div>

                {/* 1. High-Level Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">Live Daily Revenue</span>
                            <div className="p-2 bg-emerald-50 rounded-lg"><IndianRupee size={20} className="text-emerald-500" /></div>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900">₹{(metrics.derived.dailyRevenue / 100000).toFixed(2)}L</h2>
                        <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded">Based on {metrics.derived.sugarProduced}T Output</div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">Production Increase</span>
                            <div className="p-2 bg-blue-50 rounded-lg"><TrendingUp size={20} className="text-blue-500" /></div>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900">+8.5%</h2>
                        <div className="text-xs font-semibold text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded">vs Previous FY</div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">ROI Payback Period</span>
                            <div className="p-2 bg-indigo-50 rounded-lg"><Calendar size={20} className="text-indigo-500" /></div>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900">14 Mo</h2>
                        <div className="text-xs font-semibold text-gray-500 bg-gray-100 w-fit px-2 py-1 rounded">Capital Expenditure</div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">Carbon Reduction</span>
                            <div className="p-2 bg-green-50 rounded-lg"><Leaf size={20} className="text-green-500" /></div>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900">-18%</h2>
                        <div className="text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded">Scope 1 & 2 Emissions</div>
                    </div>
                </div>

                {/* Middle Row: Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* 2. Production Chart (Line Graph) */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2 flex flex-col gap-4 min-h-[400px]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Target size={20} className="text-[#1A56DB]" />
                                <h2 className="text-[15px] font-bold text-gray-900">Daily Tonnage vs Target</h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#1A56DB]"></div><span className="text-xs font-bold text-gray-500">Actual (T)</span></div>
                                <div className="flex items-center gap-1.5"><div className="w-4 h-1 bg-red-400"></div><span className="text-xs font-bold text-gray-500">Target (1,240 T)</span></div>
                            </div>
                        </div>

                        <div className="flex-1 w-full bg-slate-50 border border-gray-100 rounded-lg p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={productionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="day" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} domain={[1000, 1400]} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <ReferenceLine y={1240} stroke="#F87171" strokeDasharray="4 4" strokeWidth={2} />
                                    <Line type="monotone" dataKey="tonnage" stroke="#1A56DB" strokeWidth={3} dot={{ stroke: '#1A56DB', strokeWidth: 2, r: 4, fill: '#fff' }} activeDot={{ r: 6 }} animationDuration={1500} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 3. Efficiency Grid */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <Zap size={20} className="text-orange-500" />
                            <h2 className="text-[15px] font-bold text-gray-900">Efficiency Grid</h2>
                        </div>

                        <div className="flex-1 flex flex-col justify-around">
                            {/* AI Accuracy */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-gray-700">AI Model Accuracy</span>
                                    <span className="text-lg font-extrabold text-[#1A56DB]">98.2%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-[#1A56DB] h-full rounded-full" style={{ width: '98.2%' }}></div>
                                </div>
                            </div>

                            {/* Energy Efficiency */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-gray-700">Energy Efficiency Return</span>
                                    <span className="text-lg font-extrabold text-emerald-600">+24.5%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '74.5%' }}></div>
                                </div>
                            </div>

                            <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg mt-4">
                                <h4 className="text-xs font-bold text-orange-800 uppercase tracking-widest mb-1">Grid Notification</h4>
                                <p className="text-xs text-orange-700 font-medium">Optimal thermal parameters have reduced total site energy draw by 540 kWh daily.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Monthly Comparison */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4 min-h-[350px]">
                    <div className="flex items-center gap-2">
                        <BarChart size={20} className="text-[#1A56DB]" />
                        <h2 className="text-[15px] font-bold text-gray-900">YoY Monthly Production Volume (Tons)</h2>
                    </div>

                    <div className="flex-1 w-full bg-slate-50 border border-gray-100 rounded-lg p-4 pl-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                                <Bar dataKey="2023" fill="#D1D5DB" radius={[4, 4, 0, 0]} name="2023 Volume" />
                                <Bar dataKey="2024" fill="#1A56DB" radius={[4, 4, 0, 0]} name="2024 Volume (AI Active)" />
                            </ReBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}
