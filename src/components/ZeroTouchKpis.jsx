import React from 'react';
import { useSugarMill } from '../context/SugarMillContext';

export default function ZeroTouchKpis() {
    const { metrics } = useSugarMill();

    const kpis = [
        { title: 'FEED RATE', value: metrics.input.crushRate, unit: 'T/h', trend: '+2.4%', trendColor: 'text-[#059669]' },
        { title: 'BOILER PRESSURE', value: metrics.processes.boilerPressure, unit: 'Bar', trend: '-0.5%', trendColor: 'text-[#E02424]' },
        { title: 'PUMP LOAD', value: metrics.processes.millingLoad, unit: '%', trend: '+1.2%', trendColor: 'text-[#059669]' },
        { title: 'CRYST. BRIX', value: metrics.processes.crystallizerBrix, unit: '%', trend: 'Steady', trendColor: 'text-gray-400', isSteady: true },
        { title: 'SUGAR YIELD', value: metrics.derived.sugarProduced, unit: 'T', trend: '-1.1%', trendColor: 'text-[#E02424]' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {kpis.map((kpi, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{kpi.title}</p>
                    <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{kpi.value}</span>
                        <span className="text-[13px] font-bold text-gray-400">{kpi.unit}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                        {!kpi.isSteady && kpi.trend.includes('+') && (
                            <svg className={`w-3 h-3 ${kpi.trendColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        )}
                        {!kpi.isSteady && kpi.trend.includes('-') && (
                            <svg className={`w-3 h-3 ${kpi.trendColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        )}
                        {kpi.isSteady && (
                            <div className="w-3 h-[2px] bg-gray-400 rounded-full"></div>
                        )}
                        <span className={`text-[12px] font-bold ${kpi.trendColor}`}>{kpi.isSteady ? '— ' : ''}{kpi.trend}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
