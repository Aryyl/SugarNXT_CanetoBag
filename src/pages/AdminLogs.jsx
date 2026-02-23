import React, { useState } from 'react';
import AdminTopBar from '../components/AdminTopBar';
import { Search, Download, FileText, Lock, Eye, Hand, Sliders, Bell, Wrench, User, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function AdminLogs() {
    const [logs] = useState([
        { id: 1, time: '2024-01-20 14:32:15', user: 'Rajesh Kumar', role: 'PLANT MANAGER', roleColor: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200', action: 'Manual Override', actionColor: 'text-orange-600 bg-orange-50 border-orange-200', target: 'Mill Roller Pressure', old: '180 bar', new: '195 bar', reason: 'Quality optimization' },
        { id: 2, time: '2024-01-20 13:15:42', user: 'Priya Sharma', role: 'SHIFT OPERATOR', roleColor: 'text-blue-600 bg-blue-50 border-blue-200', action: 'Alert Acknowledged', actionColor: 'text-amber-600 bg-amber-50 border-amber-200', target: 'High Vibration Alert', old: 'Active', new: 'Acknowledged', reason: 'Maintenance scheduled' },
        { id: 3, time: '2024-01-20 11:45:28', user: 'Amit Patel', role: 'MAINTENANCE ENG.', roleColor: 'text-orange-600 bg-orange-50 border-orange-200', action: 'Equipment Maint.', actionColor: 'text-purple-600 bg-purple-50 border-purple-200', target: 'Cane Carrier Motor 1', old: 'Active', new: 'Maintenance', reason: 'Preventive maintenance' },
        { id: 4, time: '2024-01-20 10:22:11', user: 'Sunita Reddy', role: 'ADMIN', roleColor: 'text-red-600 bg-red-50 border-red-200', action: 'User Created', actionColor: 'text-emerald-600 bg-emerald-50 border-emerald-200', target: 'New User Account', old: '-', new: 'Active', reason: 'New operator onboarding' },
        { id: 5, time: '2024-01-20 09:18:35', user: 'Rajesh Kumar', role: 'PLANT MANAGER', roleColor: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200', action: 'Setpoint Change', actionColor: 'text-blue-600 bg-blue-50 border-blue-200', target: 'Steam Flow Rate', old: '12.5 t/h', new: '13.2 t/h', reason: 'Production increase' },
        { id: 6, time: '2024-01-19 16:42:09', user: 'Vikram Singh', role: 'SHIFT OPERATOR', roleColor: 'text-blue-600 bg-blue-50 border-blue-200', action: 'AI Rec. Approved', actionColor: 'text-emerald-600 bg-emerald-50 border-emerald-200', target: 'Recovery Optimization', old: 'Pending', new: 'Approved', reason: 'Efficiency improvement' },
        { id: 7, time: '2024-01-19 15:28:53', user: 'Sunita Reddy', role: 'ADMIN', roleColor: 'text-red-600 bg-red-50 border-red-200', action: 'Alert Rule Modified', actionColor: 'text-blue-600 bg-blue-50 border-blue-200', target: 'Temperature Warning', old: '85°C', new: '90°C', reason: 'Threshold adjustment' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('Last 7 Days');
    const [filterAction, setFilterAction] = useState('All Actions');
    const [filterUser, setFilterUser] = useState('All Users');

    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 5;

    const filteredLogs = logs.filter(L => {
        const matchesSearch = L.target.toLowerCase().includes(searchTerm.toLowerCase()) || L.reason.toLowerCase().includes(searchTerm.toLowerCase()) || L.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAction = filterAction === 'All Actions' || L.action === filterAction;
        const matchesUser = filterUser === 'All Users' || L.user === filterUser;
        return matchesSearch && matchesAction && matchesUser;
    });

    const indexOfLast = currentPage * logsPerPage;
    const indexOfFirst = indexOfLast - logsPerPage;
    const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredLogs.length / logsPerPage) || 1;

    const [isExporting, setIsExporting] = useState(null);

    const handleExport = () => {
        setIsExporting('csv');
        setTimeout(() => setIsExporting(null), 1500);
    };

    const handleReport = () => {
        setIsExporting('report');
        setTimeout(() => setIsExporting(null), 2500);
    };

    return (
        <div className="flex flex-col h-full bg-[#FAFAFA] overflow-y-auto w-full">
            <AdminTopBar breadcrumb="Audit Logs >" title="" />

            <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-[26px] font-extrabold text-[#111827] tracking-tight">Audit Logs</h1>
                    <p className="text-[14px] text-gray-500 font-medium">Industrial Infrastructure Monitoring</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-6 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-500 fill-mode-both">
                        <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center mb-3">
                            <Hand className="text-orange-500" size={18} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">24</div>
                        <div className="text-[12px] font-bold text-gray-500 leading-tight mb-2">Manual Overrides</div>
                        <div className="text-[11px] font-bold text-emerald-600">+12% vs last period</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-500 delay-75 fill-mode-both">
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                            <Sliders className="text-blue-500" size={18} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">18</div>
                        <div className="text-[12px] font-bold text-gray-500 leading-tight mb-2">Setpoint Changes</div>
                        <div className="text-[11px] font-bold text-red-500">-5% vs last period</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-500 delay-100 fill-mode-both">
                        <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center mb-3">
                            <Bell className="text-amber-500" size={18} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">156</div>
                        <div className="text-[12px] font-bold text-gray-500 leading-tight mb-2">Alert Acknowledgments</div>
                        <div className="text-[11px] font-bold text-emerald-600">+8% vs last period</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-500 delay-150 fill-mode-both">
                        <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
                            <Wrench className="text-purple-500" size={18} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">32</div>
                        <div className="text-[12px] font-bold text-gray-500 leading-tight mb-2">Maintenance Logs</div>
                        <div className="text-[11px] font-bold text-emerald-600">+15% vs last period</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-500 delay-200 fill-mode-both">
                        <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center mb-3">
                            <User className="text-cyan-500" size={18} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">8</div>
                        <div className="text-[12px] font-bold text-gray-500 leading-tight mb-2">User Activities</div>
                        <div className="text-[11px] font-bold text-gray-400">0% vs last period</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-500 delay-300 fill-mode-both">
                        <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                            <CheckCircle2 className="text-emerald-500" size={18} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">12</div>
                        <div className="text-[12px] font-bold text-gray-500 leading-tight mb-2">AI Approvals</div>
                        <div className="text-[11px] font-bold text-emerald-600">+20% vs last period</div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search audit logs..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/20 shadow-sm"
                        />
                    </div>
                    <select
                        value={filterDate}
                        onChange={(e) => { setFilterDate(e.target.value); setCurrentPage(1); }}
                        className="bg-white border border-gray-200 shadow-sm rounded-lg text-[13px] font-bold text-gray-700 py-2.5 px-4 focus:outline-none pr-8 w-40 cursor-pointer hover:bg-gray-50"
                    >
                        <option value="Last 7 Days">Last 7 Days</option>
                        <option value="Last 30 Days">Last 30 Days</option>
                        <option value="All Time">All Time</option>
                    </select>
                    <select
                        value={filterAction}
                        onChange={(e) => { setFilterAction(e.target.value); setCurrentPage(1); }}
                        className="bg-white border border-gray-200 shadow-sm rounded-lg text-[13px] font-bold text-gray-700 py-2.5 px-4 focus:outline-none pr-8 w-44 cursor-pointer hover:bg-gray-50"
                    >
                        <option value="All Actions">All Actions</option>
                        <option value="Manual Override">Manual Override</option>
                        <option value="Alert Acknowledged">Alert Acknowledged</option>
                        <option value="Equipment Maint.">Equipment Maint.</option>
                        <option value="User Created">User Created</option>
                        <option value="Setpoint Change">Setpoint Change</option>
                        <option value="AI Rec. Approved">AI Rec. Approved</option>
                    </select>
                    <select
                        value={filterUser}
                        onChange={(e) => { setFilterUser(e.target.value); setCurrentPage(1); }}
                        className="bg-white border border-gray-200 shadow-sm rounded-lg text-[13px] font-bold text-gray-700 py-2.5 px-4 focus:outline-none pr-8 w-40 cursor-pointer hover:bg-gray-50"
                    >
                        <option value="All Users">All Users</option>
                        <option value="Rajesh Kumar">Rajesh Kumar</option>
                        <option value="Priya Sharma">Priya Sharma</option>
                        <option value="Amit Patel">Amit Patel</option>
                        <option value="Sunita Reddy">Sunita Reddy</option>
                        <option value="Vikram Singh">Vikram Singh</option>
                    </select>
                    <button
                        onClick={handleExport}
                        disabled={isExporting !== null}
                        className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-5 py-2.5 flex items-center justify-center gap-2 rounded-lg font-bold text-[13px] shadow-sm transition-all ml-1 active:scale-95 disabled:opacity-70 w-36"
                    >
                        {isExporting === 'csv' ? (
                            <><Loader2 size={16} className="animate-spin text-[#1A56DB]" /> Exporting...</>
                        ) : (
                            <><Download size={16} /> Export CSV</>
                        )}
                    </button>
                    <button
                        onClick={handleReport}
                        disabled={isExporting !== null}
                        className="bg-[#1A56DB] hover:bg-blue-700 text-white px-5 py-2.5 flex items-center justify-center gap-2 rounded-lg font-bold text-[13px] shadow-md transition-all active:scale-95 disabled:opacity-70 w-44"
                    >
                        {isExporting === 'report' ? (
                            <><Loader2 size={16} className="animate-spin" /> Generating...</>
                        ) : (
                            <><FileText size={16} /> Generate Report</>
                        )}
                    </button>
                </div>

                {/* Table Box */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            <FileText className="text-red-500" size={20} />
                            <h2 className="text-[16px] font-extrabold text-gray-900">Audit Trail</h2>
                        </div>
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500 border border-gray-200 bg-white px-3 py-1.5 rounded-full shadow-sm">
                            <Lock size={12} className="text-gray-400" />
                            Logs are immutable and cannot be deleted
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest min-w-[140px]">Timestamp</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">User</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Role</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Action</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest min-w-[160px]">Target</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Old Value</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">New Value</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest min-w-[160px]">Reason</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-right">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentLogs.map((L) => (
                                    <tr key={L.id} className="hover:bg-gray-50/50 transition-colors group h-[72px]">
                                        <td className="px-6 py-3">
                                            <p className="text-[12px] font-bold text-gray-900 w-24 leading-snug break-words">
                                                {L.time.split(' ')[0]}<br />
                                                <span className="text-gray-500 font-medium">{L.time.split(' ')[1]}</span>
                                            </p>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className="text-[13px] font-bold text-gray-900 whitespace-nowrap">{L.user}</span>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <span className={`px-2 py-1 rounded-md text-[9px] font-black tracking-widest uppercase border inline-block whitespace-nowrap ${L.roleColor}`}>
                                                {L.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap border inline-block ${L.actionColor}`}>
                                                {L.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-gray-600">{L.target}</td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-gray-500 whitespace-nowrap">{L.old}</td>
                                        <td className="px-6 py-3 text-[13px] font-bold text-gray-900 whitespace-nowrap">{L.new}</td>
                                        <td className="px-6 py-3 text-[12px] font-medium text-gray-600">{L.reason}</td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center justify-end">
                                                <button onClick={() => alert(`Viewing details for ${L.action} on ${L.target} `)} className="text-gray-400 hover:text-[#1A56DB] transition-colors p-2 bg-gray-50 hover:bg-blue-50 rounded-full">
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {currentLogs.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="text-center py-8 text-sm text-gray-500 font-medium">No logs matched your criteria.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredLogs.length > 0 && (
                        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-[13px] text-gray-500 font-medium bg-gray-50/50 rounded-b-2xl">
                            <div>Showing <span className="font-bold text-gray-900">{indexOfFirst + 1} - {Math.min(indexOfLast, filteredLogs.length)}</span> of <span className="font-bold text-gray-900">{filteredLogs.length}</span> entries</div>
                            <div className="flex items-center gap-1 font-bold">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className="p-1 text-gray-400 hover:text-gray-800 disabled:opacity-50 transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w - 7 h - 7 rounded - md flex items - center justify - center transition - colors ${currentPage === page ? 'bg-[#1A56DB] text-white shadow-sm' : 'hover:bg-gray-200 text-gray-700'} `}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    className="p-1 text-gray-400 hover:text-gray-800 disabled:opacity-50 transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
