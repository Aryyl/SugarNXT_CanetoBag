import React, { useState } from 'react';
import AdminTopBar from '../components/AdminTopBar';
import { Router, Database, Cloud, AlertTriangle, Activity, Clock, RefreshCw, Eye, Trash2, Plus, MonitorSmartphone, Server, X } from 'lucide-react';
import { useSugarMill } from '../context/SugarMillContext';

export default function AdminSystem() {
    const { metrics } = useSugarMill();
    const baseCpu = Math.max(10, 100 - Number(metrics.health.healthIndex));

    const [edgeDevices, setEdgeDevices] = useState([
        { id: 1, name: 'Edge Node 1', location: 'Mill Floor A', status: 'Online', cpu: baseCpu + 15, mem: 62, uptime: '45 d 12 h', latency: '12ms' },
        { id: 2, name: 'Edge Node 2', location: 'Mill Floor B', status: 'Online', cpu: baseCpu + 8, mem: 54, uptime: '45 d 8 h', latency: '15ms' },
        { id: 3, name: 'Edge Node 3', location: 'Boiler Room', status: 'Online', cpu: baseCpu + 22, mem: 68, uptime: '30 d 2 h', latency: '18ms' },
    ]);

    const staticSensors = [
        { name: 'Vibration Sensors', icon: Activity, iconColor: 'text-blue-500', bg: 'bg-blue-50', online: 48, offline: 2, total: 50 },
        { name: 'Temperature Sensors', icon: AlertTriangle, iconColor: 'text-orange-500', bg: 'bg-orange-50', online: 42, offline: 0, total: 42 },
        { name: 'Pressure Sensors', icon: Database, iconColor: 'text-purple-500', bg: 'bg-purple-50', online: 35, offline: 1, total: 36 },
        { name: 'Load Sensors', icon: MonitorSmartphone, iconColor: 'text-emerald-500', bg: 'bg-emerald-50', online: 28, offline: 0, total: 28 },
        { name: 'Flow Sensors', icon: Cloud, iconColor: 'text-blue-400', bg: 'bg-blue-50', online: 32, offline: 1, total: 33 },
        { name: 'Speed Sensors', icon: Activity, iconColor: 'text-emerald-500', bg: 'bg-emerald-50', online: 24, offline: 0, total: 24 },
        { name: 'Level Sensors', icon: Database, iconColor: 'text-gray-500', bg: 'bg-gray-100', online: 18, offline: 0, total: 18 },
    ];

    const [sensors, setSensors] = useState(staticSensors);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isDbSyncing, setIsDbSyncing] = useState(false);

    // Modal states
    const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
    const [newDevice, setNewDevice] = useState({ name: '', location: '' });

    // Edge device actions
    const removeDevice = (id, name) => {
        if (confirm(`Unregister ${name} from the network?`)) {
            setEdgeDevices(edgeDevices.filter(d => d.id !== id));
        }
    };

    const rebootDevice = (id, name) => {
        if (confirm(`Send reboot command to ${name}?`)) {
            setEdgeDevices(edgeDevices.map(d => {
                if (d.id === id) {
                    return { ...d, status: 'Rebooting...', cpu: 0, mem: 0, latency: '-' };
                }
                return d;
            }));

            setTimeout(() => {
                setEdgeDevices(prev => prev.map(d => {
                    if (d.id === id) {
                        return { ...d, status: 'Online', cpu: baseCpu + 5, mem: 20, uptime: '0 d 0 h', latency: '22ms' };
                    }
                    return d;
                }));
            }, 3000);
        }
    };

    const registerDevice = () => {
        if (!newDevice.name || !newDevice.location) {
            alert('Name and Location are required to provision an Edge Node.');
            return;
        }

        const node = {
            id: Date.now(),
            name: newDevice.name,
            location: newDevice.location,
            status: 'Provisioning...',
            cpu: 0,
            mem: 0,
            uptime: '0 d 0 h',
            latency: '-'
        };

        setEdgeDevices([...edgeDevices, node]);
        setIsDeviceModalOpen(false);
        setNewDevice({ name: '', location: '' });

        // Simulate provisioning complete
        setTimeout(() => {
            setEdgeDevices(prev => prev.map(d => {
                if (d.id === node.id) {
                    return { ...d, status: 'Online', cpu: 12, mem: 18, latency: '45ms' };
                }
                return d;
            }));
        }, 4000);
    };

    const simulateNetworkRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            setSensors(staticSensors.map(s => ({
                ...s,
                online: Math.min(s.total, s.online + Math.floor(Math.random() * 2)),
                offline: Math.max(0, s.offline - Math.floor(Math.random() * 2))
            })));
        }, 1500);
    };

    const simulateDbSync = () => {
        setIsDbSyncing(true);
        setTimeout(() => {
            setIsDbSyncing(false);
            alert("Time-Series DB forced sync completed successfully.");
        }, 2000);
    };

    return (
        <div className="flex flex-col h-full bg-[#FAFAFA] overflow-y-auto w-full relative">
            <AdminTopBar breadcrumb="System & Infrastructure >" title="" />

            <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[26px] font-extrabold text-[#111827] tracking-tight">System & Infrastructure</h1>
                        <p className="text-[14px] text-gray-500 font-medium">Industrial Infrastructure Monitoring</p>
                    </div>
                    <button
                        onClick={simulateNetworkRefresh}
                        disabled={isRefreshing}
                        className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-5 py-2.5 flex items-center gap-2 rounded-lg font-bold text-[13px] shadow-sm transition-all active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} /> {isRefreshing ? 'Scanning Network...' : 'Network Scan'}
                    </button>
                </div>

                {/* Top Health Readouts */}
                <div className="grid grid-cols-6 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow cursor-default">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                            <Router className="text-emerald-500" size={16} />
                        </div>
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">MQTT Broker Status</div>
                        <div className="text-xl font-black text-gray-900 flex items-center gap-2">
                            Connected <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                        onClick={simulateDbSync}
                    >
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Database className={`text-blue-500 ${isDbSyncing ? "animate-bounce" : ""}`} size={16} />
                        </div>
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Time-Series DB</div>
                        <div className="text-xl font-black text-gray-900">{isDbSyncing ? 'Syncing...' : '98.2% Health'}</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
                            <Cloud className="text-purple-500" size={16} />
                        </div>
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Cloud Sync</div>
                        <div className="text-xl font-black text-gray-900">Enabled</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mb-3">
                            <AlertTriangle className="text-amber-500" size={16} />
                        </div>
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Data Loss Rate</div>
                        <div className="text-xl font-black text-gray-900">0.03%</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-fuchsia-50 rounded-lg flex items-center justify-center mb-3">
                            <Activity className="text-fuchsia-500" size={16} />
                        </div>
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Avg Latency</div>
                        <div className="text-xl font-black text-gray-900">18ms</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                            <Clock className="text-gray-500" size={16} />
                        </div>
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Backup Status</div>
                        <div className="text-xl font-black text-gray-900">2h ago</div>
                    </div>
                </div>

                {/* Sensor Grid Wrapper */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-2 relative overflow-hidden">
                    {isRefreshing && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                            <div className="bg-white shadow-lg border border-gray-100 px-6 py-3 rounded-full flex items-center gap-3 text-sm font-bold text-[#1A56DB]">
                                <RefreshCw size={16} className="animate-spin" /> Fetching Telemetry...
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <h2 className="text-[16px] font-bold text-gray-900">Sensor Monitoring</h2>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {sensors.map((s, i) => (
                            <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg}`}>
                                        <s.icon size={16} className={s.iconColor} />
                                    </div>
                                    <h3 className="text-[13px] font-bold text-gray-900">{s.name}</h3>
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-bold mb-2">
                                    <span className="text-emerald-600">{s.online} Online</span>
                                    {s.offline > 0 ? <span className="text-red-500">{s.offline} Offline</span> : <span className="text-gray-400">0 Offline</span>}
                                </div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
                                    <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${(s.online / s.total) * 100}%` }}></div>
                                    <div className="bg-red-500 h-full transition-all duration-1000" style={{ width: `${(s.offline / s.total) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-[13px] font-bold">
                        <div className="text-gray-500">
                            Total Sensors: <span className="text-gray-900">231</span> • <span className="text-emerald-600">227 Online</span> • <span className="text-red-500">4 Offline</span>
                        </div>
                        <div className="text-gray-500">98.3% Uptime</div>
                    </div>
                </div>

                {/* Edge Devices Table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-4">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-3">
                            <Server className="text-red-500" size={20} />
                            <h2 className="text-[16px] font-bold text-gray-900">Edge Device Health</h2>
                        </div>
                        <button
                            onClick={() => setIsDeviceModalOpen(true)}
                            className="bg-[#1A56DB] hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2 rounded-lg font-bold text-[13px] shadow-sm transition-all focus:outline-none active:scale-95"
                        >
                            <Plus size={16} /> Register Device
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest min-w-[140px]">Device Name</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Location</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">CPU Usage</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Memory Usage</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Uptime</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Latency</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {edgeDevices.map((e) => (
                                    <tr key={e.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-[13px] font-bold text-gray-900">{e.name}</p>
                                        </td>
                                        <td className="px-6 py-4 text-[13px] font-medium text-gray-600">{e.location}</td>
                                        <td className="px-6 py-4 text-center">
                                            {e.status === 'Online' ? (
                                                <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-[12px] font-bold">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> {e.status}
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-1.5 text-orange-500 text-[12px] font-bold">
                                                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div> {e.status}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full transition-all duration-300 ${e.cpu > 50 ? 'bg-orange-400' : 'bg-emerald-500'}`} style={{ width: `${e.cpu}%` }}></div>
                                                </div>
                                                <span className="text-[12px] font-bold text-gray-600 w-8">{e.cpu}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full transition-all duration-300 ${e.mem > 65 ? 'bg-orange-400' : 'bg-amber-500'}`} style={{ width: `${e.mem}%` }}></div>
                                                </div>
                                                <span className="text-[12px] font-bold text-gray-600 w-8">{e.mem}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-[13px] font-medium text-gray-600">{e.uptime}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-[13px] font-bold ${e.latency === '-' ? 'text-gray-400' : 'text-emerald-500'}`}>{e.latency}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="hover:text-gray-900" title="View Telemetry" onClick={() => alert(`Viewing pure hardware telemetry mapping for ${e.name}`)}><Eye size={16} /></button>
                                                <button className={`hover:text-[#1A56DB] ${e.status !== 'Online' && 'opacity-30 cursor-not-allowed'}`} disabled={e.status !== 'Online'} title="Restart Edge Node" onClick={() => rebootDevice(e.id, e.name)}>
                                                    <RefreshCw size={16} className={e.status === 'Rebooting...' ? 'animate-spin' : ''} />
                                                </button>
                                                <button className="hover:text-red-500" title="Unregister Node" onClick={() => removeDevice(e.id, e.name)}><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {edgeDevices.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-8 text-sm text-gray-500 font-medium">No edge devices registered on this cluster.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {edgeDevices.length > 3 && (
                        <div className="p-4 border-t border-gray-50 flex items-center justify-center">
                            <button className="text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">View All Edge Devices</button>
                        </div>
                    )}
                </div>

            </div>

            {/* Modal */}
            {isDeviceModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 p-6 border-b border-gray-100 bg-gray-50/50">
                            <Server className="text-blue-500" size={20} />
                            <h2 className="text-lg font-bold text-gray-900 flex-1">Register Edge Device</h2>
                            <button onClick={() => setIsDeviceModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Device Name / ID</label>
                                <input
                                    type="text"
                                    value={newDevice.name}
                                    onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                    placeholder="e.g. Edge Node 4"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Physical Location</label>
                                <input
                                    type="text"
                                    value={newDevice.location}
                                    onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                    placeholder="e.g. Boiler Room Sub-station"
                                />
                            </div>
                            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-xs font-medium border border-blue-100 mt-2">
                                Upon registration, the device will generate an initial handshake ping. Please ensure the target node has an active networking adapter targeting this MQTT broker IP.
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button onClick={() => setIsDeviceModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
                            <button onClick={registerDevice} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1A56DB] hover:bg-blue-700 transition-colors shadow-sm active:scale-95">Complete Registration</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
