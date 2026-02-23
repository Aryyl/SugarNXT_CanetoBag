import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tractor, Settings, Loader, Package, AlertTriangle, Activity, ShieldCheck, Thermometer, ChevronRight, Zap, Target, ArrowUpRight, ArrowDownRight, TrendingUp, Cpu, Server, CheckCircle2, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';

const stagesConfig = {
    'cane-yard': {
        title: 'Cane Yard Real-time Overview',
        desc: 'Monitoring log scales, carrier speeds, and tractor throughput.',
        kpis: [
            { label: 'Cane Delivery', val: '4,100 T/day', trend: '+5.2%', isPos: true },
            { label: 'Carrier Speed', val: '12 m/min', trend: 'Optimal', isPos: true },
            { label: 'Queue Time', val: '15 mins', trend: '-2 mins', isPos: true },
            { label: 'Yard Autonomy', val: '98%', trend: '+1%', isPos: true },
        ],
        assets: [
            { name: 'Weighbridge A', load: '65', temp: '32°C', health: '98%', status: 'Optimal' },
            { name: 'Cane Carrier 1', load: '82', temp: '45°C', health: '85%', status: 'Warning' },
        ],
        copilot: 'Throughput is stable. I noticed a slight delay at Weighbridge B during shift change. Rerouting traffic to Weighbridge A.'
    },
    'milling': {
        title: 'Real-time Mill Overview',
        desc: 'System operational. Monitoring tandem extraction and shredder performance.',
        kpis: [
            { label: 'Throughput', val: '450 T/h', trend: '+12.0%', isPos: true },
            { label: 'Avg Purity', val: '14.2%', trend: '-0.5%', isPos: false },
            { label: 'Energy Cons.', val: '18 kWh/T', trend: '-2%', isPos: true },
            { label: 'Automation', val: '100%', trend: 'Autopilot', isPos: true },
        ],
        assets: [
            { name: 'Cane Carrier Motor', load: '78', temp: '62°C', health: '94%', status: 'Optimal' },
            { name: 'Shredder Gearbox', load: '92', temp: '85°C', health: '75%', status: 'Critical' },
            { name: 'Mill Rollers (Zone B)', load: '85', temp: '55°C', health: '88%', status: 'Optimal' },
        ],
        copilot: 'Current throughput is at 92% of peak efficiency. I noticed a slight drop in Pol concentration from Zone B batches. I recommend increasing the shredder speed by 150 RPM.'
    },
    'clarification': {
        title: 'Clarification Process Overview',
        desc: 'Monitoring pH buffering, juice heating, and clarifier settling rates.',
        kpis: [
            { label: 'Juice Temp', val: '102°C', trend: '+1.5%', isPos: true },
            { label: 'pH Buffer', val: '7.1', trend: 'Stable', isPos: true },
            { label: 'Settling Rate', val: '12 cm/h', trend: '-0.2', isPos: false },
            { label: 'Automation', val: '95%', trend: '+3%', isPos: true },
        ],
        assets: [
            { name: 'Primary Heater', load: '90', temp: '102°C', health: '92%', status: 'Optimal' },
            { name: 'Clarifier A3', load: '88', temp: '98°C', health: '89%', status: 'Optimal' },
        ],
        copilot: 'pH levels are stabilizing. Mud volume indicates higher soil content from the recent Cane Yard batch. Increasing flocculant dosage by 0.5%.'
    },
    'evaporation': {
        title: 'Evaporators & Pans Overview',
        desc: 'Tracking steam balance, brix concentration, and vacuum pressure.',
        kpis: [
            { label: 'Syrup Brix', val: '65%', trend: '+2%', isPos: true },
            { label: 'Steam Economy', val: '2.1', trend: '+0.1', isPos: true },
            { label: 'Vessel Temp A', val: '115°C', trend: 'High', isPos: false },
            { label: 'Automation', val: '80%', trend: '-5%', isPos: false },
        ],
        assets: [
            { name: 'Evaporator #1', load: '95', temp: '115°C', health: '82%', status: 'Warning' },
            { name: 'Vacuum Pump B', load: '75', temp: '60°C', health: '95%', status: 'Optimal' },
        ],
        copilot: 'Steam pressure anomaly detected in Vessel 1. Automatically bypassed bleeding valve to maintain syrup concentration. Consider scheduling descaling.'
    },
    'crystallize': {
        title: 'Crystallization Stage',
        desc: 'Monitoring massecuite dropping, cooling rates, and crystal growth.',
        kpis: [
            { label: 'Crystal Yield', val: '52%', trend: '+1.2%', isPos: true },
            { label: 'Massecuite Brix', val: '92%', trend: 'Target', isPos: true },
            { label: 'Pan Cycle Time', val: '3.5 Hrs', trend: '-10min', isPos: true },
            { label: 'Automation', val: '92%', trend: '+2%', isPos: true },
        ],
        assets: [
            { name: 'Vacuum Pan 1', load: '85', temp: '75°C', health: '96%', status: 'Optimal' },
            { name: 'Crystallizer C', load: '60', temp: '45°C', health: '99%', status: 'Optimal' },
        ],
        copilot: 'Crystal growth phase optimal. Pan 1 approaching strike point slightly faster than anticipated due to excellent syrup quality.'
    },
    'bagging': {
        title: 'Bagging & Dispatch',
        desc: 'Monitoring hopper feeds, weighment accuracy, and outbound logistics.',
        kpis: [
            { label: 'Bagging Rate', val: '25 /min', trend: 'Peak', isPos: true },
            { label: 'Weight Acc.', val: '99.9%', trend: '+0.1%', isPos: true },
            { label: 'Hopper Level', val: '45%', trend: 'Stable', isPos: true },
            { label: 'Automation', val: '99%', trend: '+1%', isPos: true },
        ],
        assets: [
            { name: 'Hopper Feeder A', load: '70', temp: '28°C', health: '94%', status: 'Optimal' },
            { name: 'Scale & Stitcher', load: '85', temp: '30°C', health: '98%', status: 'Optimal' },
        ],
        copilot: 'Packaging line is running at peak capacity. Outbound logistics synced; next cargo truck arrives at loading bay 3 in 15 minutes.'
    }
};

