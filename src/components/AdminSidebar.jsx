import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Wrench, ShieldAlert, Server, FileText, Cpu, LogOut, Link as LinkIcon } from 'lucide-react';

export default function AdminSidebar() {
    const location = useLocation();

    const navItems = [
        { name: 'Back to Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'User & Role Control', path: '/admin-panel/users', icon: Settings },
        { name: 'Equipment Configuration', path: '/admin-panel/equipment', icon: Wrench },
        { name: 'Alert Configuration', path: '/admin-panel/alerts', icon: ShieldAlert },
        { name: 'System & Infrastructure', path: '/admin-panel/system', icon: Server },
        { name: 'Integrations & APIs', path: '/admin-panel/integrations', icon: LinkIcon },
        { name: 'Audit Logs', path: '/admin-panel/logs', icon: FileText },
        { name: 'AI Model Management', path: '/admin-panel/ai-models', icon: Cpu },
    ];

    return (
        <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col h-full shrink-0 relative z-10 text-gray-600">
            <div className="flex items-center gap-3 p-6 pt-8 pb-8 border-b border-gray-100">
                <div className="bg-[#1A56DB] p-2 rounded-lg text-white">
                    <LayoutDashboard size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-gray-900 text-[15px] tracking-wide">SugarMill AI</h1>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Enterprise V4.2</p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto w-full">
                {navItems.map((item) => {
                    // special handling for back to dashboard
                    const isDashboard = item.path === '/dashboard';
                    const isActive = location.pathname === item.path || (location.pathname === '/admin-panel' && item.path === '/admin-panel/users');

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all ${isActive && !isDashboard
                                ? 'bg-[#EFF6FF] text-[#1A56DB] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-[#1A56DB] before:rounded-r-full'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon size={20} className={isActive && !isDashboard ? 'text-[#1A56DB]' : 'text-gray-400'} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold border border-blue-200">
                        OA
                    </div>
                    <div>
                        <p className="text-[13px] font-bold text-gray-900">Operational Admin</p>
                        <p className="text-[11px] text-gray-400">master@sugarmill.ai</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <LogOut size={18} />
                </button>
            </div>
        </aside>
    );
}
