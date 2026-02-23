import React from 'react';
import { Truck, AlignJustify, Droplets, Cloud, Grip, Archive, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProcessFlow() {
    const steps = [
        { id: 'cane-yard', name: 'CANE YARD', icon: Truck, status: 'ACTIVE', statusColor: 'bg-[#ECFDF5] text-[#059669]', active: true },
        { id: 'milling', name: 'MILLING', icon: AlignJustify, status: '92% LOAD', statusColor: 'bg-[#F3F4F6] text-[#6B7280]' },
        { id: 'clarification', name: 'CLARIFICATION', icon: Droplets, status: 'CHECK TEMP', statusColor: 'bg-[#FFFBEB] text-[#D97706]' },
        { id: 'evaporation', name: 'EVAPORATION', icon: Cloud, status: 'OPTIMAL', statusColor: 'bg-[#ECFDF5] text-[#059669]' },
        { id: 'crystallize', name: 'CRYSTALLIZE', icon: Grip, status: '85% BRIX', statusColor: 'bg-[#F3F4F6] text-[#6B7280]' },
        { id: 'bagging', name: 'BAGGING', icon: Archive, status: 'WAITING', statusColor: 'bg-[#F3F4F6] text-[#6B7280]' },
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Process Flow Visualization</h2>
                    <p className="text-sm text-gray-400">Live schematic from Cane Yard to Bagging</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#EFF6FF] text-[#1A56DB] px-3 py-1.5 rounded-full text-xs font-bold tracking-wide">
                    <Sparkles size={14} />
                    FULL AUTOPILOT
                </div>
            </div>

            <div className="relative flex justify-between items-start max-w-4xl mx-auto px-4 mt-4 mb-2 z-0">
                {/* Connection Line perfectly centered behind the 16x16 icon blocks (top-8) */}
                <div className="absolute left-12 right-12 top-8 -translate-y-1/2 h-[6px] bg-[#F1F5F9] -z-10 rounded-full"></div>

                {steps.map((step, idx) => (
                    <Link to={`/process-flow/${step.id}`} key={idx} className="flex flex-col items-center gap-3 group">
                        <div className={`w-16 h-16 bg-white rounded-[14px] border-[2.5px] flex items-center justify-center relative transition-all border-[#1A56DB] text-[#1A56DB] group-hover:bg-[#1A56DB] group-hover:text-white group-hover:scale-105 ${step.active ? 'shadow-[0_4px_20px_rgba(26,86,219,0.15)]' : ''}`}>
                            <step.icon size={26} strokeWidth={2.5} />

                            {step.active && (
                                <div className="absolute -top-2 -right-2 w-[22px] h-[22px] bg-[#10B981] rounded-full border-2 border-white flex items-center justify-center group-hover:border-[#1A56DB] transition-colors">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <div className="text-center mt-2 flex flex-col items-center">
                            <p className="text-[12px] font-bold text-[#374151] tracking-widest group-hover:text-[#1A56DB] transition-colors">{step.name}</p>
                            <div className="mt-2 text-center h-[24px] flex items-center justify-center">
                                <span className={`text-[10.5px] uppercase font-bold inline-block px-3 py-1 rounded-full ${step.statusColor} group-hover:ring-2 group-hover:ring-offset-1 group-hover:ring-[#1A56DB]/30 transition-all`}>
                                    {step.status}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