const allNodes = [
    { id: 'cane-yard', title: 'CANE YARD', icon: Tractor, value: 'ACTIVE' },
    { id: 'milling', title: 'MILLING', icon: Settings, value: '92% LOAD' },
    { id: 'clarification', title: 'CLARIFICATION', icon: Activity, value: 'CHECK TEMP' },
    { id: 'evaporation', title: 'EVAPORATION', icon: Thermometer, value: 'OPTIMAL' },
    { id: 'crystallize', title: 'CRYSTALLIZE', icon: ShieldCheck, value: '85% BRIX' },
    { id: 'bagging', title: 'BAGGING', icon: Package, value: 'WAITING' },
];

export default function ProcessDetail() {
    const { stageId } = useParams();

    // Fallback to milling if invalid
    const sData = stagesConfig[stageId] || stagesConfig['milling'];

    const currentIndex = allNodes.findIndex(n => n.id === stageId);

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-[#F9FAFB] pb-12">
            <TopBar breadcrumb={`Process Flow > ${sData.title}`} title={sData.title} />

            <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-[1500px]">
                {/* Header Ribbon */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">{sData.title}</h1>
                        <p className="text-gray-500 font-medium text-[15px]">{sData.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-full font-bold text-sm tracking-wider border border-emerald-100 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> LIVE SYSTEM ACTIVE
                    </div>
                </div>

                {/* Dynamic KPI Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {sData.kpis.map((kpi, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-1">{kpi.label}</span>
                            <div className="flex items-end justify-between mt-2">
                                <span className="text-2xl font-extrabold text-gray-900">{kpi.val}</span>
                                <span className={`text-xs font-bold flex items-center px-2 py-0.5 rounded ${kpi.isPos ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                                    {kpi.isPos ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />} {kpi.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Process Timeline Flow */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 pb-12 relative overflow-hidden">
                    <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-8">Process Timeline</h3>
                    <div className="relative flex items-center justify-between px-4 sm:px-12 w-full z-10">
                        {/* Background Track */}
                        <div className="absolute left-16 right-16 top-1/2 h-1.5 bg-slate-100 -translate-y-1/2 rounded-full z-0"></div>

                        {allNodes.map((node, index) => {
                            const isActive = node.id === stageId;
                            const isPast = index < currentIndex;

                            return (
                                <React.Fragment key={node.id}>
                                    {/* Active Pipeline Fill */}
                                    {index > 0 && isPast && (
                                        <div className="absolute h-1.5 bg-[#1A56DB] z-10" style={{
                                            left: `calc(${(index - 1) * 20}% + 60px)`,
                                            width: 'calc(20% - 120px)',
                                            top: '50%',
                                            transform: 'translateY(-50%)'
                                        }}></div>
                                    )}

                                    <Link to={`/process-flow/${node.id}`} className="flex flex-col items-center gap-4 relative z-20 group">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-[3px] transition-all duration-300 ${isActive ? 'bg-[#1A56DB] border-blue-100 scale-125 shadow-xl shadow-blue-500/30' :
                                            isPast ? 'bg-white border-[#1A56DB] text-[#1A56DB] hover:bg-blue-50' :
                                                'bg-white border-slate-200 text-slate-300 hover:border-slate-300'
                                            }`}>
                                            <node.icon size={isActive ? 28 : 24} className={isActive ? 'text-white' : ''} />
                                        </div>
                                        <div className={`absolute -bottom-8 whitespace-nowrap text-[11px] font-bold uppercase tracking-widest ${isActive ? 'text-[#1A56DB]' : 'text-slate-400'}`}>
                                            {node.title}
                                        </div>
                                    </Link>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Core Layout: Main Data vs Sidebar */}
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Main Content Area (Assets & Telemetry) */}
                    <div className="flex-1 flex flex-col gap-6">
                        <h2 className="text-[16px] font-bold text-gray-900 flex items-center gap-2"><Cpu size={20} className="text-[#1A56DB]" /> Live Asset Telemetry</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sData.assets.map((asset, i) => (
                                <div key={i} className={`bg-white rounded-xl border p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${asset.status === 'Critical' ? 'border-red-200 bg-red-50/20' : asset.status === 'Warning' ? 'border-orange-200 bg-orange-50/20' : 'border-gray-200'}`}>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${asset.status === 'Critical' ? 'bg-red-100' : 'bg-[#EEF2FF]'}`}>
                                                <Server size={18} className={asset.status === 'Critical' ? 'text-red-600' : 'text-[#1A56DB]'} />
                                            </div>
                                            <h3 className="font-bold text-[15px] text-gray-900">{asset.name}</h3>
                                        </div>
                                        <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-md ${asset.status === 'Critical' ? 'bg-red-100 text-red-700' :
                                            asset.status === 'Warning' ? 'bg-orange-100 text-orange-700' :
                                                'bg-emerald-100 text-emerald-700'
                                            }`}>{asset.status}</span>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                                <span>Torque Load</span><span className="text-gray-900">{asset.load}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${asset.status === 'Critical' ? 'bg-red-500' : 'bg-[#1A56DB]'}`} style={{ width: `${asset.load}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest pt-2 border-t border-slate-100">
                                            <span>Bearing Temp</span><span className={asset.status === 'Critical' ? 'text-red-600 font-extrabold text-[13px]' : 'text-gray-900'}>{asset.temp}</span>
                                        </div>
                                        <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                            <span>Health Score</span><span className="text-emerald-500 font-extrabold text-[13px]">{asset.health}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Copilot Sidebar */}
                    <div className="w-full lg:w-[380px] bg-white rounded-xl border border-gray-200 shadow-lg flex flex-col overflow-hidden shrink-0">
                        <div className="p-4 bg-[#1A56DB] flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                                <Target size={20} className="text-blue-200" />
                                <h2 className="font-bold text-[15px]">Mill AI Copilot</h2>
                            </div>
                            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#1A56DB] shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                        </div>

                        <div className="flex-1 p-5 flex flex-col gap-6 bg-slate-50/50">
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-[13px] leading-relaxed text-gray-600 font-medium">
                                {sData.copilot}
                            </div>

                            <button className="w-full bg-[#1A56DB] hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl"></div>
                                <Zap size={16} /> Execute Action Parameter
                            </button>

                            <div className="flex flex-col gap-3 mt-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2">Suggested Queries</span>
                                <button className="text-left text-[13px] font-bold text-gray-700 hover:text-[#1A56DB] bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow transition-all">Compare Pol vs Last Week</button>
                                <button className="text-left text-[13px] font-bold text-gray-700 hover:text-[#1A56DB] bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow transition-all">Identify Worst Performing Zone</button>
                                <button className="text-left text-[13px] font-bold text-gray-700 hover:text-[#1A56DB] bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow transition-all">Generate Yield Forecast (24h)</button>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 bg-white">
                            <div className="relative">
                                <input type="text" placeholder="Ask your AI Copilot..." className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-[13px] font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent transition-all" />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A56DB] hover:text-blue-700 transition-colors">
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
