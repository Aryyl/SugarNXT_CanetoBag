import React, { useState } from 'react';
import { Target, Activity, Settings, TrendingUp, Cpu, Server, CheckCircle2, AlertTriangle, MessageSquare, ArrowRight, ShieldCheck, Zap, Download } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useSugarMill } from '../context/SugarMillContext';

const getAutomationDots = (level) => {
    return [1, 2, 3, 4, 5].map((dot) => (
        <div key={dot} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${dot <= level ? 'bg-[#1A56DB] shadow-[0_0_8px_rgba(26,86,219,0.5)]' : 'bg-slate-200'}`} />
    ));
};

const getModeStyles = (mode, isOverridden, isCritical) => {
    if (isCritical) return 'bg-red-50 text-red-600 border border-red-200';
    if (isOverridden) return 'bg-yellow-50 text-yellow-600 border border-yellow-200';
    if (mode === 'FULLY AUTOMATED') return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
    if (mode === 'AI ASSISTED') return 'bg-blue-50 text-blue-600 border border-blue-200';
    return 'bg-gray-50 text-gray-600 border border-gray-200';
};

export default function HumanAiControl() {
    const { metrics } = useSugarMill();
    const [hoveredRow, setHoveredRow] = useState(null);

    const base = Number(metrics.health.automationIndex);
    const processes = [
        { id: 1, section: 'Cane Unloading', sub: 'Platform 01-04', level: 4, mode: 'FULLY AUTOMATED', confidence: Math.min(100, Math.floor(base + 6)), trend: 'up' },
        { id: 2, section: 'Cane Sorting', sub: 'Optical Sensor Array', level: 5, mode: 'FULLY AUTOMATED', confidence: Math.min(100, Math.floor(base + 2)), trend: 'up' },
        { id: 3, section: 'Milling Pressure', sub: 'Rollers 1-5', level: 3, mode: 'AI ASSISTED', confidence: Math.floor(base - 5), trend: 'up' },
        { id: 4, section: 'Steam Balance', sub: 'Boiler High Pressure', level: 2, mode: 'MANUAL', isOverridden: true, confidence: 62, trend: 'warn' },
        { id: 5, section: 'Crystallization', sub: 'Vacuum Pans A/B', level: 4, mode: 'FULLY AUTOMATED', confidence: Math.floor(base - 1), trend: 'up' },
        { id: 6, section: 'Maintenance Planning', sub: 'Predictive Scheduling', level: 3, mode: 'AI ASSISTED', confidence: 78, trend: 'up' },
        { id: 7, section: 'Emergency Shutdown', sub: 'Critical Systems', level: 1, mode: 'HUMAN', isCritical: true, confidence: null, trend: 'none' },
        { id: 8, section: 'Safety Clearance', sub: 'Site-wide Protocol', level: 1, mode: 'HUMAN', isCritical: true, confidence: null, trend: 'none' },
    ];

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
            <TopBar breadcrumb="Zero-Touch Ops > Control Matrix" title="Human vs AI Control Matrix" />

            <div className="p-6 lg:p-8 flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto w-full">

                {/* Main Matrix Content (Left Column) */}
                <div className="flex-1 flex flex-col gap-6">

                    {/* Header Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative">
                        <div className="flex flex-col gap-1.5 z-10">
                            <div className="flex items-center gap-3">
                                <h1 className="text-[28px] font-extrabold text-[#111827] tracking-tight">Human vs AI Control Matrix</h1>
                                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> System operational
                                </div>
                            </div>
                            <p className="text-gray-500 font-medium text-sm flex items-center gap-2">
                                <Settings size={14} /> Shift B: 08:00 - 16:00
                            </p>
                        </div>

                        {/* Autonomy Widget Overlay Component */}
                        <div className="absolute right-0 top-0 hidden xl:flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xl shadow-blue-900/5 translate-x-4 -translate-y-4 z-20">
                            <div className="flex flex-col text-right">
                                <span className="text-[10px] font-extrabold text-blue-900 uppercase tracking-widest">Autonomy Score</span>
                                <span className="text-3xl font-black text-[#1A56DB]">{metrics.health.automationIndex}<span className="text-lg">%</span></span>
                            </div>
                            {/* Circular Progress (CSS based) */}
                            <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-blue-50 overflow-hidden">
                                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E2E8F0" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1A56DB" strokeWidth="8" strokeDasharray="251" strokeDashoffset={251 - (251 * Number(metrics.health.automationIndex)) / 100} className="transition-all duration-1000 ease-in-out" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center bg-white m-2 rounded-full shadow-inner">
                                    <Target size={20} className="text-[#1A56DB]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 z-10 pt-4 xl:pt-0">
                            <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-50 transition-colors shadow-sm">
                                <Download size={14} /> Export Log
                            </button>
                            <button className="flex items-center gap-2 bg-[#1A56DB] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">
                                <ShieldCheck size={16} /> Automation Rules
                            </button>
                        </div>
                    </div>

                    {/* Active Process Matrix Table */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden mt-2 relative top-0 flex flex-col">

                        {/* Table Headers */}
                        <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-5 bg-slate-50/80 border-b border-gray-100 border-t border-white shadow-inner">
                            <div className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest pl-2">SECTION / ASSET</div>
                            <div className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">AUTOMATION LEVEL</div>
                            <div className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">CURRENT MODE</div>
                            <div className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">AI CONFIDENCE / STATUS</div>
                            <div className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest text-center">ACTIONS</div>
                        </div>

                        {/* Table Body */}
                        <div className="flex flex-col divide-y divide-gray-100">
                            {processes.map((proc) => (
                                <div
                                    key={proc.id}
                                    onMouseEnter={() => setHoveredRow(proc.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    className={`grid grid-cols-[2fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-5 items-center transition-all duration-300 relative ${hoveredRow === proc.id ? 'bg-blue-50/40 z-10 scale-[1.01] shadow-lg shadow-blue-900/5' : 'bg-white z-0 hover:bg-slate-50'}`}
                                >
                                    {/* Hover Indicator Line */}
                                    {hoveredRow === proc.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1A56DB] rounded-r-md"></div>}

                                    {/* Col 1 */}
                                    <div className="flex flex-col pl-2">
                                        <span className="font-bold text-[14px] text-gray-900 leading-tight">{proc.section}</span>
                                        <span className="text-gray-400 text-[12px] font-medium">{proc.sub}</span>
                                    </div>

                                    {/* Col 2 */}
                                    <div className="flex items-center gap-1.5">
                                        {getAutomationDots(proc.level)}
                                    </div>

                                    {/* Col 3 */}
                                    <div>
                                        <span className={`px-2.5 py-1 rounded border flex flex-col items-center justify-center w-max ${getModeStyles(proc.mode, proc.isOverridden, proc.isCritical)}`}>
                                            <span className="text-[9px] font-extrabold uppercase tracking-widest leading-none pb-0.5">{proc.mode}</span>
                                            {proc.isOverridden && <span className="text-[8px] font-bold uppercase block leading-none opacity-80">(OVERRIDDEN)</span>}
                                            {proc.isCritical && <span className="text-[8px] font-bold uppercase block leading-none opacity-80">(CRITICAL)</span>}
                                        </span>
                                    </div>

                                    {/* Col 4 */}
                                    <div className="flex items-center">
                                        {proc.confidence ? (
                                            <div className="flex items-center gap-2 font-bold text-[13px]">
                                                <span className={proc.trend === 'warn' ? 'text-yellow-600' : 'text-gray-900'}>{proc.confidence}%</span>
                                                {proc.trend === 'up' && <TrendingUp size={14} className="text-emerald-500" strokeWidth={3} />}
                                                {proc.trend === 'warn' && <AlertTriangle size={14} className="text-yellow-500" />}
                                            </div>
                                        ) : (
                                            <span className="font-bold text-[13px] text-red-600 flex items-center gap-2">
                                                CRITICAL <AlertTriangle size={14} />
                                            </span>
                                        )}
                                    </div>

                                    {/* Col 5 */}
                                    <div className="text-center w-full flex justify-center">
                                        <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors group">
                                            <div className="flex space-x-1">
                                                <div className="w-1 h-1 bg-current rounded-full group-hover:bg-[#1A56DB]"></div>
                                                <div className="w-1 h-1 bg-current rounded-full group-hover:bg-[#1A56DB]"></div>
                                                <div className="w-1 h-1 bg-current rounded-full group-hover:bg-[#1A56DB]"></div>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Sidebar - Mill AI Copilot */}
                <div className="w-full lg:w-[380px] shrink-0 bg-white rounded-2xl border border-gray-200 shadow-xl flex flex-col overflow-hidden relative">

                    {/* Sidebar Header */}
                    <div className="p-5 border-b border-gray-100 bg-gradient-to-br from-white to-blue-50/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#1A56DB] flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <Cpu className="text-white" size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-[15px] text-gray-900">Mill AI Copilot</h2>
                                <span className="text-[11px] font-bold text-[#1A56DB] uppercase tracking-widest">Active Analysis</span>
                            </div>
                        </div>
                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-5 pb-8 flex flex-col gap-6 bg-slate-50/50">

                        {/* Profile Bar embedded in chat as metadata */}
                        <div className="flex items-center justify-end gap-3 mb-2">
                            <div className="flex flex-col text-right">
                                <span className="text-xs font-bold text-gray-900 leading-tight">Alex Sterling</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Plant Manager</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                                <img src="https://i.pravatar.cc/100?img=11" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* User Message Bubble */}
                        <div className="self-end w-4/5">
                            <div className="bg-[#1A56DB] text-white p-4 rounded-2xl rounded-tr-sm shadow-md text-[13px] font-medium leading-relaxed">
                                Why is Steam Balance in manual mode right now?
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 mt-1 float-right tracking-widest">10:14 AM</span>
                        </div>

                        {/* System/AI Response Bubble */}
                        <div className="self-start w-11/12 relative mt-4">

                            {/* Decorative connecting node */}
                            <div className="absolute -left-2 top-4 w-2 h-2 rounded-full bg-orange-400 ring-4 ring-orange-50 z-10"></div>

                            <div className="bg-white p-5 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm text-[13px] font-medium text-gray-600 leading-relaxed ml-3 relative">
                                Lead Operator Robert Chen initiated an override at 05:32 AM. Reason: <strong className="text-gray-900 border-b border-dashed border-gray-400 cursor-help">Sensor Drift (PT-402)</strong>. The AI model confidence dropped below 70% threshold.
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 mt-1 float-left ml-3 tracking-widest">10:15 AM</span>
                        </div>

                        {/* Clickable Quick Action / Chip */}
                        <div className="mt-8 self-end w-4/5 pt-4">
                            <button className="text-left w-full p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 text-[#1A56DB] text-[12px] font-bold leading-relaxed transition-colors shadow-sm relative group overflow-hidden">
                                <div className="absolute inset-0 w-1 bg-[#1A56DB] h-full transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                                Should I run a diagnostic on Sensor PT-402 or audit the autonomy log for similar events this week?
                            </button>
                        </div>

                    </div>

                    {/* Input Box Footer */}
                    <div className="p-4 border-t border-gray-100 bg-white">
                        <div className="relative flex items-center group">
                            <MessageSquare className="absolute left-4 text-gray-400 group-focus-within:text-[#1A56DB] transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Ask your AI Copilot..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-12 text-[13px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/20 focus:border-[#1A56DB] transition-all shadow-inner"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#1A56DB] text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm hover:scale-105 active:scale-95">
                                <ArrowRight size={14} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
