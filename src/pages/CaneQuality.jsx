import React from 'react';
import TopBar from '../components/TopBar';
import CaneQualityCards from '../components/CaneQualityCards';
import PolTrendChart from '../components/PolTrendChart';
import OptimizationPanel from '../components/OptimizationPanel';
import CaneSourceIntelligence from '../components/CaneSourceIntelligence';
import MillAICopilot from '../components/MillAICopilot';

export default function CaneQuality() {
    return (
        <div className="flex flex-col h-full bg-[#FAFBFA] overflow-hidden">
            <TopBar breadcrumb="Command Center" title="Cane Quality Intelligence" />

            <main className="flex-1 flex w-full mx-auto min-h-0 relative">
                {/* Main Content Area */}
                <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto pb-10 min-w-0">
                    <CaneQualityCards />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <PolTrendChart />
                        </div>
                        <div className="lg:col-span-1">
                            <OptimizationPanel />
                        </div>
                    </div>

                    <CaneSourceIntelligence />
                </div>

                {/* Right Sidebar - AI Copilot */}
                <div className="w-[320px] bg-white border-l border-gray-200 shrink-0 hidden xl:block shadow-[-4px_0_15px_rgba(0,0,0,0.02)] h-full overflow-hidden">
                    <MillAICopilot />
                </div>
            </main>
        </div>
    );
}
