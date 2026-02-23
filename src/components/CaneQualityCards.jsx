import React from 'react';

export default function CaneQualityCards() {
    const cards = [
        {
            title: 'Current Pol %',
            value: '14.2%',
            sub: '~+0.12',
            subColor: 'text-[#059669]',
            chartLine: true
        },
        {
            title: '5-Min Avg Pol',
            value: '13.85%',
            sub: 'Target: 14.0',
            subColor: 'text-gray-400',
            bars: true
        },
        {
            title: 'Accuracy Score',
            value: '99.2%',
            sub: 'NIR SENSOR CALIBRATED',
            subColor: 'text-[#059669]',
            hasTag: true
        },
        {
            title: 'Accuracy Deviation',
            value: '-0.05%',
            valueColor: 'text-[#E02424]',
            sub: 'vs. Offline Lab Comparison',
            subColor: 'text-gray-400'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between h-36">
                    <p className="text-[13px] font-bold text-gray-500">{card.title}</p>

                    <div className="mt-3 flex items-baseline gap-2">
                        <span className={`text-[32px] font-extrabold tracking-tight ${card.valueColor || 'text-[#1A56DB]'}`}>
                            {card.value}
                        </span>
                        {!card.hasTag && !card.bars && !card.chartLine && (
                            <span className={`text-[11px] font-bold ${card.subColor}`}>{card.sub}</span>
                        )}
                    </div>

                    <div className="mt-auto flex items-end justify-between">
                        {card.hasTag && (
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-400 tracking-widest">{card.sub.split(' ')[0]} {card.sub.split(' ')[1]}</span>
                                <span className="text-[10px] font-bold text-[#1A56DB] tracking-widest">{card.sub.split(' ')[2]}</span>
                            </div>
                        )}

                        {card.chartLine && (
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden flex">
                                    <div className="w-2/3 bg-[#1A56DB] h-full"></div>
                                </div>
                                <span className={`text-[12px] font-bold ${card.subColor}`}>{card.sub}</span>
                            </div>
                        )}

                        {card.bars && (
                            <div className="flex items-end gap-1 h-6">
                                <div className="w-3 bg-gray-100 h-2 rounded-t-sm"></div>
                                <div className="w-3 bg-gray-200 h-3 rounded-t-sm"></div>
                                <div className="w-3 bg-[#BFDBFE] h-4 rounded-t-sm"></div>
                                <div className="w-3 bg-[#1A56DB] h-6 rounded-t-sm"></div>
                            </div>
                        )}

                        {!card.hasTag && !card.chartLine && !card.bars && (
                            <span className={`text-[10px] font-bold ${card.subColor}`}>{card.sub}</span>
                        )}

                        {card.hasTag && <span className={`text-[12px] font-bold ${card.subColor}`}>Optimal</span>}
                        {card.bars && <span className={`text-[11px] font-bold ${card.subColor}`}>{card.sub}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
}
