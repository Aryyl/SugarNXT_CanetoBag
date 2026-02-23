import React, { useState } from 'react';
import { Lightbulb, Wrench, Hand, Filter } from 'lucide-react';

export default function ActivityLog() {
    const [filter, setFilter] = useState('All');

    const logs = [
        { id: 1, title: 'Load balanced across CNC units', author: 'AI System', type: 'AI', time: '11:30 AM', icon: Lightbulb, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 2, title: 'Preventive maintenance scheduled for M-002', author: 'Phil Chen', type: 'Manual', time: '11:10 AM', icon: Wrench, color: 'text-green-600', bg: 'bg-green-50' },
        { id: 3, title: 'Speed adjustment on M-005', author: 'Aditya Sharma', type: 'Manual', time: '10:30 AM', icon: Hand, color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 4, title: 'Energy optimization applied plant-wide', author: 'AI System', type: 'AI', time: '10:20 AM', icon: Lightbulb, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 5, title: 'Preventive maintenance scheduled', author: 'Aditya Sharma', type: 'Manual', time: '10:10 AM', icon: Wrench, color: 'text-green-600', bg: 'bg-green-50' },
        { id: 6, title: 'Load balanced across CNC units', author: 'AI System', type: 'AI', time: '9:10 AM', icon: Lightbulb, color: 'text-blue-500', bg: 'bg-blue-50' },
    ];

    const filteredLogs = filter === 'All' ? logs : logs.filter(l => l.type === filter);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex-1 flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Activity Log</h2>

                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {['All', 'AI', 'Manual'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filter === f ? 'bg-white text-[#1A56DB] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {filteredLogs.map((log, idx) => (
                    <div key={log.id} className="flex gap-4 items-start relative group hover:bg-slate-50 p-2 -m-2 rounded-xl transition-colors cursor-pointer">
                        {idx !== filteredLogs.length - 1 && (
                            <div className="absolute left-8 top-12 bottom-[-24px] w-px bg-gray-100 group-last:hidden"></div>
                        )}

                        <div className={`w-12 h-12 rounded-full ${log.bg} ${log.color} flex flex-col items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm group-hover:scale-110 transition-transform`}>
                            <log.icon size={20} strokeWidth={2} />
                        </div>

                        <div className="flex-1 pt-1.5 flex justify-between items-start">
                            <div>
                                <h4 className="text-[15px] font-medium text-gray-800 group-hover:text-[#1A56DB] transition-colors">{log.title}</h4>
                                <p className="text-xs text-gray-500 mt-1 font-medium">By: <span className={log.type === 'AI' ? 'text-blue-600 font-bold' : 'text-gray-700'}>{log.author}</span></p>
                            </div>
                            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">{log.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
