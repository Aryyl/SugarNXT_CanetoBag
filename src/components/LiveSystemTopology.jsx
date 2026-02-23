import React from 'react';
import { PackageOpen } from 'lucide-react';

export default function LiveSystemTopology() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col h-full min-h-[320px]">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[18px] font-bold text-[#111827] tracking-tight">Live System Topology</h2>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#1A56DB] rounded-sm"></div>
                        <span className="text-[12px] font-bold text-gray-500">Process Flow</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#10B981] rounded-sm"></div>
                        <span className="text-[12px] font-bold text-gray-500">Optimal State</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 border-2 border-dashed border-gray-200 rounded-xl bg-[#FAFBFA] flex items-center justify-between p-6 overflow-hidden min-h-[160px]">

                {/* Inflow indicator - No border on pill */}
                <div className="bg-[#ECFDF5] text-[#059669] px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest shrink-0">
                    INFLOW
                </div>

                {/* Placeholder UI */}
                <div className="flex flex-col items-center justify-center text-center px-4 shrink-0">
                    <PackageOpen size={32} strokeWidth={1.5} className="text-gray-300 mb-4" />
                    <p className="text-[13px] font-medium text-gray-500 max-w-[200px] leading-relaxed">
                        Process schematic rendering active...
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 mt-2 tracking-widest uppercase">
                        NODE VISUALIZATION LAYER 1.4
                    </p>
                </div>

                {/* Yield indicator - No border on pill */}
                <div className="bg-[#EFF6FF] text-[#1A56DB] px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest shrink-0">
                    YIELD
                </div>

            </div>
        </div>
    );
}
