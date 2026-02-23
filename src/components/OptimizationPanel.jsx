import React from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';

export default function OptimizationPanel() {
    return (
        <div className="bg-[#F0F5FA] rounded-xl border border-blue-100 p-5 shadow-sm h-full flex flex-col justify-between">

            {/* Header */}
            <div className="flex flex-col items-center justify-center text-center mb-5 mt-2">
                <Sparkles className="text-[#1A56DB] mb-2" size={24} />
                <h2 className="text-[17px] font-bold text-[#1A56DB] leading-tight">AI Optimization<br />Panel</h2>
            </div>

            <div className="flex flex-col gap-4">
                {/* Recommended Action Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-white">
                    <p className="text-[10px] font-bold text-[#1A56DB] uppercase tracking-widest mb-1.5">RECOMMENDED ACTION</p>
                    <p className="text-[#111827] font-bold text-[15px] mb-4 leading-snug">Adjust Milling Pressure +4%</p>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-[#1A56DB] hover:bg-blue-800 text-white py-2 rounded-lg text-xs font-bold transition-colors">
                            Apply Optimization
                        </button>
                        <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
                            Details
                        </button>
                    </div>
                </div>

                {/* Toggle (Clean Layout) */}
                <div className="flex items-center justify-between px-2 mt-1">
                    <span className="text-sm font-bold text-gray-800">Automatic Adjustment</span>
                    {/* Toggle UI */}
                    <div className="w-10 h-6 bg-[#1A56DB] rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                </div>

                {/* Cleanly laid out Alert Card (Fixing the overlap) */}
                <div className="bg-white rounded-xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-100 relative mt-2">
                    {/* A small nub to signify it's a dropdown/tooltip-like overlay from the toggle context if desired, or just a floating card */}
                    <div className="flex gap-2 items-start mb-2">
                        <AlertTriangle className="text-[#D03801] shrink-0 mt-0.5" size={16} />
                        <div>
                            <p className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-1">STABILITY ALERT</p>
                            <p className="text-[13px] text-gray-600 font-medium leading-snug">
                                Fiber content rising in Zone B batches. Increase Steam Input.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">CONFIDENCE: <span className="text-gray-700">92%</span></span>
                        <div className="flex gap-3">
                            <button className="text-[11px] font-bold text-[#1A56DB] hover:text-blue-800">Dismiss</button>
                            <button className="text-[11px] font-bold text-[#1A56DB] hover:text-blue-800">High Quality Only</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
