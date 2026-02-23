import React, { useState } from 'react';
import AdminTopBar from '../components/AdminTopBar';
import { Search, Plus, Edit2, BellRing, Trash2, ChevronLeft, ChevronRight, X, AlertTriangle } from 'lucide-react';

export default function AdminAlerts() {
    const [alerts, setAlerts] = useState([
        { id: 1, name: 'High Vibration Alert', severity: 'CRITICAL', equipment: 'All Motors', condition: 'Vibration > 8.5 mm/s', escalation: '5 mins', notification: 'Email, SMS', autoAck: '30 mins', status: 'Active' },
        { id: 2, name: 'Temperature Warning', severity: 'WARNING', equipment: 'Gearbox', condition: 'Temp > 85°C', escalation: '10 mins', notification: 'Email', autoAck: '60 mins', status: 'Active' },
        { id: 3, name: 'Pressure Imbalance', severity: 'CRITICAL', equipment: 'Hydraulic System', condition: 'Pressure < 140 bar', escalation: '3 mins', notification: 'Email, SMS, WA', autoAck: '15 mins', status: 'Active' },
        { id: 4, name: 'RUL Low Alert', severity: 'WARNING', equipment: 'All Equipment', condition: 'RUL < 15 days', escalation: '24 hours', notification: 'Email', autoAck: 'Manual', status: 'Active' },
        { id: 5, name: 'Conveyor Jam Detection', severity: 'CRITICAL', equipment: 'Cane Carrier', condition: 'Speed < 50% / 2m', escalation: '2 mins', notification: 'Email, SMS', autoAck: '20 mins', status: 'Active' },
        { id: 6, name: 'Steam Flow Deviation', severity: 'INFO', equipment: 'Boiler', condition: 'Flow var > 15%', escalation: 'None', notification: 'Email', autoAck: '120 mins', status: 'Suppressed' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterSeverity, setFilterSeverity] = useState('All Severity');
    const [filterStatus, setFilterStatus] = useState('All Status');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAlert, setNewAlert] = useState({ name: '', equipment: '', condition: '', severity: 'WARNING' });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const alertsPerPage = 6;

    const createAlertRule = () => {
        if (!newAlert.name || !newAlert.equipment || !newAlert.condition) {
            alert('Please fill out all required fields.');
            return;
        }

        const rule = {
            id: Date.now(),
            name: newAlert.name,
            severity: newAlert.severity,
            equipment: newAlert.equipment,
            condition: newAlert.condition,
            escalation: '15 mins',
            notification: 'System UI',
            autoAck: 'Manual',
            status: 'Active'
        };

        setAlerts([rule, ...alerts]);
        setIsModalOpen(false);
        setNewAlert({ name: '', equipment: '', condition: '', severity: 'WARNING' });
    };

    const toggleStatus = (id) => {
        setAlerts(alerts.map(a => {
            if (a.id === id) {
                return { ...a, status: a.status === 'Active' ? 'Suppressed' : 'Active' };
            }
            return a;
        }));
    };

    const removeAlert = (id, name) => {
        if (confirm(`Are you sure you want to delete the rule "${name}"?`)) {
            setAlerts(alerts.filter(a => a.id !== id));
        }
    };

    const filteredAlerts = alerts.filter(a => {
        const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.equipment.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeverity = filterSeverity === 'All Severity' || a.severity === filterSeverity;
        const matchesStatus = filterStatus === 'All Status' || a.status === filterStatus;
        return matchesSearch && matchesSeverity && matchesStatus;
    });

    const indexOfLast = currentPage * alertsPerPage;
    const indexOfFirst = indexOfLast - alertsPerPage;
    const currentAlerts = filteredAlerts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);

    return (
        <div className="flex flex-col h-full bg-[#FAFAFA] overflow-y-auto w-full relative">
            <AdminTopBar breadcrumb="System & Infrastructure >" title="" />

            <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-[26px] font-extrabold text-[#111827] tracking-tight">Alert Configuration</h1>
                    <p className="text-[14px] text-gray-500 font-medium">Industrial Infrastructure Monitoring</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search alert rules or equipment..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/20"
                            />
                        </div>
                        <select
                            className="bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 py-2.5 px-4 focus:outline-none pr-8 cursor-pointer"
                            value={filterSeverity}
                            onChange={(e) => { setFilterSeverity(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="All Severity">All Severity</option>
                            <option value="CRITICAL">Critical</option>
                            <option value="WARNING">Warning</option>
                            <option value="INFO">Info</option>
                        </select>
                        <select
                            className="bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 py-2.5 px-4 focus:outline-none pr-8 cursor-pointer"
                            value={filterStatus}
                            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="All Status">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Suppressed">Suppressed</option>
                        </select>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#1A56DB] hover:bg-blue-700 text-white px-5 py-2.5 flex items-center gap-2 rounded-lg font-bold text-[14px] shadow-md transition-all active:scale-95"
                    >
                        <Plus size={18} /> Add Alert Rule
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col mt-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-200 bg-white">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest min-w-[160px]">Rule Name</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Severity</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Equipment</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest min-w-[180px]">Condition</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Escalation</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Notification</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Auto-Ack</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-right min-w-[120px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentAlerts.map((a) => (
                                    <tr key={a.id} className="hover:bg-gray-50/50 transition-colors group h-16">
                                        <td className="px-6 py-3">
                                            <p className="text-[13px] font-bold text-gray-900 leading-snug break-words">{a.name}</p>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase inline-block ${a.severity === 'CRITICAL' ? 'bg-red-50 text-red-600 border border-red-100' : a.severity === 'WARNING' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                                {a.severity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-[13px] font-medium text-gray-600">{a.equipment}</td>
                                        <td className="px-6 py-3">
                                            <code className="text-[13px] font-mono font-semibold text-gray-800 bg-gray-50 px-2.5 py-1 rounded border border-gray-200 block w-max">{a.condition}</code>
                                        </td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-gray-600 whitespace-nowrap">{a.escalation}</td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-gray-600 whitespace-nowrap">{a.notification}</td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-gray-600 whitespace-nowrap">{a.autoAck}</td>
                                        <td className="px-6 py-3 text-center">
                                            {a.status === 'Active' ? (
                                                <div
                                                    className="flex items-center justify-center gap-1.5 text-emerald-600 text-[12px] font-bold whitespace-nowrap cursor-pointer hover:underline"
                                                    onClick={() => toggleStatus(a.id)}
                                                    title="Click to Suppress"
                                                >
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Active
                                                </div>
                                            ) : (
                                                <div
                                                    className="flex items-center justify-center gap-1.5 text-gray-400 text-[12px] font-bold whitespace-nowrap cursor-pointer hover:underline"
                                                    onClick={() => toggleStatus(a.id)}
                                                    title="Click to Activate"
                                                >
                                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div> Suppressed
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center justify-end gap-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="hover:text-gray-900" onClick={() => alert("Edit modal would open here.")}><Edit2 size={16} /></button>
                                                <button className="hover:text-amber-500" onClick={() => alert("Pinged technicians for this alert rule.")}><BellRing size={16} /></button>
                                                <button className="hover:text-red-500" onClick={() => removeAlert(a.id, a.name)}><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {currentAlerts.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="text-center py-8 text-sm text-gray-500 font-medium">No alerts matched your filters.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredAlerts.length > 0 && (
                        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-[13px] text-gray-500 font-medium">
                            <div>Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredAlerts.length)} of {filteredAlerts.length} alert rules</div>
                            <div className="flex items-center gap-1 font-bold">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className="p-1 text-gray-400 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-7 h-7 rounded-md flex items-center justify-center ${currentPage === page ? 'bg-[#1A56DB] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    className="p-1 text-gray-400 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 p-6 border-b border-gray-100 bg-gray-50/50">
                            <AlertTriangle className="text-amber-500" size={20} />
                            <h2 className="text-lg font-bold text-gray-900 flex-1">Create Alert Rule</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Rule Name</label>
                                <input
                                    type="text"
                                    value={newAlert.name}
                                    onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                    placeholder="e.g. Pump Malfunction"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Severity</label>
                                    <select
                                        value={newAlert.severity}
                                        onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none cursor-pointer"
                                    >
                                        <option value="CRITICAL">Critical</option>
                                        <option value="WARNING">Warning</option>
                                        <option value="INFO">Info</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Equipment</label>
                                    <input
                                        type="text"
                                        value={newAlert.equipment}
                                        onChange={(e) => setNewAlert({ ...newAlert, equipment: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                        placeholder="e.g. Boiler"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Condition (Formula)</label>
                                <input
                                    type="text"
                                    value={newAlert.condition}
                                    onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                    placeholder="e.g. Temp > 150°C"
                                />
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
                            <button onClick={createAlertRule} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1A56DB] hover:bg-blue-700 transition-colors shadow-sm active:scale-95">Save Rule</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
