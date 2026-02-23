import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, LogOut, ShieldAlert, Bell, HelpCircle, Calendar, Clock, AlertTriangle, AlertCircle, Info, CheckCircle2, X, Maximize, FileText, Settings, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminTopBar({ breadcrumb = "Admin Panel", title = "" }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
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
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'critical', text: '5 Failed Login Attempts on Root Account', time: '10 mins ago' },
        { id: 2, type: 'warning', text: 'API Webhook "SAP Sync" high latency', time: '30 mins ago' },
        { id: 3, type: 'info', text: 'New Edge Device Provisioned successfully', time: '1 hour ago' }
    ]);
    const notifRef = useRef(null);
    const helpRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
            if (helpRef.current && !helpRef.current.contains(event.target)) {
                setIsHelpOpen(false);
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

    const formattedDate = currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 w-full relative">
            <div className="flex items-center text-sm shrink-0">
                <span className="text-gray-400 font-medium">{breadcrumb}</span>
                {title && (
                    <>
                        <ChevronRight size={16} className="text-gray-300 mx-2" />
                        <span className="text-[#111827] font-bold">{title}</span>
                    </>
                )}
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-4 text-gray-500 font-medium pl-4 pr-4 border-r border-gray-200 hidden md:flex">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-[13px]">{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-[13px]">{formattedTime}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-gray-500">
                    <button
                        onClick={toggleFullScreen}
                        className="hover:text-gray-900 border border-gray-200 rounded-full p-1.5 transition-colors hover:bg-gray-50"
                        title="Toggle Fullscreen"
                    >
                        <Maximize size={18} />
                    </button>
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => setIsNotifOpen(!isNotifOpen)}
                            className={`border border-gray-200 rounded-full p-1.5 relative transition-colors ${isNotifOpen ? 'bg-gray-100 text-gray-900 border-gray-300' : 'hover:text-gray-900 hover:bg-gray-50'}`}
                        >
                            <Bell size={18} />
                            {notifications.length > 0 && (
                                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                            )}
                        </button>

                        {/* Notification Dropdown Profile */}
                        {isNotifOpen && (
                            <div className="absolute right-0 top-full mt-3 w-80 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden py-2 animate-in slide-in-from-top-2 z-50">
                                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                                    <h3 className="font-bold text-gray-900">Admin Alerts</h3>
                                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{notifications.length} New</span>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-6 text-center text-gray-400 flex flex-col items-center">
                                            <CheckCircle2 size={24} className="mb-2 text-gray-300" />
                                            <p className="text-sm">System is stable.</p>
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
                                        <button onClick={() => setNotifications([])} className="text-[12px] font-bold text-[#1A56DB] hover:underline w-full py-1.5">Acknowledge All</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="relative" ref={helpRef}>
                        <button
                            onClick={() => setIsHelpOpen(!isHelpOpen)}
                            className={`border border-gray-200 rounded-full p-1.5 transition-colors ${isHelpOpen ? 'bg-gray-100 text-gray-900 border-gray-300' : 'hover:text-gray-900 hover:bg-gray-50'}`}
                        >
                            <HelpCircle size={18} />
                        </button>

                        {/* Help Dropdown Menu */}
                        {isHelpOpen && (
                            <div className="absolute right-0 top-full mt-3 w-[320px] bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden py-2 animate-in slide-in-from-top-2 z-50">
                                <div className="px-5 py-4 border-b border-gray-100 bg-slate-50/50">
                                    <h3 className="font-extrabold text-gray-900 mb-1">Admin Support</h3>
                                    <p className="text-xs text-gray-500 font-medium">Quick references and access protocols.</p>
                                </div>

                                <div className="p-3 flex flex-col gap-1">
                                    <div className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group flex items-start gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg shrink-0 text-blue-600 group-hover:bg-[#1A56DB] group-hover:text-white transition-colors">
                                            <FileText size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900">System Documentation</span>
                                            <span className="text-xs text-gray-400 mt-0.5">Read integration guides and API limits.</span>
                                        </div>
                                    </div>

                                    <div className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group flex items-start gap-3">
                                        <div className="bg-emerald-50 p-2 rounded-lg shrink-0 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                            <Key size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900">Access Control Policy</span>
                                            <span className="text-xs text-gray-400 mt-0.5">Review shift supervisor permissions.</span>
                                        </div>
                                    </div>

                                    <div className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group flex items-start gap-3">
                                        <div className="bg-purple-50 p-2 rounded-lg shrink-0 text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                            <Settings size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900">Global Configuration</span>
                                            <span className="text-xs text-gray-400 mt-0.5">Edit factory-wide safety thresholds.</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-5 py-3 border-t border-gray-50 bg-slate-50/50 mt-1">
                                    <div className="bg-[#1A56DB] text-white rounded-xl p-3 shadow-sm shadow-blue-500/20">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-100">Live IT Support</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                        </div>
                                        <p className="text-xs font-medium text-blue-50 border-b border-blue-400/30 pb-2 mb-2">Need immediate assistance escalating a system override?</p>
                                        <button className="text-xs font-extrabold w-full text-center hover:text-white/80 transition-colors">Open Ticket →</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-[#ECFDF5] text-[#059669] px-3 py-1.5 rounded-full border border-[#A7F3D0]">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                    <span className="text-xs font-bold tracking-wide uppercase">System Online</span>
                </div>
            </div>
        </div>
    );
}
