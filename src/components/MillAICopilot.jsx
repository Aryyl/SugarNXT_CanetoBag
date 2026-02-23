import React from 'react';
import { Bot, X, Send } from 'lucide-react';

export default function MillAICopilot() {
    return (
        <div className="flex flex-col h-full bg-white relative">

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-2">
                    <Bot size={20} className="text-[#1A56DB]" />
                    <h2 className="text-[15px] font-bold text-gray-900">Mill AI Copilot</h2>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <X size={18} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 pb-24">

                {/* Bot Message 1 */}
                <div className="flex flex-col gap-1 items-start">
                    <div className="bg-gray-50 text-gray-700 text-[13px] p-3.5 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed max-w-[90%] border border-gray-100">
                        System operational. Current throughput is at 92% of peak efficiency. I noticed a slight drop in Pol concentration from Zone B batches.
                    </div>
                </div>

                {/* User Message */}
                <div className="flex flex-col gap-1 items-end">
                    <div className="bg-[#EFF6FF] text-[#1A56DB] text-[13px] font-medium p-3.5 rounded-2xl rounded-tr-sm shadow-sm max-w-[90%]">
                        Why did throughput drop?
                    </div>
                </div>

                {/* Bot Message 2 */}
                <div className="flex flex-col gap-1 items-start">
                    <div className="bg-gray-50 text-gray-700 text-[13px] p-3.5 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed max-w-[95%] border border-gray-100">
                        Analyzing current flow... Throughput drop of 4% correlates with high fiber content in the last three loads. I recommend increasing the shredder speed by 150 RPM.
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button className="bg-[#1A56DB] hover:bg-blue-800 text-white text-[11px] font-bold px-3 py-1.5 rounded shadow-sm transition-colors">
                            Adjust RPM
                        </button>
                        <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold px-3 py-1.5 rounded shadow-sm transition-colors">
                            View Source
                        </button>
                    </div>
                </div>

                {/* Suggested Queries */}
                <div className="mt-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">SUGGESTED QUERIES</p>
                    <div className="flex flex-wrap gap-2">
                        <button className="bg-white border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-gray-50">Compare Pol vs Last Week</button>
                        <button className="bg-white border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-gray-50">Worst Performing Zone</button>
                        <button className="bg-white border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-gray-50">Yield Forecast (24h)</button>
                    </div>
                </div>

            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-10">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Ask your AI Copilot..."
                        className="w-full bg-gray-50 border border-gray-200 text-[13px] text-gray-900 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A56DB] hover:text-blue-800">
                        <Send size={16} />
                    </button>
                </div>
            </div>

        </div>
    );
}
