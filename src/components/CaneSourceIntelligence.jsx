import React from 'react';
import { MapPin } from 'lucide-react';

export default function CaneSourceIntelligence() {
    const sources = [
        {
            id: 'T-8842-XJ',
            status: 'IN QUEUE',
            statusColor: 'bg-[#EFF6FF] text-[#1A56DB]',
            farmer: 'Deshmukh Farms',
            zone: 'Z-04',
            rank: 3,
            yieldTitle: 'PREDICTED YIELD',
            yieldVal: '82.4 Tons/ha',
            location: 'East Valley'
        },
        {
            id: 'T-9102-AQ',
            status: 'UNLOADING',
            statusColor: 'bg-[#FFFBEB] text-[#D97706]',
            farmer: 'Green Valley Co-op',
            zone: 'Z-02',
            rank: 4,
            yieldTitle: 'PREDICTED YIELD',
            yieldVal: '91.0 Tons/ha',
            location: 'North Plateau'
        },
        {
            id: 'T-2210-KM',
            status: 'ARRIVING',
            statusColor: 'bg-[#F3F4F6] text-[#6B7280]',
            farmer: 'SK Enterprises',
            zone: 'Z-11',
            rank: 2,
            yieldTitle: 'PREDICTED YIELD',
            yieldVal: '76.5 Tons/ha',
            location: 'River Basin'
        }
    ];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Cane Source Intelligence</h2>
                <div className="flex gap-2">
                    <button className="bg-white border border-gray-200 text-gray-700 font-bold text-xs px-4 py-1.5 rounded-full hover:bg-gray-50">
                        All Vehicles
                    </button>
                    <button className="bg-white border text-gray-400 font-bold text-xs px-4 py-1.5 rounded-full hover:bg-gray-50 border-white">
                        High Quality Only
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sources.map((source, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col gap-5 relative">

                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">VEHICLE ID</p>
                                <p className="text-[17px] font-bold text-gray-900">{source.id}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${source.statusColor}`}>
                                {source.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1 flex items-center h-6">FARMER / ZONE</p>
                                <p className="text-[13px] font-bold text-gray-900 leading-snug">{source.farmer} / {source.zone}</p>
                            </div>
                            <div className="pl-4">
                                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1 flex items-center h-6">HISTORICAL RANK</p>
                                <div className="flex gap-1 mt-1">
                                    {[1, 2, 3, 4, 5].map((dot) => (
                                        <div key={dot} className={`w-2 h-2 rounded-full ${dot <= source.rank ? 'bg-[#1A56DB]' : 'bg-gray-200'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1 flex items-center h-6">{source.yieldTitle}</p>
                                <p className="text-[13px] font-bold text-gray-900 leading-snug">{source.yieldVal.split(' ')[0]}<br /><span className="text-gray-500 font-medium">{source.yieldVal.split(' ')[1]}</span></p>
                            </div>
                            <div className="pl-4">
                                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1 flex items-center h-6">LOCATION</p>
                                <div className="flex items-start gap-1 mt-0.5">
                                    <MapPin size={12} className="text-gray-400 mt-0.5 shrink-0" />
                                    <p className="text-[13px] font-bold text-gray-900 leading-snug">{source.location}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
