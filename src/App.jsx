import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SugarMillProvider } from './context/SugarMillContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import CommandCenter from './pages/CommandCenter';
import ZeroTouchOps from './pages/ZeroTouchOps';
import PredictiveMaint from './pages/PredictiveMaint';
import CaneQuality from './pages/CaneQuality';
import ProcessFlow from './pages/ProcessFlow';
import AnalyticsROI from './pages/AnalyticsROI';
import HumanAiControl from './pages/HumanAiControl';
import SystemHealth from './pages/SystemHealth';
import ProcessDetail from './pages/ProcessDetail';

// New Admin Sub-Pages
import AdminUsers from './pages/AdminPanel'; // Reusing old AdminPanel for Users
import AdminEquipment from './pages/AdminEquipment';
import AdminAlerts from './pages/AdminAlerts';
import AdminSystem from './pages/AdminSystem';
import AdminLogs from './pages/AdminLogs';
import AdminAIModels from './pages/AdminAIModels';
import AdminIntegrations from './pages/AdminIntegrations';

function App() {
  return (
    <SugarMillProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes with Isolated Layout */}
          <Route path="/admin-panel/*" element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Navigate to="ai-models" replace />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="equipment" element={<AdminEquipment />} />
                <Route path="alerts" element={<AdminAlerts />} />
                <Route path="system" element={<AdminSystem />} />
                <Route path="logs" element={<AdminLogs />} />
                <Route path="ai-models" element={<AdminAIModels />} />
                <Route path="integrations" element={<AdminIntegrations />} />
              </Routes>
            </AdminLayout>
          } />

          {/* Standard App Routes with Main Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<CommandCenter />} />
                <Route path="/zero-touch" element={<ZeroTouchOps />} />
                <Route path="/predictive-maint" element={<PredictiveMaint />} />
                <Route path="/cane-quality" element={<CaneQuality />} />
                <Route path="/process-flow" element={<ProcessFlow />} />
                <Route path="/process-flow/:stageId" element={<ProcessDetail />} />
                <Route path="/analytics-roi" element={<AnalyticsROI />} />
                <Route path="/human-ai-control" element={<HumanAiControl />} />
                <Route path="/system-health" element={<SystemHealth />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </SugarMillProvider>
  );
}

export default App;
