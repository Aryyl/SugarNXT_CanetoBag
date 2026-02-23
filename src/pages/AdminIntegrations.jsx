import React, { useState } from 'react';
import AdminTopBar from '../components/AdminTopBar';
import { Key, Webhook, Link as LinkIcon, Plus, Copy, RefreshCw, Trash2, CheckCircle2, ShieldAlert, Settings2 } from 'lucide-react';

export default function AdminIntegrations() {
    const [apiKeys, setApiKeys] = useState([
        { id: 1, name: 'PowerBI Sync Key', key: 'pk_live_8f99...2x4a', lastUsed: '2 mins ago', status: 'Active' },
        { id: 2, name: 'SAP ERP Production', key: 'pk_live_4nbb...9y2c', lastUsed: '5 hrs ago', status: 'Active' },
        { id: 3, name: 'Legacy SCADA Readonly', key: 'pk_test_1mzc...6k8d', lastUsed: '3 days ago', status: 'Revoked' }
    ]);

    const [webhooks, setWebhooks] = useState([
        { id: 1, name: 'Critical Alert PagerDuty', url: 'https://events.pagerduty.com/...', events: ['alert.critical', 'system.down'], status: 'Active' },
        { id: 2, name: 'Daily Yield Slack Sync', url: 'https://hooks.slack.com/...', events: ['report.daily'], status: 'Active' }
    ]);

    const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');

    const generateKey = () => {
        if (!newKeyName) return alert("Key name required");
        const newKey = {
            id: Date.now(),
            name: newKeyName,
            key: `pk_live_${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
            lastUsed: 'Never',
            status: 'Active'
        };
        setApiKeys([newKey, ...apiKeys]);
        setIsKeyModalOpen(false);
        setNewKeyName('');
    };

    const revokeKey = (id) => {
        setApiKeys(apiKeys.map(k => k.id === id ? { ...k, status: 'Revoked' } : k));
    };

    const deleteWebhook = (id) => {
        if (window.confirm("Remove this webhook deployment?")) {
            setWebhooks(webhooks.filter(w => w.id !== id));
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#FAFAFA] overflow-y-auto w-full relative">
            <AdminTopBar breadcrumb="Integrations & API >" title="" />

            <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-8">
                <div>
                    <h1 className="text-[26px] font-extrabold text-[#111827] tracking-tight">Integrations & APIs</h1>
                    <p className="text-[14px] text-gray-500 font-medium">Manage API keys, Webhooks, and external system sync protocols.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    {/* API Keys */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Key className="text-blue-600" size={20} />
                                <h2 className="text-lg font-bold text-gray-900">API Credentials</h2>
                            </div>
                            <button onClick={() => setIsKeyModalOpen(true)} className="text-xs font-bold text-[#1A56DB] uppercase tracking-widest hover:underline flex items-center gap-1">
                                <Plus size={14} /> Generate Key
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            {apiKeys.map(k => (
                                <div key={k.id} className={`p-4 rounded-xl border ${k.status === 'Active' ? 'border-gray-200 bg-white shadow-sm' : 'border-red-100 bg-red-50/30'}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900">{k.name}</h3>
                                            <p className="text-[11px] font-semibold text-gray-400 mt-0.5">Last Used: {k.lastUsed}</p>
                                        </div>
                                        <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full ${k.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                            {k.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-4">
                                        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-mono text-[13px] text-gray-600 flex justify-between items-center group">
                                            <span className={k.status === 'Revoked' ? 'line-through opacity-50' : ''}>{k.key}</span>
                                            <button className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"><Copy size={14} /></button>
                                        </div>
                                        {k.status === 'Active' && (
                                            <button onClick={() => revokeKey(k.id)} className="px-3 py-2 rounded-lg text-[12px] font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors">Revoke</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Webhooks */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Webhook className="text-purple-600" size={20} />
                                <h2 className="text-lg font-bold text-gray-900">Webhooks</h2>
                            </div>
                            <button className="text-xs font-bold text-[#1A56DB] uppercase tracking-widest hover:underline flex items-center gap-1" onClick={() => alert("Add webhook functionality mocked.")}>
                                <Plus size={14} /> Add Webhook
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            {webhooks.map(w => (
                                <div key={w.id} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900">{w.name}</h3>
                                            <p className="text-[12px] font-medium text-gray-500 mt-1 truncate max-w-[280px]">{w.url}</p>
                                        </div>
                                        <button onClick={() => deleteWebhook(w.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {w.events.map((ev, i) => (
                                            <span key={i} className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md">{ev}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ERP SCADA Links */}
                    <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-slate-50">
                            <LinkIcon className="text-gray-700" size={20} />
                            <h2 className="text-[15px] font-extrabold text-gray-900 uppercase tracking-widest">Enterprise Core Connections</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                            <div className="p-8 flex flex-col items-start gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-2 text-[14px] font-black text-gray-900"><CheckCircle2 className="text-emerald-500" size={18} /> SAP ERP Sync</div>
                                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Active bidirectional sync with your primary SAP financial module. Yield data is uploaded daily at 00:00 GMT.</p>
                                <button className="mt-2 text-[12px] font-bold text-gray-900 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"><RefreshCw size={14} /> Force Sync</button>
                            </div>
                            <div className="p-8 flex flex-col items-start gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-2 text-[14px] font-black text-gray-900"><ShieldAlert className="text-orange-500" size={18} /> Generic SCADA Endpoint</div>
                                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">OPC-UA server binding `192.168.10.45:4840`. Connection stability at 99.4% today. Requires edge tunneling.</p>
                                <button className="mt-2 text-[12px] font-bold text-[#1A56DB] bg-blue-50 border border-blue-100 shadow-sm px-4 py-2 rounded-lg hover:bg-blue-100 flex items-center gap-2"><Settings2 size={14} /> Configure Endpoint</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal */}
            {isKeyModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">Generate New API Key</h2>
                        </div>
                        <div className="p-6">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Key Identifier</label>
                            <input
                                type="text"
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                placeholder="e.g. Maximo Read Client"
                            />
                            <p className="text-[11px] text-gray-500 mt-3 font-medium">Only grant credentials to trusted internal services. Scope locking will be applied.</p>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button onClick={() => setIsKeyModalOpen(false)} className="px-5 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={generateKey} className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">Generate</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
