import React, { useState } from 'react';
import { Shield, Users, Bell, SlidersHorizontal, ToggleLeft, ToggleRight, FileText, Plus, X } from 'lucide-react';
import AdminTopBar from '../components/AdminTopBar';

export default function AdminPanel() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Dr. Sarah Chen', role: 'Chief Engineer', lastActive: '2 Mins Ago', status: 'Online' },
        { id: 2, name: 'Marcus Obian', role: 'Shift Supervisor', lastActive: '45 Mins Ago', status: 'Away' },
        { id: 3, name: 'System Override API', role: 'Service Account', lastActive: 'Now', status: 'Online' },
        { id: 4, name: 'Elena Rostova', role: 'Data Analyst', lastActive: '3 Days Ago', status: 'Offline' },
    ]);

    const [logs, setLogs] = useState([
        { id: 101, time: '10:42:15 AM', user: 'Dr. Sarah Chen', action: 'Increased Thermal Reactor #2 threshold to 95.5°C' },
        { id: 102, time: '09:15:02 AM', user: 'System Override API', action: 'Triggered auto-flush sequence on Main Boiler.' },
        { id: 103, time: '08:00:00 AM', user: 'Marcus Obian', action: 'Began Shift ID: #5991A' },
    ]);

    // Toggles
    const [isAIAuto, setIsAIAuto] = useState(true);
    const [is2FA, setIs2FA] = useState(true);
    const [isPagerDuty, setIsPagerDuty] = useState(false);

    // Modals
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', role: 'Operator' });

    const addLog = (actionDesc) => {
        const newLog = {
            id: crypto.randomUUID(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            user: 'Current Admin',
            action: actionDesc
        };
        setLogs([newLog, ...logs]);
        // In a real app, this would dispatch to a global store
        console.log("Activity logged:", newLog);
    };

    const handleToggle = (setting, currentState, setter, label) => {
        setter(!currentState);
        addLog(`${currentState ? 'Disabled' : 'Enabled'} global setting: ${label}`);
    };

    const handleAddUser = () => {
        if (!newUser.name) {
            alert("A valid name is required.");
            return;
        }

        const userObj = {
            id: crypto.randomUUID(),
            name: newUser.name,
            role: newUser.role,
            lastActive: 'Just Now',
            status: 'Online'
        };

        setUsers([userObj, ...users]);
        addLog(`Provisioned new administrative user account for ${newUser.name} with Role: ${newUser.role}`);
        setIsUserModalOpen(false);
        setNewUser({ name: '', role: 'Operator' });
    };

    const revokeUser = (id, name) => {
        if (confirm(`Revoke access for ${name}?`)) {
            setUsers(users.filter(u => u.id !== id));
            addLog(`Revoked system access for user: ${name}`);
        }
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-gray-50 pb-12 relative">
            <AdminTopBar breadcrumb="Admin Setup" title="System Settings" />

            <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-[1400px]">
                {/* Page Header */}
                <div>
                    <h1 className="text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">Administrative Control</h1>
                    <p className="text-gray-500 font-medium mt-1 text-[15px]">Manage role access, globally configure system thresholds, and review audit logs.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

                    {/* User Management */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Users className="text-[#1A56DB]" size={24} />
                                <h2 className="text-lg font-bold text-gray-900">User Management</h2>
                            </div>
                            <button
                                onClick={() => setIsUserModalOpen(true)}
                                className="text-xs font-bold text-[#1A56DB] uppercase tracking-widest hover:underline flex items-center gap-1 active:scale-95 transition-transform"
                            >
                                <Plus size={14} /> Add User
                            </button>
                        </div>
                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3.5 text-[11px] uppercase font-extrabold text-slate-500 tracking-wider">Account</th>
                                        <th className="px-6 py-3.5 text-[11px] uppercase font-extrabold text-slate-500 tracking-wider">Role</th>
                                        <th className="px-6 py-3.5 text-[11px] uppercase font-extrabold text-slate-500 tracking-wider">Status</th>
                                        <th className="px-6 py-3.5 text-[11px] uppercase font-extrabold text-slate-500 tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-[14px] text-gray-900">{u.name}</div>
                                                <div className="text-[11px] font-semibold text-gray-400">Last Seen: {u.lastActive}</div>
                                            </td>
                                            <td className="px-6 py-4 text-[13px] font-semibold text-gray-600">{u.role}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${u.status === 'Online' ? 'bg-emerald-100 text-emerald-700' : u.status === 'Away' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {u.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => revokeUser(u.id, u.name)}
                                                    className="text-[11px] font-bold text-red-500 uppercase hover:underline opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 disabled:hover:no-underline"
                                                    disabled={u.name === 'System Override API'}
                                                >
                                                    Revoke
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center py-6 text-sm text-gray-500">No users found in directory.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Global Config & API */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col p-6">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-2">
                            <Shield className="text-[#1A56DB]" size={24} />
                            <h2 className="text-lg font-bold text-gray-900">Security & Integration</h2>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex justify-between items-center py-5 border-b border-gray-50">
                                <div>
                                    <h4 className="text-[14px] font-bold text-gray-900">Global AI Autonomy</h4>
                                    <p className="text-[12px] text-gray-500 font-medium leading-relaxed max-w-[280px]">Allow ML models to execute logic without human confirmation on routine anomalies.</p>
                                </div>
                                <div onClick={() => handleToggle('isAIAuto', isAIAuto, setIsAIAuto, 'Global AI Autonomy')}>
                                    {isAIAuto ? <ToggleRight size={40} strokeWidth={1.5} className="text-emerald-500 cursor-pointer" /> : <ToggleLeft size={40} strokeWidth={1.5} className="text-gray-300 cursor-pointer" />}
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-5 border-b border-gray-50">
                                <div>
                                    <h4 className="text-[14px] font-bold text-gray-900">Two-Factor Authentication</h4>
                                    <p className="text-[12px] text-gray-500 font-medium leading-relaxed max-w-[280px]">Require physical YubiKey or SMS token for Level 1 System Override modules.</p>
                                </div>
                                <div onClick={() => handleToggle('is2FA', is2FA, setIs2FA, 'Two-Factor Authentication')}>
                                    {is2FA ? <ToggleRight size={40} strokeWidth={1.5} className="text-emerald-500 cursor-pointer" /> : <ToggleLeft size={40} strokeWidth={1.5} className="text-gray-300 cursor-pointer" />}
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-5">
                                <div>
                                    <h4 className="text-[14px] font-bold text-gray-900">PagerDuty Integration</h4>
                                    <p className="text-[12px] text-gray-500 font-medium leading-relaxed max-w-[280px]">Escalate critical boiler anomalies to mobile devices immediately. Requires API valid token.</p>
                                </div>
                                <div onClick={() => handleToggle('isPagerDuty', isPagerDuty, setIsPagerDuty, 'PagerDuty Integration')}>
                                    {isPagerDuty ? <ToggleRight size={40} strokeWidth={1.5} className="text-emerald-500 cursor-pointer" /> : <ToggleLeft size={40} strokeWidth={1.5} className="text-gray-300 cursor-pointer" />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Audit Logs */}
                    <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <FileText className="text-gray-500" size={20} />
                                <h2 className="text-[15px] font-extrabold text-slate-800 tracking-wider uppercase">System Config Audit Log</h2>
                            </div>
                            <button onClick={() => alert("Downloading logs.csv...")} className="text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:text-gray-900 transition-colors">Export CSV</button>
                        </div>
                        <div className="p-6 flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                            {logs.map((log) => (
                                <div key={log.id} className="flex gap-4 items-start border-l-2 border-gray-200 pl-4 py-1">
                                    <span className="text-[12px] font-bold text-gray-400 shrink-0 mt-0.5 w-24">{log.time}</span>
                                    <div>
                                        <span className="text-[13px] font-bold text-gray-900 mr-2">{log.user}:</span>
                                        <span className="text-[13px] font-medium text-gray-600 leading-snug">{log.action}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal */}
            {isUserModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 p-6 border-b border-gray-100 bg-gray-50/50">
                            <Users className="text-blue-500" size={20} />
                            <h2 className="text-lg font-bold text-gray-900 flex-1">Provision New User</h2>
                            <button onClick={() => setIsUserModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Role Assignment</label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none cursor-pointer"
                                >
                                    <option value="Operator">Shift Operator</option>
                                    <option value="Data Analyst">Data Analyst</option>
                                    <option value="Maintenance Engineer">Maintenance Engineer</option>
                                    <option value="Shift Supervisor">Shift Supervisor</option>
                                    <option value="Admin">System Admin</option>
                                </select>
                            </div>
                            <div className="bg-orange-50 text-orange-800 p-4 rounded-xl text-xs font-medium border border-orange-100 mt-2">
                                <strong>Notice:</strong> This action will send an initial password provisioning link to the user's corporate email and log an administrative entry.
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button onClick={() => setIsUserModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
                            <button onClick={handleAddUser} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1A56DB] hover:bg-blue-700 transition-colors shadow-sm active:scale-95">Send Invite</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
