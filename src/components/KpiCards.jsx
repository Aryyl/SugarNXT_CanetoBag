import React from 'react';
import { TrendingUp, TrendingDown, Minus, CheckCircle, Zap } from 'lucide-react';
import { useSugarMill } from '../context/SugarMillContext';

export default function KpiCards() {
    const { metrics } = useSugarMill();

    const kpis = [
        { title: 'TOTAL CANE', value: Number(metrics.input.totalCane).toLocaleString(), unit: 'Tons', trend: '+12%', type: 'up', color: 'text-green-600' },
        { title: 'AVG POL %', value: metrics.input.polPercent, unit: 'Live', trend: '-0.5%', type: 'down', color: 'text-red-500' },
        { title: 'THROUGH PUT', value: metrics.input.crushRate, unit: 'T/H', trend: 'Stable', type: 'flat', color: 'text-amber-500' },
        { title: 'AUTOMATION', value: `${metrics.health.automationIndex}%`, unit: '', trend: '+5%', type: 'up', color: 'text-green-600' },
        { title: 'HEALTH INDEX', value: `${metrics.health.healthIndex}%`, unit: '', trend: 'Optimized', type: 'check', color: 'text-blue-600' },
        { title: 'DOWNTIME SAVED', value: '4.5', unit: 'Hrs', trend: '+ 1.2h today', type: 'up', color: 'text-green-600' },
        { title: 'EST. SAVINGS', value: `₹${(metrics.derived.maintenanceSavings / 100000).toFixed(1)}L`, unit: '', trend: '↑ AI ROI', type: 'up', color: 'text-green-600' },
        { title: 'ENERGY', value: metrics.health.energyUsage, unit: 'kWh/T', trend: 'Energy Spike', type: 'down', color: 'text-red-500' },
    ];

    const TrendIcon = ({ type, color }) => {
        if (type === 'up') return <TrendingUp size={14} className={color} strokeWidth={3} />;
        if (type === 'down') return <TrendingDown size={14} className={color} strokeWidth={3} />;
        if (type === 'check') return <CheckCircle size={14} className={color} strokeWidth={3} />;
        if (type === 'flat') return <Minus size={14} className={color} strokeWidth={3} />;
        return null;
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {kpis.map((kpi, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight w-16">
                        {kpi.title}
                    </h3>

                    <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900 leading-none">{kpi.value}</span>
                        {kpi.unit && <span className="text-[10px] font-bold text-gray-400">{kpi.unit}</span>}
                    </div>

                    <div className={`mt-auto flex items-center gap-1.5 text-xs font-bold ${kpi.color}`}>
                        <TrendIcon type={kpi.type} color={kpi.color} />
                        <span>{kpi.trend}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
