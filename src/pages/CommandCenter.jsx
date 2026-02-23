import React from 'react';
import { Bell, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import TopBar from '../components/TopBar';
import KpiCards from '../components/KpiCards';
import ProcessFlow from '../components/ProcessFlow';
import ActivityLog from '../components/ActivityLog';
import CriticalAlerts from '../components/CriticalAlerts';
import PredictiveInsight from '../components/PredictiveInsight';

export default function CommandCenter() {
    return (
        <div className="flex flex-col h-full bg-[#FAFBFA] overflow-y-auto">
            <TopBar />

            <main className="flex-1 p-6 flex flex-col gap-6 max-w-[1600px] w-full mx-auto">
                <KpiCards />

                <div className="flex flex-col xl:flex-row gap-6 h-full min-h-0">
                    {/* Left Column - Main Process & Logs */}
                    <div className="flex-1 flex flex-col gap-6 min-w-0">
                        <ProcessFlow />
                        <ActivityLog />
                        <PredictiveInsight />
                    </div>

                    {/* Right Column - Alerts */}
                    <div className="w-full xl:w-[350px] shrink-0">
                        <CriticalAlerts />
                    </div>
                </div>
            </main>
        </div>
    );
}
