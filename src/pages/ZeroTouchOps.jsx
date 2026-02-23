import React from 'react';
import TopBar from '../components/TopBar';
import ZeroTouchKpis from '../components/ZeroTouchKpis';
import ProcessAutomationTable from '../components/ProcessAutomationTable';
import LiveSystemTopology from '../components/LiveSystemTopology';
import ActiveExceptions from '../components/ActiveExceptions';
import { Network, Activity } from 'lucide-react';

export default function ZeroTouchOps() {
    return (
        <div className="flex flex-col h-full bg-[#FAFBFA] overflow-hidden">
            <TopBar breadcrumb="Zero-Touch Ops" title="Operations" />

            <main className="flex-1 p-6 flex flex-col gap-6 max-w-[1800px] mx-auto w-full overflow-y-auto">

                {/* Page Header Area */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Zero-Touch Operations Panel</h1>
                        <p className="text-sm font-medium text-gray-500 mt-1">Real-time autonomous process monitoring and predictive exception handling.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold text-[13px] px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                            <Network size={16} className="text-gray-500" />
                            System Overview
                        </button>
                        <button className="flex items-center gap-2 bg-[#EFF6FF] text-[#1A56DB] border border-[#BFDBFE] font-bold text-[13px] px-4 py-2.5 rounded-xl shadow-sm transition-colors">
                            <div className="w-2 h-2 bg-[#1A56DB] rounded-full animate-pulse"></div>
                            AI CORE ACTIVE
                        </button>
                    </div>
                </div>

                {/* KPIs */}
                <ZeroTouchKpis />

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-6 mt-2">

                    {/* Left Column (Tables & Topology) */}
                    <div className="flex-1 flex flex-col gap-6 min-w-0">
                        <ProcessAutomationTable />
                        <LiveSystemTopology />
                    </div>

                    {/* Right Column (Sidebar Exceptions) */}
                    <div className="w-full lg:w-[360px] shrink-0">
                        <ActiveExceptions />
                    </div>

                </div>

            </main>
        </div>
    );
}
