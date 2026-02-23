import React from 'react';

export default function VerticalGauge({ label, value, optimalStart = 30, optimalEnd = 70, isCritical = false }) {
    // Normalize value between 0-100 for percentage
    const percent = Math.min(Math.max(value, 0), 100);

    // High-performance HMI colors
    let barColor = "bg-slate-800"; // Dark normal color
    if (isCritical) barColor = "bg-red-500"; // Red alarm
    else if (percent > optimalStart && percent < optimalEnd) barColor = "bg-sky-500"; // Inside optimal, use vibrant active blue

    return (
        <div className="flex flex-col items-center gap-2">
            {/* Gauge Container */}
            <div className="relative w-8 h-48 bg-gray-200 rounded-sm overflow-hidden flex flex-col justify-end shadow-inner border border-gray-300">

                {/* Optimal Range Highlight Box */}
                <div
                    className="absolute w-full bg-white opacity-60 z-10 pointer-events-none"
                    style={{
                        bottom: `${optimalStart}%`,
                        height: `${optimalEnd - optimalStart}%`
                    }}
                ></div>

                {/* Dynamic Bar */}
                <div
                    className={`w-full ${barColor} z-20 transition-all duration-500`}
                    style={{ height: `${percent}%` }}
                ></div>

                {/* Pointer Arrow */}
                <div
                    className="absolute left-0 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-black z-30"
                    style={{ bottom: `calc(${percent}% - 4px)` }}
                ></div>
            </div>

            {/* Label & Value */}
            <div className="text-center mt-1">
                <div className={`text-[12px] font-bold ${isCritical ? 'text-red-600' : 'text-sky-700'}`}>
                    {value.toFixed(1)}
                </div>
                <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mt-0.5">
                    {label}
                </div>
            </div>
        </div>
    );
}
