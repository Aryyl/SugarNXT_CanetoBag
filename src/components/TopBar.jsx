import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Bell, ChevronRight, AlertTriangle, AlertCircle, Info, CheckCircle2, X, Maximize } from 'lucide-react';

export default function TopBar({ breadcrumb = "Command Center", title = "Real-time Mill Overview" }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'critical', text: 'Vibration anomaly detected on Mill Tandem 2', time: 'Just now' },
        { id: 2, type: 'warning', text: 'Boiler 3 pressure slowly dropping', time: '15 mins ago' },
        { id: 3, type: 'info', text: 'Shift B operational handover complete', time: '2 hours ago' }
    ]);
    const notifRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const clearNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getIcon = (type) => {
        if (type === 'critical') return <AlertTriangle size={14} className="text-red-500" />;
        if (type === 'warning') return <AlertCircle size={14} className="text-amber-500" />;
        return <Info size={14} className="text-blue-500" />;
    };

    const formattedDate = currentTime.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 w-full relative">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm shrink-0">
                <span className="text-gray-400 font-medium">{breadcrumb}</span>
                <ChevronRight size={16} className="text-gray-300 mx-2" />
                <span className="text-gray-900 font-bold">{title}</span>
            </div>

            {/* Right Tools */}
            <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
                <div className="items-center gap-2 hidden lg:flex">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="min-w-[90px]">{formattedDate}</span>
                </div>

                <div className="items-center gap-2 hidden lg:flex">
                    <Clock size={16} className="text-gray-400" />
                    <span className="min-w-[85px]">{formattedTime}</span>
                </div>

                <div className="flex items-center gap-2 bg-[#ECFDF5] text-[#059669] px-3 py-1.5 rounded-full border border-[#A7F3D0] ml-2">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                    <span className="text-xs font-bold tracking-wide">LIVE SYSTEM ACTIVE</span>
                </div>

                <div className="flex items-center gap-1 ml-2">
                    <button onClick={toggleFullScreen} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors" title="Toggle Fullscreen">
                        <Maximize size={16} />
                    </button>
                </div>

                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className={`text-gray-400 relative ml-2 p-1.5 rounded-full border border-gray-200 transition-colors ${isNotifOpen ? 'bg-gray-100 text-gray-700' : 'hover:bg-gray-50 hover:text-gray-600'}`}
                    >
                        <Bell size={18} />
                        {notifications.length > 0 && (
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        )}
                    </button>

                    {/* Notification Dropdown Profile */}
                    {isNotifOpen && (
                        <div className="absolute right-0 top-full mt-3 w-80 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden py-2 animate-in slide-in-from-top-2 z-50">
                            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="font-bold text-gray-900">Notifications</h3>
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{notifications.length} New</span>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-6 text-center text-gray-400 flex flex-col items-center">
                                        <CheckCircle2 size={24} className="mb-2 text-gray-300" />
                                        <p className="text-sm">You're all caught up!</p>
                                    </div>
                                ) : (
                                    notifications.map(n => (
                                        <div key={n.id} className="p-4 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors group cursor-pointer">
                                            <div className="flex gap-3">
                                                <div className="mt-0.5 shrink-0 bg-white border border-gray-100 shadow-sm p-1.5 rounded-lg h-min">
                                                    {getIcon(n.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[13px] text-gray-800 font-medium leading-tight">{n.text}</p>
                                                    <p className="text-[11px] text-gray-400 mt-1.5 font-semibold">{n.time}</p>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); clearNotification(n.id); }} className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            {notifications.length > 0 && (
                                <div className="p-2 border-t border-gray-50 bg-white text-center">
                                    <button onClick={() => setNotifications([])} className="text-[12px] font-bold text-[#1A56DB] hover:underline w-full py-1.5">Mark all as read</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
