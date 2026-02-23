import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tractor, Settings, Wind, Loader, Package, AlertTriangle, Play, Square, Activity, ArrowRight, ShieldCheck, Thermometer, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useSugarMill } from '../context/SugarMillContext';

export default function ProcessFlow() {
    const { metrics } = useSugarMill();
    const [isHalting, setIsHalting] = useState(false);
    const [lineHalted, setLineHalted] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [isOptimized, setIsOptimized] = useState(false);

    const handleHalt = () => {
        setIsHalting(true);
        setTimeout(() => {
            setIsHalting(false);
            setLineHalted(!lineHalted);
        }, 1500);
    };

    const handleOptimize = () => {
        setIsOptimizing(true);
        setTimeout(() => {
            setIsOptimizing(false);
            setIsOptimized(true);
            setTimeout(() => setIsOptimized(false), 3000);
        }, 1500);
    };

    const nodes = [
        { id: 'cane-yard', title: 'CANE YARD', icon: Tractor, value: 'ACTIVE', color: 'bg-emerald-500', isCritical: false },
        { id: 'milling', title: 'MILLING', icon: Settings, value: `${metrics.processes.millingLoad}% LOAD`, color: 'bg-[#1A56DB]', isCritical: false },
        { id: 'clarification', title: 'CLARIFICATION', icon: Activity, value: `pH ${metrics.processes.clarificationpH}`, color: 'bg-orange-500', isCritical: true },
        { id: 'evaporation', title: 'EVAPORATION', icon: Thermometer, value: 'OPTIMAL', color: 'bg-emerald-500', isCritical: false },
        { id: 'crystallize', title: 'CRYSTALLIZE', icon: ShieldCheck, value: `${metrics.processes.crystallizerBrix}% BRIX`, color: 'bg-[#1A56DB]', isCritical: false },
        { id: 'bagging', title: 'BAGGING', icon: Package, value: 'WAITING', color: 'bg-[#1A56DB]', isCritical: false },
    ];

    const telemetry = [
        { unit: 'Clarifier A3', metric: 'pH Level', current: metrics.processes.clarificationpH, target: '7.0', status: 'Stable' },
        { unit: 'Boiler 12', metric: 'Pressure', current: `${metrics.processes.boilerPressure} bar`, target: '65 bar', status: 'Warning' },
        { unit: 'Crystallizer B', metric: 'Brix %', current: `${metrics.processes.crystallizerBrix}%`, target: '93.0%', status: 'Stable' },
        { unit: 'Dryer Zone', metric: 'Moisture', current: '0.04%', target: '< 0.05%', status: 'Optimal' },
    ];

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-[#F9FAFB] pb-12">
            <TopBar breadcrumb="Process Flow" title="Live Topology" />

            <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-[1500px]">
                {/* Header & Main KPIs */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">Process Flow Visualization</h1>
                            <span className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-[10px] uppercase font-extrabold tracking-widest animate-pulse flex items-center gap-1.5 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                Heat Anomaly
                            </span>
                        </div>
                        <p className="text-gray-500 font-medium text-[15px]">Live schematic from Cane Yard to Bagging with real-time AI optimization logic.</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col min-w-[180px]">
                            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-1">Total Cane</span>
                            <div className="flex items-end gap-2 justify-between">
                                <span className="text-2xl font-extrabold text-gray-900">{Number(metrics.input.totalCane).toLocaleString()}<span className="text-sm text-gray-400 ml-1 font-bold">Tons</span></span>
                                <span className="text-emerald-500 text-xs font-bold flex items-center bg-emerald-50 px-2 py-0.5 rounded">^ 12.0%</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col min-w-[180px]">
                            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-1">Avg Purity</span>
                            <div className="flex items-end gap-2 justify-between">
                                <span className="text-2xl font-extrabold text-gray-900">{metrics.input.polPercent}<span className="text-sm text-gray-400 ml-1 font-bold">%</span></span>
                                <span className="text-red-500 text-xs font-bold flex items-center bg-red-50 px-2 py-0.5 rounded">v -0.5%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Master Pipeline Diagram */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-10 flex flex-col gap-16 relative overflow-hidden">
                    {/* Custom Animated Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 z-0"></div>

                    <div className="flex justify-between items-center z-10 relative">
                        <div className="flex items-center gap-2 bg-[#EEF2FF] text-[#1A56DB] px-5 py-2.5 rounded-full font-bold text-sm tracking-wider cursor-pointer hover:bg-blue-100 transition-colors">
                            <Sparkles size={16} /> FULL AUTOPILOT
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleHalt}
                                disabled={isHalting}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-colors border ${lineHalted
                                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                                    }`}
                            >
                                {isHalting ? (
                                    <Loader size={14} className="animate-spin" />
                                ) : (
                                    <Square size={14} className="fill-current" />
                                )}
                                {isHalting ? 'Halting...' : lineHalted ? 'Resume Line' : 'Halt Line'}
                            </button>
                            <button
                                onClick={handleOptimize}
                                disabled={isOptimizing}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-colors shadow-md ${isOptimizing || isOptimized
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
                                    : 'bg-[#1A56DB] hover:bg-blue-700 text-white shadow-blue-200'
                                    }`}
                            >
                                {isOptimizing ? (
                                    <Loader size={14} className="animate-spin" />
                                ) : isOptimized ? (
                                    <CheckCircle2 size={14} />
                                ) : (
                                    <Play size={14} className="fill-current" />
                                )}
                                {isOptimizing ? 'Optimizing...' : isOptimized ? 'Optimized' : 'Auto-Optimize'}
                            </button>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-between w-full px-8 z-10 py-10">
                        {/* The Horizontal Track Line */}
                        <div className="absolute left-16 right-16 top-1/2 h-2 bg-slate-100 -translate-y-1/2 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-r from-[#1A56DB]/20 via-[#1A56DB]/50 to-[#1A56DB]/20 animate-[pulse_2s_ease-in-out_infinite]"></div>
                        </div>

                        {nodes.map((node, index) => (
                            <React.Fragment key={node.id}>
                                {/* Visual Connector Pulse (Custom Addition) */}
                                {index > 0 && (
                                    <div className="absolute h-0.5 bg-[#1A56DB] opacity-50 z-20" style={{
                                        left: `calc(${(index - 1) * 20}% + 70px)`,
                                        width: 'calc(20% - 140px)',
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    }}>
                                        <div className="w-4 h-4 bg-[#1A56DB] rounded-full absolute top-1/2 -translate-y-1/2 blur-sm animate-[translateX_3s_linear_infinite]"
                                            style={{ boxShadow: '0 0 10px 2px #1A56DB' }}></div>
                                    </div>
                                )}

                                <Link to={`/process-flow/${node.id}`} className="flex flex-col items-center gap-4 relative z-30 group">
                                    {/* Warning Beacon */}
                                    {node.isCritical && (
                                        <div className="absolute -top-12 animate-bounce bg-orange-500 text-white p-2 rounded-full shadow-lg shadow-orange-500/50">
                                            <AlertTriangle size={20} />
                                        </div>
                                    )}

                                    {/* Main Node Circle */}
                                    <div className={`w-24 h-24 rounded-[30px] flex items-center justify-center border-4 relative transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 shadow-xl cursor-pointer ${node.isCritical ? 'bg-orange-50 border-orange-200' : 'bg-white border-blue-50'
                                        }`}>
                                        {/* Inner glowing circle */}
                                        <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center ${node.color} text-white shadow-inner`}>
                                            <node.icon size={36} strokeWidth={1.5} />
                                        </div>
                                        {/* Decorative Ring */}
                                        <div className={`absolute -inset-2 rounded-[34px] border-2 border-dashed ${node.isCritical ? 'border-orange-300 animate-[spin_10s_linear_infinite]' : 'border-blue-400 opacity-0 group-hover:opacity-100'}`}></div>
                                    </div>

                                    {/* Node Labels */}
                                    <div className="flex flex-col items-center gap-1 mt-2">
                                        <h3 className="text-[13px] font-extrabold text-gray-900 uppercase tracking-widest">{node.title}</h3>
                                        <span className={`text-[12px] font-extrabold px-3 py-1 rounded-full uppercase ${node.value === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' :
                                            node.value === 'OPTIMAL' ? 'bg-emerald-50 text-emerald-600' :
                                                node.isCritical ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-500'
                                            }`}>{node.value}</span>
                                    </div>
                                </Link>
                            </React.Fragment>
                        ))}
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
            @keyframes translateX {
              0% { left: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { left: 100%; opacity: 0; }
            }
          `}} />
                </div>

                {/* Secondary Content: Live System Topography & Telemetry (Custom enhancements) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Detailed Section Status table matching description */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                            <ShieldCheck size={24} className="text-[#1A56DB]" />
                            <h2 className="text-lg font-bold text-gray-900">Live System Topography</h2>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900 text-lg">Extraction Plant (Milling)</span>
                                    <span className="text-sm font-semibold text-gray-500 mt-1">98.5% Online • 850 Nodes</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1.5 text-emerald-500">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-current"></div>)}
                                    </div>
                                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-3 py-1.5 rounded uppercase tracking-widest">HEALTHY</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-orange-50/50 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900 text-lg">Evaporators & Pans</span>
                                    <span className="text-sm font-semibold text-gray-500 mt-1">92.4% Online • 400 Nodes</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1.5 text-orange-400">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-current"></div>)}
                                    </div>
                                    <span className="bg-orange-100 text-orange-700 text-[10px] font-extrabold px-3 py-1.5 rounded uppercase tracking-widest">WARNING</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900 text-lg">Crystallization</span>
                                    <span className="text-sm font-semibold text-gray-500 mt-1">100% Online • 600 Nodes</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1.5 text-emerald-500">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-current"></div>)}
                                    </div>
                                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-3 py-1.5 rounded uppercase tracking-widest">HEALTHY</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Custom Telemetry Table for added immersion */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Zap size={24} className="text-[#1A56DB]" />
                                <h2 className="text-lg font-bold text-gray-900">Advanced Telemetry Readings</h2>
                            </div>
                            <span className="text-xs font-bold text-gray-400">Updated: Just Now</span>
                        </div>
                        <div className="overflow-x-auto p-2">
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-4 text-[11px] uppercase font-bold tracking-widest text-slate-400">Unit</th>
                                        <th className="px-6 py-4 text-[11px] uppercase font-bold tracking-widest text-slate-400">Metric</th>
                                        <th className="px-6 py-4 text-[11px] uppercase font-bold tracking-widest text-slate-400">Current</th>
                                        <th className="px-6 py-4 text-[11px] uppercase font-bold tracking-widest text-slate-400">Target</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {telemetry.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-5 font-bold text-[14px] text-gray-900">{item.unit}</td>
                                            <td className="px-6 py-5 font-semibold text-[13px] text-gray-500">{item.metric}</td>
                                            <td className="px-6 py-5">
                                                <span className={`font-extrabold text-[15px] ${item.status === 'Warning' ? 'text-orange-500' : 'text-[#1A56DB]'}`}>
                                                    {item.current}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-[13px] text-gray-400 bg-gray-100 px-2 py-1 rounded">{item.target}</span>
                                                    {item.status === 'Warning' && <ArrowRight size={14} className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
