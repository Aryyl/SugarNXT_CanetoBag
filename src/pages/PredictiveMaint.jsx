import React from 'react';
import { Gauge, Clock, AlertTriangle, CheckCircle, Wrench, Settings, Activity } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function PredictiveMaint() {
    const equipment = [
        { name: 'Cane Crusher Drives', health: 82, predictedFailure: '45 Days', status: 'optimal' },
        { name: 'Centrifuge Bearings', health: 41, predictedFailure: '12 Days', status: 'warning' },
        { name: 'Boiler Feed Pumps', health: 18, predictedFailure: '3 Days', status: 'critical' },
        { name: 'Crystallizer Seals', health: 95, predictedFailure: '180 Days', status: 'optimal' },
    ];

    const anomalies = [
        { id: 'ANM-801', area: 'Clarification', issue: 'High vibration frequency detected (120Hz).', severity: 'Medium', time: '14 Mins Ago' },
        { id: 'ANM-802', area: 'Power Gen', issue: 'Thermal runaway risk; rotor temp +12% over baseline.', severity: 'High', time: '42 Mins Ago' },
        { id: 'ANM-803', area: 'Logistics', issue: 'Unloading crane hydraulic pressure drop (-5 Bar).', severity: 'Low', time: '2 Hrs Ago' },
    ];

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-gray-50 pb-12">
            <TopBar breadcrumb="Predictive Maint" title="Equipment Lifecycles" />

            <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-[1400px]">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">Predictive Maintenance</h1>
                        <p className="text-gray-500 font-medium mt-1 text-[15px]">AI-driven anomaly detection and component lifecycle tracking.</p>
                    </div>
                    <button className="px-5 py-2.5 rounded-md bg-[#111827] hover:bg-black text-white text-xs font-bold uppercase tracking-widest shadow-sm transition-colors flex items-center gap-2">
                        <Wrench size={16} /> Schedule Total Outage
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Component Lifecycles */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <Clock className="text-[#1A56DB]" size={24} />
                            <h2 className="text-lg font-bold text-gray-900">Machine Health & Lifecycle Remaining</h2>
                        </div>

                        <div className="flex flex-col gap-6">
                            {equipment.map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-3">
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-2">
                                            <Settings size={18} className="text-slate-400" />
                                            <span className="font-bold text-slate-800">{item.name}</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Failure in: <span className={`text-[13px] font-extrabold ${item.status === 'critical' ? 'text-red-500' : 'text-slate-700'}`}>{item.predictedFailure}</span></span>
                                            <span className="text-sm font-extrabold text-[#1A56DB]">{item.health}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                                        <div
                                            className={`h-full rounded-full ${item.status === 'critical' ? 'bg-red-500' : item.status === 'warning' ? 'bg-orange-400' : 'bg-emerald-500'}`}
                                            style={{ width: `${item.health}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Model Health */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <Activity className="text-[#1A56DB]" size={24} />
                            <h2 className="text-lg font-bold text-gray-900">Sensor & Telemetry Status</h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 flex items-start gap-4">
                                <Gauge className="text-emerald-600 mt-0.5" size={20} />
                                <div>
                                    <h4 className="text-[13px] font-bold text-emerald-900">Sensor Mesh Network</h4>
                                    <p className="text-[11px] text-emerald-700 font-medium mt-1 leading-snug">4,281/4,290 IoT end-nodes actively broadcasting vibration and thermal telemetry.</p>
                                </div>
                            </div>

                            <div className="p-4 flex flex-col gap-2 border-l-2 border-blue-500 bg-blue-50/50">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Vibration Drift Variance</span>
                                <span className="text-xl font-extrabold text-blue-800">1.04%</span>
                            </div>
                        </div>
                    </div>

                    {/* Anomaly Detection Log */}
                    <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="text-orange-500" size={24} />
                                <h2 className="text-lg font-bold text-gray-900">Machine Learning Anomaly Logs</h2>
                            </div>
                            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">{anomalies.length} Detected</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3.5 text-[11px] uppercase font-extrabold text-slate-500 tracking-wider">ID</th>
                                        <th className="px-6 py-3.5 text-[11px] uppercase font-extrabold text-slate-500 tracking-wider">Process Area</th>
                                        <th className="px-6 py-3.5 text-[11px] uppercase font-extrabold text-slate-500 tracking-wider">Deviation Issue</th>
                                        <th className="px-6 py-3.5 text-[11px] uppercase font-extrabold text-slate-500 tracking-wider">Severity</th>
                                        <th className="px-6 py-3.5 text-[11px] uppercase font-extrabold text-slate-500 tracking-wider text-right">Detection Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {anomalies.map((anm) => (
                                        <tr key={anm.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 text-[13px] font-bold text-gray-400">{anm.id}</td>
                                            <td className="px-6 py-4 text-[14px] font-bold text-gray-900">{anm.area}</td>
                                            <td className="px-6 py-4 text-[13px] font-medium text-gray-600 max-w-[300px] truncate">{anm.issue}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${anm.severity === 'High' ? 'bg-red-100 text-red-700' : anm.severity === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {anm.severity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-[12px] font-semibold text-gray-400 text-right">{anm.time}</td>
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
