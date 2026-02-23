import React, { useState } from 'react';
import { RefreshCw, Radio, Settings, Cloud, Cpu, Activity, LayoutGrid, CheckCircle2, TrendingDown, TrendingUp, Cpu as EdgeIcon } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function SystemHealth() {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    const sections = [
        { name: 'Cane Yard', status: 'HEALTHY', online: '99.2%', nodes: '1,200 Nodes', isWarning: false },
        { name: 'Milling Tandem', status: 'HEALTHY', online: '98.5%', nodes: '850 Nodes', isWarning: false },
        { name: 'Evaporation', status: 'WARNING', online: '92.4%', nodes: '400 Nodes', isWarning: true },
        { name: 'Clarification', status: 'HEALTHY', online: '100%', nodes: '600 Nodes', isWarning: false },
    ];

    const models = [
        { name: 'Pol Prediction', accuracy: '98.2%', training: '2h ago', drift: 'HEALTHY', conf: 98, isDrift: false },
        { name: 'Maintenance Forecast', accuracy: '96.5%', training: '12h ago', drift: 'DRIFT LIKELY', conf: 65, isDrift: true },
        { name: 'Steam Balance', accuracy: '99.1%', training: '30m ago', drift: 'HEALTHY', conf: 99, isDrift: false },
        { name: 'Juice Purity AI', accuracy: '94.8%', training: '1d ago', drift: 'HEALTHY', conf: 94, isDrift: false },
    ];

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-gray-50 pb-12">
            <TopBar breadcrumb="System Health" title="Infrastructure Status" />

            <div className="p-6 lg:p-10 flex flex-col gap-6 max-w-[1400px]">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">System Health & Infrastructure</h1>
                        <p className="text-gray-500 font-medium mt-1 text-[15px]">Real-time monitoring of sensors, edge nodes, and AI model performance.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-bold items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            All Systems Operational
                        </div>
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="flex items-center justify-center gap-2 bg-[#1A56DB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow transition-colors disabled:opacity-70 w-36"
                        >
                            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                        </button>
                    </div>
                </div>

                {/* Top KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                        <span className="text-gray-500 text-xs font-bold mb-2">Total Sensors Online</span>
                        <div className="flex items-end gap-2 justify-between">
                            <div>
                                <span className="text-3xl font-extrabold text-gray-900">4,250</span>
                                <span className="text-gray-400 font-bold ml-1">/ 4,300</span>
                            </div>
                            <span className="text-emerald-500 text-xs font-bold flex items-center"><TrendingUp size={14} className="mr-1" /> 98.8%</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                        <span className="text-gray-500 text-xs font-bold mb-2">Average Latency</span>
                        <div className="flex items-end gap-2 justify-between">
                            <span className="text-3xl font-extrabold text-gray-900">42ms</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center"><TrendingDown size={14} className="mr-1" /> -2ms</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                        <span className="text-gray-500 text-xs font-bold mb-2">Edge Devices Active</span>
                        <div className="flex items-end gap-2 justify-between">
                            <div>
                                <span className="text-3xl font-extrabold text-gray-900">12 / 12</span>
                            </div>
                            <span className="text-gray-400 text-xs font-bold uppercase">Optimal</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                        <span className="text-gray-500 text-xs font-bold mb-2">AI Model Confidence</span>
                        <div className="flex items-end gap-2 justify-between">
                            <span className="text-3xl font-extrabold text-gray-900">94.2%</span>
                            <span className="text-emerald-500 text-xs font-bold flex items-center"><TrendingUp size={14} className="mr-1" /> +0.5%</span>
                        </div>
                    </div>
                </div>

                {/* Data Pipeline Flow */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <Activity size={20} className="text-[#1A56DB]" />
                        <h2 className="text-[16px] font-bold text-gray-900">Data Pipeline Flow</h2>
                    </div>

                    <div className="relative flex items-center justify-between px-10">
                        {/* Background Line */}
                        <div className="absolute left-24 right-24 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

                        {/* Nodes */}
                        <div className="flex flex-col items-center gap-3 z-10 bg-white">
                            <div className="w-16 h-16 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                                <Radio size={24} className="text-gray-600" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sensors</span>
                        </div>

                        <div className="z-10 bg-white px-2"><span className="text-[10px] font-bold text-emerald-500">9ms</span></div>

                        <div className="flex flex-col items-center gap-3 z-10 bg-white">
                            <div className="w-16 h-16 rounded-full border-2 border-emerald-400 bg-emerald-50 flex items-center justify-center shadow-sm shadow-emerald-100">
                                <Settings size={28} className="text-emerald-500" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Edge Nodes</span>
                        </div>

                        <div className="z-10 bg-white px-2"><span className="text-[10px] font-bold text-emerald-500">22ms</span></div>

                        <div className="flex flex-col items-center gap-3 z-10 bg-white">
                            <div className="w-16 h-16 rounded-full border-2 border-[#1A56DB] bg-blue-50 flex items-center justify-center shadow-md shadow-blue-100">
                                <Cloud size={28} className="text-[#1A56DB]" />
                            </div>
                            <span className="text-[10px] font-bold text-[#1A56DB] uppercase tracking-widest">Cloud AI</span>
                        </div>

                        <div className="z-10 bg-white px-2"><span className="text-[10px] font-bold text-emerald-500">12ms</span></div>

                        <div className="flex flex-col items-center gap-3 z-10 bg-white">
                            <div className="w-16 h-16 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                                <Cpu size={24} className="text-gray-600" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">PLC (Control)</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Split Left/Right */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Section Connectivity */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2">
                                <LayoutGrid size={20} className="text-[#1A56DB]" />
                                <h2 className="text-[15px] font-bold text-gray-900">Section Connectivity</h2>
                            </div>
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Real-Time</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {sections.map((sec, i) => (
                                <div key={i} className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900 text-[14px]">{sec.name}</span>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded w-fit ${sec.isWarning ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                            {sec.status}
                                        </span>
                                    </div>
                                    <div className={`flex gap-1 ${sec.isWarning ? 'text-orange-400' : 'text-emerald-500'}`}>
                                        {[...Array(6)].map((_, j) => <div key={j} className="w-1.5 h-1.5 rounded-full bg-current"></div>)}
                                    </div>
                                    <div className="text-[11px] font-semibold text-gray-400 mt-1">
                                        {sec.online} Online • {sec.nodes}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: AI Model Performance & Edge Computing Nodes */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* AI Model Performance */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                                <CheckCircle2 size={20} className="text-[#1A56DB]" />
                                <h2 className="text-[15px] font-bold text-gray-900">AI Model Performance</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white">
                                        <tr>
                                            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Model Name</th>
                                            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Accuracy</th>
                                            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Last Training</th>
                                            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Data Drift</th>
                                            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Confidence</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {models.map((mod, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4 font-bold text-[13px] text-gray-900">{mod.name}</td>
                                                <td className="px-6 py-4 font-extrabold text-[13px] text-[#1A56DB]">{mod.accuracy}</td>
                                                <td className="px-6 py-4 font-medium text-[13px] text-gray-500">{mod.training}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${mod.isDrift ? 'text-orange-500' : 'text-emerald-500'}`}>
                                                        {mod.drift}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 w-32">
                                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${mod.isDrift ? 'bg-orange-400' : 'bg-[#1A56DB]'}`} style={{ width: `${mod.conf}%` }}></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Edge Computing Nodes */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col p-6">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
                                <EdgeIcon size={20} className="text-emerald-500" />
                                <h2 className="text-[15px] font-bold text-gray-900">Edge Computing Nodes</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Node 1 */}
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-100 rounded-lg"><EdgeIcon size={16} className="text-emerald-600" /></div>
                                        <div>
                                            <h4 className="font-bold text-[14px] text-gray-900">Node-A1 (Cane Yard)</h4>
                                            <p className="text-[10px] font-bold text-gray-400 tracking-widest">IP: 192.168.1.104</p>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 absolute top-6 right-6"></div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest"><span>CPU Load</span><span className="text-gray-900">42%</span></div>
                                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="w-[42%] bg-[#1A56DB] h-full"></div></div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest"><span>RAM Usage</span><span className="text-gray-900">2.4GB / 8GB</span></div>
                                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="w-[30%] bg-[#1A56DB] h-full"></div></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest pt-1 border-t border-slate-200 mt-1">
                                            <span>Temp</span><span className="text-emerald-600 font-extrabold text-[12px]">45°C</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Node 2 */}
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-100 rounded-lg"><EdgeIcon size={16} className="text-emerald-600" /></div>
                                        <div>
                                            <h4 className="font-bold text-[14px] text-gray-900">Node-B4 (Boilers)</h4>
                                            <p className="text-[10px] font-bold text-gray-400 tracking-widest">IP: 192.168.1.112</p>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 absolute top-6 right-6"></div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest"><span>CPU Load</span><span className="text-gray-900">78%</span></div>
                                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="w-[78%] bg-orange-400 h-full"></div></div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest"><span>RAM Usage</span><span className="text-gray-900">6.1GB / 8GB</span></div>
                                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="w-[76%] bg-orange-400 h-full"></div></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest pt-1 border-t border-slate-200 mt-1">
                                            <span>Temp</span><span className="text-orange-500 font-extrabold text-[12px]">62°C</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="flex justify-center mt-4">
                                <button className="text-[12px] font-bold text-[#1A56DB] hover:underline">View All 12 Nodes &rarr;</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
