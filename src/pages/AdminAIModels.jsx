import React, { useState } from 'react';
import AdminTopBar from '../components/AdminTopBar';
import { BrainCircuit, UploadCloud, Search, Eye, RefreshCw, History, CheckCircle2, FileClock, X } from 'lucide-react';

export default function AdminAIModels() {
    const [models, setModels] = useState([
        { id: 1, name: 'Pol Prediction Model', version: 'v24.1', accuracy: 96.8, confidence: '94.2%', drift: 'LOW', lastTrained: '20.02.26 18:23:45', nextRetrain: '20.02.26 18:23:45', status: 'Active' },
        { id: 2, name: 'RUL Prediction Model', version: 'v3.1.0', accuracy: 94.5, confidence: '92.8%', drift: 'MEDIUM', lastTrained: '20.02.26 18:23:45', nextRetrain: '20.02.26 18:23:45', status: 'Active' },
        { id: 3, name: 'Recovery Optimization', version: 'v1.8.2', accuracy: 91.3, confidence: '89.5%', drift: 'LOW', lastTrained: '20.02.26 18:23:45', nextRetrain: '20.02.26 18:23:45', status: 'Active' },
        { id: 4, name: 'Energy Optimization', version: 'v15.3', accuracy: 88.9, confidence: '87.2%', drift: 'HIGH', lastTrained: '20.02.26 18:23:45', nextRetrain: 'N/A', status: 'Pending Approval' },
        { id: 5, name: 'Quality Classification', version: 'v2.2.0', accuracy: 93.7, confidence: '91.4%', drift: 'LOW', lastTrained: '20.02.26 18:23:45', nextRetrain: '20.02.26 18:23:45', status: 'Active' },
    ]);

    const [history, setHistory] = useState([
        { name: 'Pol Prediction Model', version: 'v2.4.1', by: 'Admin', date: '2024-01-15' },
        { name: 'RUL Prediction Model', version: 'v3.1.0', by: 'Admin', date: '2024-01-10' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Status');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newModel, setNewModel] = useState({ name: '', version: '' });

    // Computed Stats
    const activeModels = models.filter(m => m.status === 'Active').length;
    const avgAccuracy = (models.reduce((acc, curr) => acc + curr.accuracy, 0) / models.length).toFixed(1);
    const pendingApproval = models.filter(m => m.status === 'Pending Approval').length;
    const retrainingSoon = models.filter(m => m.drift === 'HIGH' || m.drift === 'MEDIUM').length;

    const filteredModels = models.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All Status' || m.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleRetrain = (id) => {
        setModels(models.map(m => {
            if (m.id === id) {
                return { ...m, accuracy: Math.min(100, m.accuracy + 2.1), drift: 'LOW', lastTrained: new Date().toLocaleDateString() };
            }
            return m;
        }));
        alert("Retraining initiated successfully for the selected model.");
    };

    const handleDeploy = () => {
        if (!newModel.name || !newModel.version) {
            alert('Please fill out all fields.');
            return;
        }

        const generatedModel = {
            id: Date.now(),
            name: newModel.name,
            version: newModel.version,
            accuracy: 90.0,
            confidence: '85.0%',
            drift: 'LOW',
            lastTrained: new Date().toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            nextRetrain: 'N/A',
            status: 'Pending Approval'
        };

        setModels([...models, generatedModel]);
        setHistory([{ name: newModel.name, version: newModel.version, by: 'Current User', date: new Date().toISOString().split('T')[0] }, ...history]);
        setIsMenuOpen(false);
        setNewModel({ name: '', version: '' });
    };

    return (
        <div className="flex flex-col h-full bg-[#FAFAFA] overflow-y-auto w-full relative">
            <AdminTopBar breadcrumb="AI Model Management >" title="Overview" />

            <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-[26px] font-extrabold text-gray-900 tracking-tight">AI Model Management</h1>
                    <p className="text-[14px] text-gray-500 font-medium">Industrial Infrastructure Monitoring</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col relative shadow-sm">
                        <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Active</div>
                        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                            <BrainCircuit className="text-emerald-500" size={20} />
                        </div>
                        <div className="text-4xl font-black text-gray-900 mb-1">{activeModels}</div>
                        <div className="text-[13px] font-semibold text-gray-500">Active Models</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col shadow-sm">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                            <UploadCloud className="text-blue-500" size={20} />
                        </div>
                        <div className="text-4xl font-black text-gray-900 mb-1">{avgAccuracy}%</div>
                        <div className="text-[13px] font-semibold text-gray-500">Avg Accuracy</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col shadow-sm">
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                            <FileClock className="text-orange-500" size={20} />
                        </div>
                        <div className="text-4xl font-black text-gray-900 mb-1">{pendingApproval}</div>
                        <div className="text-[13px] font-semibold text-gray-500">Pending Approval</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col shadow-sm">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                            <RefreshCw className="text-purple-500" size={20} />
                        </div>
                        <div className="text-4xl font-black text-gray-900 mb-1">{retrainingSoon}</div>
                        <div className="text-[13px] font-semibold text-gray-500">Retraining Soon</div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search models..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/20"
                            />
                        </div>
                        <select
                            className="bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 py-2.5 px-4 focus:outline-none pr-8 cursor-pointer hover:bg-white transition-colors"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All Status">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Pending Approval">Pending Approval</option>
                        </select>
                    </div>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="bg-[#1A56DB] hover:bg-blue-700 text-white px-5 py-2.5 flex items-center gap-2 rounded-lg font-bold text-[14px] shadow-md transition-all active:scale-95"
                    >
                        <UploadCloud size={18} /> Deploy New Model
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-2">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest min-w-[200px]">Model Name</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Version</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Accuracy</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Confidence</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Data Drift</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Last Trained</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Next Retrain</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredModels.map((m) => (
                                <tr key={m.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-[13px] font-bold text-gray-900 leading-snug">{m.name}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[11px] font-bold">{m.version}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div className={`h-full ${m.accuracy > 90 ? 'bg-emerald-500' : 'bg-orange-400'}`} style={{ width: `${m.accuracy}%` }}></div>
                                            </div>
                                            <span className="text-[13px] font-bold text-gray-900">{m.accuracy}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] font-medium text-gray-600">{m.confidence}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-black tracking-wider uppercase ${m.drift === 'LOW' ? 'bg-emerald-100 text-emerald-700' : m.drift === 'MEDIUM' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                                            {m.drift}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-[12px] font-medium text-gray-500 leading-tight w-16">{m.lastTrained}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-[12px] font-medium text-gray-500 leading-tight w-16">{m.nextRetrain}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {m.status === 'Active' ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 text-[12px] font-bold cursor-pointer" onClick={() => {
                                                setModels(models.map(md => md.id === m.id ? { ...md, status: 'Pending Approval' } : md));
                                            }}>
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Active
                                            </div>
                                        ) : (
                                            <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-center block w-max leading-tight cursor-pointer hover:bg-emerald-100 hover:text-emerald-700" onClick={() => {
                                                setModels(models.map(md => md.id === m.id ? { ...md, status: 'Active' } : md));
                                                alert("Model approved and active!");
                                            }}>Pending<br />Approval</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="hover:text-gray-900" title="View Logs"><Eye size={16} /></button>
                                            <button className="hover:text-[#1A56DB]" title="Force Retrain" onClick={() => handleRetrain(m.id)}><RefreshCw size={16} /></button>
                                            <button className="hover:text-red-500" title="Delete Model" onClick={() => {
                                                if (confirm(`Remove model ${m.name}?`)) {
                                                    setModels(models.filter(x => x.id !== m.id));
                                                }
                                            }}><History size={16} className="rotate-180" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredModels.length === 0 && (
                                <tr>
                                    <td colSpan="9" className="px-6 py-8 text-center text-gray-500 font-medium">No models found criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Deployment History */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-4">
                    <div className="flex items-center gap-3 mb-6">
                        <History className="text-red-500" size={20} />
                        <h2 className="text-[16px] font-bold text-gray-900">Deployment History</h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        {history.map((h, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <CheckCircle2 size={16} className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-gray-900">{h.name}</p>
                                        <p className="text-[12px] font-medium text-gray-500 mt-0.5">{h.version} • Deployed by <span className="font-bold text-gray-700">{h.by}</span></p>
                                    </div>
                                </div>
                                <div className="text-[13px] font-bold text-gray-400">
                                    {h.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900">Deploy New Model</h2>
                            <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Model Name</label>
                                <input
                                    type="text"
                                    value={newModel.name}
                                    onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                    placeholder="e.g. Viscosity Analyzer"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Target Version</label>
                                <input
                                    type="text"
                                    value={newModel.version}
                                    onChange={(e) => setNewModel({ ...newModel, version: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                    placeholder="e.g. v2.0.1"
                                />
                            </div>
                            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-xs font-medium border border-blue-100 mt-2">
                                New models are deployed in <strong>Pending Approval</strong> state to evaluate shadow metrics against production.
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button onClick={() => setIsMenuOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
                            <button onClick={handleDeploy} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1A56DB] hover:bg-blue-700 transition-colors shadow-sm active:scale-95">Deploy to Shadow</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
