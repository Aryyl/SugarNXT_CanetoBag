import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ActiveExceptions() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 px-2">
                <AlertTriangle size={20} className="text-[#E02424]" />
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Active Exceptions</h2>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto pb-8 pr-2">

                {/* Exception 1: CRITICAL */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-gray-900 text-[15px]">Conveyor Jam</h3>
                        <span className="bg-[#FDE8E8] text-[#E02424] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-red-100">CRITICAL</span>
                    </div>
                    <div className="mb-4">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">ROOT CAUSE</p>
                        <p className="text-[13px] font-medium text-gray-600">Foreign object detected in Sector 4-B</p>
                    </div>
                    <div className="bg-[#F0F5FA] rounded-lg p-3 border border-blue-50 mb-4">
                        <p className="text-[10px] uppercase font-bold text-[#1A56DB] tracking-widest mb-1">SUGGESTED ACTION</p>
                        <p className="text-[12.5px] font-bold text-[#1A56DB]">Reverse Belt & Initiate Purge Cycle</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TIME TO FAILURE</p>
                        <p className="text-[13px] font-bold text-[#E02424]">04:32</p>
                    </div>
                </div>

                {/* Exception 2: WARNING */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-gray-900 text-[15px]">Steam Imbalance</h3>
                        <span className="bg-[#FFFBEB] text-[#D97706] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-amber-100">WARNING</span>
                    </div>
                    <div className="mb-4">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">ROOT CAUSE</p>
                        <p className="text-[13px] font-medium text-gray-600">Turbine Load Spike (+15%)</p>
                    </div>
                    <div className="bg-[#F0F5FA] rounded-lg p-3 border border-blue-50 mb-4">
                        <p className="text-[10px] uppercase font-bold text-[#1A56DB] tracking-widest mb-1">SUGGESTED ACTION</p>
                        <p className="text-[12.5px] font-bold text-[#1A56DB]">Modulate Exhaust Valve #2</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">STABILITY RATING</p>
                        <p className="text-[13px] font-bold text-[#D97706]">82%</p>
                    </div>
                </div>

                {/* Exception 3: RESOLVED */}
                <div className="bg-[#F9FAFB] rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 text-[15px]">Overload Alert</h3>
                        <span className="bg-white text-gray-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-gray-200">RESOLVED</span>
                    </div>
                    <div>
                        <p className="text-[13px] font-medium text-gray-500">Auto-corrected by AI Core at 14:22</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
