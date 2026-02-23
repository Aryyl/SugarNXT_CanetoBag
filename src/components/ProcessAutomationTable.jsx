import React from 'react';
import { CircleDashed } from 'lucide-react';
import { useSugarMill } from '../context/SugarMillContext';

export default function ProcessAutomationTable() {
    const { metrics } = useSugarMill();
    const base = Number(metrics.health.automationIndex);
    const rows = [
        { stage: 'Cane Unloading', mode: 'AUTONOMOUS', confidence: Math.min(100, Math.floor(base + 5)), action: 'Intervene', modeBg: 'bg-[#ECFDF5]', modeText: 'text-[#059669]', dot: 'bg-[#10B981]' },
        { stage: 'Cane Feed Control', mode: 'AUTONOMOUS', confidence: Math.min(100, Math.floor(base + 2)), action: 'Intervene', modeBg: 'bg-[#ECFDF5]', modeText: 'text-[#059669]', dot: 'bg-[#10B981]' },
        { stage: 'Milling Pressure', mode: 'AUTONOMOUS', confidence: Math.floor(base), action: 'Intervene', modeBg: 'bg-[#ECFDF5]', modeText: 'text-[#059669]', dot: 'bg-[#10B981]' },
        { stage: 'Steam Balance', mode: 'MANUAL OVERRIDE', confidence: null, action: 'Resume AI', modeBg: 'bg-[#FFFBEB]', modeText: 'text-[#D97706]', dot: 'bg-[#F59E0B]' },
        { stage: 'Bagging', mode: 'AUTONOMOUS', confidence: Math.min(100, Math.floor(base + 7)), action: 'Intervene', modeBg: 'bg-[#ECFDF5]', modeText: 'text-[#059669]', dot: 'bg-[#10B981]' },
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden mt-6">

            {/* Title Header */}
            <div className="p-4 px-6 flex items-center gap-3 bg-white border-b border-gray-100">
                <CircleDashed size={22} className="text-[#1A56DB]" strokeWidth={2.5} />
                <h2 className="text-[17px] font-bold text-[#111827] tracking-tight">Process Automation Status</h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-gray-100">
                            <th className="px-6 py-3.5 text-left text-[11px] uppercase font-extrabold text-slate-500 tracking-wider whitespace-nowrap">Process Stage</th>
                            <th className="px-6 py-3.5 text-left text-[11px] uppercase font-extrabold text-slate-500 tracking-wider whitespace-nowrap">Mode</th>
                            <th className="px-6 py-3.5 text-left text-[11px] uppercase font-extrabold text-slate-500 tracking-wider whitespace-nowrap">AI Confidence</th>
                            <th className="px-6 py-3.5 text-left text-[11px] uppercase font-extrabold text-slate-500 tracking-wider whitespace-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {rows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">

                                {/* Stage */}
                                <td className="px-6 py-4">
                                    <span className="text-[14px] font-bold text-[#111827]">{row.stage}</span>
                                </td>

                                {/* Mode Pill with Dot */}
                                <td className="px-6 py-4">
                                    <div className={`inline-flex items-center gap-2 ${row.modeBg} ${row.modeText} px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${row.dot}`}></div>
                                        {row.mode}
                                    </div>
                                </td>

                                {/* Confidence Progress Bar */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden shrink-0 block">
                                            <div
                                                className={`h-full rounded-full ${row.confidence ? 'bg-[#1A56DB]' : 'bg-transparent'}`}
                                                style={{ width: `${row.confidence || 0}%` }}
                                            ></div>
                                        </div>
                                        {row.confidence ? (
                                            <span className="text-[14px] font-extrabold text-[#111827] w-8">{row.confidence}%</span>
                                        ) : (
                                            <span className="text-[13px] font-bold text-gray-400 w-8">N/A</span>
                                        )}
                                    </div>
                                </td>

                                {/* Action Link */}
                                <td className="px-6 py-4">
                                    <button className="text-[13px] font-bold text-[#1A56DB] hover:text-blue-800 transition-colors">
                                        {row.action}
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
