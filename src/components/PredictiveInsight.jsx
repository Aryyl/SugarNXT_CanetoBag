import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function PredictiveInsight() {
    const [status, setStatus] = useState('active'); // active, applied, dismissed

    if (status === 'dismissed') return null;

    if (status === 'applied') {
        return (
            <div className="bg-[#ECFDF5] rounded-xl border border-[#A7F3D0] p-6 flex items-center gap-4 shadow-sm mt-auto shrink-0 transition-all">
                <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <CheckCircle2 className="text-white" size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-[#065F46]">Recommendation Successfully Applied</h3>
                    <p className="text-xs text-[#047857] mt-1">Boiler steam header pressure will increment by 0.2 bar at 3:30 PM.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F0F4F8] rounded-xl border border-gray-200 p-6 flex items-center justify-between gap-6 shadow-sm mt-auto shrink-0 transition-all">

            <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Sparkles className="text-[#1C64F2]" size={28} />
                </div>

                <div>
                    <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-1.5">
                        Predictive Insight of the Hour
                    </h3>
                    <p className="text-[15px] text-gray-700 font-medium max-w-3xl leading-snug">
                        AI predicts a 15% throughput surge from the Cane Yard at 4 PM based on truck arrival patterns.
                        Recommendation: Increase boiler steam header pressure by 0.2 bar at 3:30 PM to optimize energy consumption.
                    </p>
                </div>
            </div>

            <div className="flex gap-3 shrink-0">
                <button
                    onClick={() => setStatus('applied')}
                    className="bg-[#1C64F2] hover:bg-[#1A56DB] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors active:scale-95"
                >
                    Apply Recommendation
                </button>
                <button
                    onClick={() => setStatus('dismissed')}
                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors active:scale-95"
                >
                    Dismiss
                </button>
            </div>

        </div>
    );
}
