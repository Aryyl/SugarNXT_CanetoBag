import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Zap, Wrench, Activity, GitMerge, BarChart2, Users, ShieldPlus, Shield, AlertOctagon, RefreshCcw
} from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();
    const [isEmergency, setIsEmergency] = useState(false);

    // Mapping exactly to the user's provided un-cropped navigation list
    const navItems = [
        { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Zero-Touch Ops', path: '/zero-touch', icon: Zap },
        { name: 'Predictive Maint', path: '/predictive-maint', icon: Wrench },
        { name: 'Cane Quality AI', path: '/cane-quality', icon: Activity },
        { name: 'Process Flow', path: '/process-flow', icon: GitMerge },
        { name: 'Analytics & ROI', path: '/analytics-roi', icon: BarChart2 },
        { name: 'Human vs AI Control', path: '/human-ai-control', icon: Users },
    ];

    return (
        <>
            <aside className="w-[280px] bg-white border-r border-[#E5E7EB] flex flex-col h-full shrink-0 relative z-10">
                {/* Brand */}
                <div className="flex items-center gap-3 p-6 pt-8 pb-8">
                    <div className="bg-[#1A56DB] p-2 rounded-lg text-white">
                        <LayoutDashboard size={24} />
                    </div>
                    <div>
                        <h1 className="font-bold text-[#111827] text-[15px] tracking-wide">Smart Sugar Mill</h1>
                        <p className="text-[11px] font-medium text-gray-400">Command Center</p>
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto w-full">
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[14.5px] font-semibold transition-colors ${isActive
                                    ? 'bg-[#EFF6FF] text-[#1A56DB] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-[#1A56DB] before:rounded-r-full'
                                    : 'text-[#4B5563] hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? 'text-[#1A56DB]' : 'text-gray-400'} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Navigation (Separated items) */}
                <div className="p-4 border-t border-[#E5E7EB] flex flex-col gap-1 pb-6 w-full shrink-0">
                    <Link to="/system-health" className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[14.5px] font-semibold transition-colors ${location.pathname.startsWith('/system-health') ? 'bg-[#EFF6FF] text-[#1A56DB] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-[#1A56DB] before:rounded-r-full' : 'text-[#4B5563] hover:bg-gray-50 hover:text-gray-900'}`}>
                        <ShieldPlus size={20} className={location.pathname.startsWith('/system-health') ? 'text-[#1A56DB]' : 'text-gray-400'} />
                        System Health
                    </Link>
                    <Link to="/admin-panel" className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[14.5px] font-semibold transition-colors ${location.pathname.startsWith('/admin-panel') ? 'bg-[#EFF6FF] text-[#1A56DB] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-[#1A56DB] before:rounded-r-full' : 'text-[#4B5563] hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Shield size={20} className={location.pathname.startsWith('/admin-panel') ? 'text-[#1A56DB]' : 'text-gray-400'} />
                        Admin Panel
                    </Link>

                    {/* Emergency Stop Button */}
                    <button
                        onClick={() => setIsEmergency(true)}
                        className="flex items-center justify-center gap-2 mt-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-3 py-3.5 rounded-xl text-[14.5px] font-bold transition-all shadow-sm active:scale-95 border border-[#991B1B] uppercase tracking-wide"
                    >
                        <AlertOctagon size={20} />
                        Emergency Stop
                    </button>
                </div>
            </aside>

            {/* Emergency Full-Screen Modal */}
            {isEmergency && (
                <div className="fixed inset-0 z-[9999] bg-red-950/95 backdrop-blur-md flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
                    <div className="bg-red-500/20 p-8 rounded-full mb-8 animate-pulse shadow-[0_0_100px_rgba(239,68,68,0.4)] border border-red-500/50">
                        <AlertOctagon size={120} className="text-red-500" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-center text-white drop-shadow-lg uppercase">
                        System Halted
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-red-100 mb-10 max-w-2xl text-center leading-relaxed">
                        Emergency stop protocol engaged. All plant operations, milling sequences, and AI autonomy have been successfully suspended.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
                        <a
                            href="mailto:operations@smartsugarmill.com?subject=URGENT:%20System%20Halt%20Protocol%20Engaged"
                            className="bg-transparent border-2 border-red-500/50 text-red-100 hover:bg-red-500/10 px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center"
                        >
                            Contact Operations
                        </a>
                        <button
                            onClick={() => {
                                setIsEmergency(false);
                                window.location.reload();
                            }}
                            className="bg-white text-red-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            <RefreshCcw size={24} />
                            Override & Restart
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
