import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function CriticalAlerts() {
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            title: 'HIGH VIBRATION',
            time: '2m ago',
            desc: 'Mill 2 Roller bearing exceeding threshold (4.2 mm/s)',
            type: 'critical',
            actions: ['Shut Mill', 'Inspect']
        },
        {
            id: 2,
            title: 'LOW POL DETECTED',
            time: '15m ago',
            desc: 'Clarifier exit Pol % dropped to 13.8%. AI adjusting lime.',
            type: 'warning'
        },
        {
            id: 3,
            title: 'STEAM IMBALANCE',
            time: '1h ago',
            desc: 'Header pressure fluctuating +/- 0.5 bar.',
            type: 'warning'
        },
        {
            id: 4,
            title: 'MAINTENANCE SCHEDULED',
            time: 'Scheduled',
            desc: 'Evaporator Clean cycle set for 02:00 AM.',
            type: 'info'
        }
    ]);

    const dismissAlert = (id) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col h-full shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Critical Alerts</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${alerts.length > 0 ? 'bg-[#FDE8E8] text-[#C81E1E]' : 'bg-emerald-50 text-emerald-600'}`}>
                    {alerts.length} ACTIVE
                </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {alerts.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                        <CheckCircle2 size={40} className="text-emerald-500 mb-3" />
                        <h3 className="text-gray-900 font-bold">All Clear</h3>
                        <p className="text-sm text-gray-500 mt-1">No active critical alerts.</p>
                    </div>
                ) : (
                    alerts.map((alert) => {
                        let styleClass = '';
                        if (alert.type === 'critical') {
                            styleClass = 'border-l-4 border-l-[#E02424] bg-[#FDF2F2] p-4 rounded-r-lg shadow-sm transition-all';
                        } else if (alert.type === 'warning') {
                            styleClass = 'border-l-4 border-l-[#D03801] bg-[#FFFBEB] p-4 rounded-r-lg shadow-sm transition-all';
                        } else if (alert.type === 'info') {
                            styleClass = 'border-l-4 border-l-[#1C64F2] bg-[#EFF6FF] p-4 rounded-r-lg shadow-sm transition-all';
                        }

                        return (
                            <div key={alert.id} className={styleClass}>
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-xs font-bold uppercase tracking-wide
                      ${alert.type === 'critical' ? 'text-[#E02424]' : ''}
                      ${alert.type === 'warning' ? 'text-[#D03801]' : ''}
                      ${alert.type === 'info' ? 'text-[#1C64F2]' : ''}
                    `}>
                                        {alert.title}
                                    </span>
                                    <span className={`text-[10px] font-medium 
                      ${alert.type === 'info' ? 'text-blue-500' : 'text-orange-500'}`}>
                                        {alert.time}
                                    </span>
                                </div>
                                <p className={`text-sm ${alert.type === 'critical' ? 'text-[#9B1C1C]' : 'text-gray-700'}`}>
                                    {alert.desc}
                                </p>

                                <div className="flex justify-between items-center mt-3">
                                    {alert.actions ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => dismissAlert(alert.id)}
                                                className="bg-[#E02424] text-white px-3 py-1.5 rounded text-xs font-semibold shadow-sm hover:bg-red-700 transition-colors active:scale-95"
                                            >
                                                {alert.actions[0]}
                                            </button>
                                            <button
                                                onClick={() => dismissAlert(alert.id)}
                                                className="bg-white border border-red-200 text-[#E02424] px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-50 transition-colors active:scale-95"
                                            >
                                                {alert.actions[1]}
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => dismissAlert(alert.id)}
                                            className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors ml-auto"
                                        >
                                            Dismiss
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <button
                onClick={() => setAlerts([])}
                disabled={alerts.length === 0}
                className={`mt-6 w-full py-2.5 rounded-lg border text-sm font-semibold flex justify-center items-center transition-colors ${alerts.length === 0 ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' : 'border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95'}`}
            >
                Clear All Alerts
            </button>
        </div>
    );
}
