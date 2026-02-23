import React, { useState } from 'react';
import AdminTopBar from '../components/AdminTopBar';
import { Search, Plus, Settings2, Edit2, Trash2, Zap, Settings as Gear, Cog, Droplet, Wind, ArrowDownToDot, ChevronLeft, ChevronRight, X, Wrench, Activity, Database, Cloud, Download, Loader2 } from 'lucide-react';
import { useSugarMill } from '../context/SugarMillContext';

export default function AdminEquipment() {
    const { metrics } = useSugarMill();

    const [equipment, setEquipment] = useState([
        { id: 1, name: 'Cane Carrier Motor 1', category: 'MOTOR', catColor: 'text-blue-600 bg-blue-50 border-blue-100', sensors: '4 mapped', vib: '8.5 mm/s', temp: '85°C', pres: '150 bar', rul: '30 days', status: 'Active' },
        { id: 2, name: 'Shredder Gearbox', category: 'GEARBOX', catColor: 'text-purple-600 bg-purple-50 border-purple-100', sensors: '6 mapped', vib: '12 mm/s', temp: '95°C', pres: '200 bar', rul: '25 days', status: 'Active' },
        { id: 3, name: 'Mill Roller Set A', category: 'MILL', catColor: 'text-orange-600 bg-orange-50 border-orange-100', sensors: '8 mapped', vib: '10 mm/s', temp: '90°C', pres: `${metrics.processes.millingLoad} bar`, rul: '20 days', status: 'Active' },
        { id: 4, name: 'Hydraulic System 1', category: 'HYDRAULIC', catColor: 'text-cyan-600 bg-cyan-50 border-cyan-100', sensors: '5 mapped', vib: '6 mm/s', temp: '75°C', pres: '220 bar', rul: '35 days', status: 'Active' },
        { id: 5, name: 'Boiler Feed Pump', category: 'PUMP', catColor: 'text-emerald-600 bg-emerald-50 border-emerald-100', sensors: '4 mapped', vib: '7.5 mm/s', temp: '80°C', pres: `${metrics.processes.boilerPressure} bar`, rul: '28 days', status: 'Maintenance' },
        { id: 6, name: 'Centrifuge Motor 2', category: 'MOTOR', catColor: 'text-blue-600 bg-blue-50 border-blue-100', sensors: '3 mapped', vib: '9 mm/s', temp: '88°C', pres: '140 bar', rul: '32 days', status: 'Active' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All Categories');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newMachine, setNewMachine] = useState({ name: '', category: 'MOTOR' });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editMachine, setEditMachine] = useState(null);

    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [configMachine, setConfigMachine] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const equipmentPerPage = 6;

    const getCatColor = (cat) => {
        const map = {
            'MOTOR': 'text-blue-600 bg-blue-50 border-blue-100',
            'GEARBOX': 'text-purple-600 bg-purple-50 border-purple-100',
            'MILL': 'text-orange-600 bg-orange-50 border-orange-100',
            'HYDRAULIC': 'text-cyan-600 bg-cyan-50 border-cyan-100',
            'PUMP': 'text-emerald-600 bg-emerald-50 border-emerald-100',
        };
        return map[cat] || 'text-gray-600 bg-gray-50 border-gray-200';
    };

    const addEquipment = () => {
        if (!newMachine.name || !newMachine.category) {
            alert('Please provide equipment name and category.');
            return;
        }

        const machine = {
            id: Date.now(),
            name: newMachine.name,
            category: newMachine.category,
            catColor: getCatColor(newMachine.category),
            sensors: '0 mapped',
            vib: '-',
            temp: '-',
            pres: '-',
            rul: 'Pending',
            status: 'Active'
        };

        setEquipment([machine, ...equipment]);
        setIsMenuOpen(false);
        setNewMachine({ name: '', category: 'MOTOR' });
    };

    const openEditModal = (machine) => {
        setEditMachine({ ...machine });
        setIsEditModalOpen(true);
    };

    const saveEditEquipment = () => {
        if (!editMachine.name) {
            alert('Name cannot be empty.');
            return;
        }
        setEquipment(equipment.map(e => {
            if (e.id === editMachine.id) {
                return {
                    ...e,
                    name: editMachine.name,
                    category: editMachine.category,
                    catColor: getCatColor(editMachine.category)
                };
            }
            return e;
        }));
        setIsEditModalOpen(false);
        setEditMachine(null);
    };

    const openConfigModal = (machine) => {
        setConfigMachine({ ...machine });
        setIsConfigModalOpen(true);
    };

    const saveConfig = () => {
        // just a mock save
        setEquipment(equipment.map(e => {
            if (e.id === configMachine.id) {
                return { ...e, sensors: Math.floor(Math.random() * 5 + 3) + ' mapped' };
            }
            return e;
        }));
        setIsConfigModalOpen(false);
        setConfigMachine(null);
    };

    const toggleStatus = (id) => {
        setEquipment(equipment.map(e =>
            e.id === id ? { ...e, status: e.status === 'Active' ? 'Maintenance' : 'Active' } : e
        ));
    };

    const deleteEquipment = (id, name) => {
        if (window.confirm(`Are you sure you want to permanently delete ${name}? This will stop all telemetry data collection.`)) {
            setEquipment(equipment.filter(e => e.id !== id));
        }
    };

    const filteredEquipment = equipment.filter(e => {
        const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = filterCategory === 'All Categories' || e.category === filterCategory;
        return matchesSearch && matchesCat;
    });

    const indexOfLast = currentPage * equipmentPerPage;
    const indexOfFirst = indexOfLast - equipmentPerPage;
    const currentEquipment = filteredEquipment.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredEquipment.length / equipmentPerPage) || 1;

    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => setIsExporting(false), 1500);
    };

    return (
        <div className="flex flex-col h-full bg-[#FAFAFA] overflow-y-auto w-full relative">
            <AdminTopBar breadcrumb="Equipment Configuration >" title="" />

            <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-[26px] font-extrabold text-[#111827] tracking-tight">Equipment Configuration</h1>
                    <p className="text-[14px] text-gray-500 font-medium">Industrial Infrastructure Monitoring</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-6 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow animate-in fade-in zoom-in-95 duration-500 fill-mode-both">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                            <Zap className="text-blue-500 fill-blue-500/20" size={20} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-0.5">{equipment.filter(e => e.category === 'MOTOR').length}</div>
                        <div className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Motor</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow animate-in fade-in zoom-in-95 duration-500 delay-75 fill-mode-both">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-2">
                            <Gear className="text-purple-500" size={20} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-0.5">{equipment.filter(e => e.category === 'GEARBOX').length}</div>
                        <div className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Gearbox</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow animate-in fade-in zoom-in-95 duration-500 delay-100 fill-mode-both">
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-2">
                            <svg className="text-orange-500 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-0.5">{equipment.filter(e => e.category === 'MILL').length}</div>
                        <div className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Mill</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow animate-in fade-in zoom-in-95 duration-500 delay-150 fill-mode-both">
                        <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center mb-2">
                            <Droplet className="text-cyan-500" size={20} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-0.5">{equipment.filter(e => e.category === 'HYDRAULIC').length}</div>
                        <div className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Hydraulic</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow animate-in fade-in zoom-in-95 duration-500 delay-200 fill-mode-both">
                        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-2">
                            <Wind className="text-emerald-500" size={20} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-0.5">{equipment.filter(e => e.category === 'PUMP').length}</div>
                        <div className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Pump</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow animate-in fade-in zoom-in-95 duration-500 delay-300 fill-mode-both">
                        <div className="w-10 h-10 bg-lime-50 rounded-lg flex items-center justify-center mb-2">
                            <ArrowDownToDot className="text-lime-500" size={20} />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-0.5">{equipment.filter(e => e.category === 'COMPRESSOR').length}</div>
                        <div className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Compressor</div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search equipment..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/20"
                            />
                        </div>
                        <select
                            className="bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 py-2.5 px-4 focus:outline-none pr-8 cursor-pointer hover:bg-gray-50"
                            value={filterCategory}
                            onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="All Categories">All Categories</option>
                            <option value="MOTOR">Motor</option>
                            <option value="GEARBOX">Gearbox</option>
                            <option value="MILL">Mill</option>
                            <option value="HYDRAULIC">Hydraulic</option>
                            <option value="PUMP">Pump</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-5 py-2.5 flex items-center justify-center gap-2 rounded-lg font-bold text-[13px] shadow-sm transition-all ml-1 active:scale-95 disabled:opacity-70 w-36"
                        >
                            {isExporting ? (
                                <><Loader2 size={16} className="animate-spin text-gray-400" /> Exporting...</>
                            ) : (
                                <><Download size={16} /> Export CSV</>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="bg-[#1A56DB] hover:bg-blue-700 text-white px-5 py-2.5 flex items-center gap-2 rounded-lg font-bold text-[14px] shadow-md transition-all active:scale-95"
                        >
                            <Plus size={18} /> Add Equipment
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col mt-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-200 bg-white">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest min-w-[200px]">Equipment</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Category</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Sensors</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Vibration Limit</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Temp Limit</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Pressure Limit</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">RUL Threshold</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-500 tracking-widest text-right min-w-[120px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentEquipment.map((e) => (
                                    <tr key={e.id} className="hover:bg-gray-50/50 transition-colors group h-16">
                                        <td className="px-6 py-3">
                                            <p className="text-[13px] font-bold text-gray-900 leading-snug break-words">{e.name}</p>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase inline-block border ${e.catColor}`}>
                                                {e.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-gray-500 text-center whitespace-nowrap">{e.sensors}</td>
                                        <td className="px-6 py-3 text-[13px] font-bold text-gray-700 text-center whitespace-nowrap">{e.vib}</td>
                                        <td className="px-6 py-3 text-[13px] font-bold text-gray-700 text-center whitespace-nowrap">{e.temp}</td>
                                        <td className="px-6 py-3 text-[13px] font-bold text-gray-700 text-center whitespace-nowrap">{e.pres}</td>
                                        <td className="px-6 py-3 text-[13px] font-bold text-gray-700 text-center whitespace-nowrap">{e.rul}</td>
                                        <td className="px-6 py-3 text-center cursor-pointer hover:opacity-80" onClick={() => toggleStatus(e.id)}>
                                            {e.status === 'Active' ? (
                                                <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-[12px] font-bold whitespace-nowrap">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Active
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-1.5 text-orange-500 text-[12px] font-bold whitespace-nowrap">
                                                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div> Maintenance
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center justify-end gap-3 text-gray-400 bg-white group-hover:bg-transparent">
                                                <button className="hover:text-[#1A56DB] transition-colors" title="Configure Sensors" onClick={() => openConfigModal(e)}><Settings2 size={16} /></button>
                                                <button className="hover:text-gray-900 transition-colors" title="Edit Equipment" onClick={() => openEditModal(e)}><Edit2 size={16} /></button>
                                                <button className="hover:text-red-500 transition-colors" title="Remove" onClick={() => deleteEquipment(e.id, e.name)}><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {currentEquipment.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="text-center py-8 text-sm text-gray-500 font-medium">No equipment found matching criteria.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredEquipment.length > 0 && (
                        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-[13px] text-gray-500 font-medium bg-gray-50/50 rounded-b-2xl">
                            <div>Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredEquipment.length)} of {filteredEquipment.length} equipment units</div>
                            <div className="flex items-center gap-3 font-bold">
                                <button
                                    className="text-gray-400 hover:text-gray-900 flex items-center gap-1 transition-colors disabled:opacity-50"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                >
                                    Previous
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-7 h-7 rounded-md flex items-center justify-center shadow-sm transition-all ${currentPage === page ? 'bg-[#1A56DB] text-white' : 'hover:bg-white border border-transparent hover:border-gray-200 text-gray-700'}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="text-gray-900 hover:text-[#1A56DB] flex items-center gap-1 transition-colors disabled:opacity-50"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Equipment Modal */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 p-6 border-b border-gray-100 bg-gray-50/50">
                            <Plus className="text-blue-500" size={20} />
                            <h2 className="text-lg font-bold text-gray-900 flex-1">Add Equipment</h2>
                            <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Equipment Name</label>
                                <input
                                    type="text"
                                    value={newMachine.name}
                                    onChange={(e) => setNewMachine({ ...newMachine, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                    placeholder="e.g. Crusher Motor 2"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Category</label>
                                <select
                                    value={newMachine.category}
                                    onChange={(e) => setNewMachine({ ...newMachine, category: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none cursor-pointer"
                                >
                                    <option value="MOTOR">Motor</option>
                                    <option value="GEARBOX">Gearbox</option>
                                    <option value="MILL">Mill</option>
                                    <option value="HYDRAULIC">Hydraulic</option>
                                    <option value="PUMP">Pump</option>
                                </select>
                            </div>
                            <div className="text-xs text-gray-500 bg-gray-50 p-4 border border-gray-100 rounded-xl mt-2 leading-relaxed">
                                Upon saving, this equipment will be tracked under "Active" status. Please proceed to the <strong>Configure Sensors</strong> panel to link live data mappings (Vibration, Temp, Pressure tags).
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button onClick={() => setIsMenuOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
                            <button onClick={addEquipment} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1A56DB] hover:bg-blue-700 transition-colors shadow-sm active:scale-95">Save Equipment</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Equipment Modal */}
            {isEditModalOpen && editMachine && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 p-6 border-b border-gray-100 bg-gray-50/50">
                            <Edit2 className="text-gray-700" size={20} />
                            <h2 className="text-lg font-bold text-gray-900 flex-1">Edit Equipment</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Equipment Name</label>
                                <input
                                    type="text"
                                    value={editMachine.name}
                                    onChange={(e) => setEditMachine({ ...editMachine, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Category</label>
                                <select
                                    value={editMachine.category}
                                    onChange={(e) => setEditMachine({ ...editMachine, category: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1A56DB]/20 focus:outline-none cursor-pointer"
                                >
                                    <option value="MOTOR">Motor</option>
                                    <option value="GEARBOX">Gearbox</option>
                                    <option value="MILL">Mill</option>
                                    <option value="HYDRAULIC">Hydraulic</option>
                                    <option value="PUMP">Pump</option>
                                    <option value="COMPRESSOR">Compressor</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
                            <button onClick={saveEditEquipment} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gray-900 hover:bg-black transition-colors shadow-sm active:scale-95">Update Details</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Configure Sensors Modal */}
            {isConfigModalOpen && configMachine && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 p-6 border-b border-gray-100 bg-gray-50/50">
                            <Activity className="text-[#1A56DB]" size={20} />
                            <h2 className="text-lg font-bold text-gray-900 flex-1">Configure Data Tags</h2>
                            <button onClick={() => setIsConfigModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <div className="text-sm font-bold text-gray-900">{configMachine.name}</div>
                                <div className="text-xs text-gray-500">Map OPC-UA or MQTT tags directly to this equipment instance.</div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="p-3 border border-gray-200 rounded-xl bg-gray-50 flex items-center gap-3">
                                    <Activity className="text-emerald-500 w-5 h-5" />
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-gray-700">Vibration Tag Mapping</div>
                                        <input type="text" defaultValue={`Tag.VIB.${configMachine.category}.${configMachine.id}`} className="w-full mt-1 bg-white border border-gray-200 rounded-md px-2 py-1.5 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    </div>
                                    <div className="w-20 pl-2 border-l border-gray-200">
                                        <div className="text-[10px] uppercase font-bold text-gray-400">Limit</div>
                                        <input type="text" defaultValue={configMachine.vib.split(' ')[0]} className="w-full mt-1 bg-white border border-gray-200 rounded-md px-2 py-1.5 text-xs text-gray-600 focus:outline-none" />
                                    </div>
                                </div>
                                <div className="p-3 border border-gray-200 rounded-xl bg-gray-50 flex items-center gap-3">
                                    <AlertTriangle className="text-orange-500 w-5 h-5" />
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-gray-700">Temperature Tag Mapping</div>
                                        <input type="text" defaultValue={`Tag.TEMP.${configMachine.category}.${configMachine.id}`} className="w-full mt-1 bg-white border border-gray-200 rounded-md px-2 py-1.5 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    </div>
                                    <div className="w-20 pl-2 border-l border-gray-200">
                                        <div className="text-[10px] uppercase font-bold text-gray-400">Limit</div>
                                        <input type="text" defaultValue={configMachine.temp.replace('°C', '')} className="w-full mt-1 bg-white border border-gray-200 rounded-md px-2 py-1.5 text-xs text-gray-600 focus:outline-none" />
                                    </div>
                                </div>
                                <div className="p-3 border border-gray-200 rounded-xl bg-gray-50 flex items-center gap-3">
                                    <Database className="text-blue-500 w-5 h-5" />
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-gray-700">Pressure Tag Mapping</div>
                                        <input type="text" defaultValue={`Tag.PRES.${configMachine.category}.${configMachine.id}`} className="w-full mt-1 bg-white border border-gray-200 rounded-md px-2 py-1.5 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    </div>
                                    <div className="w-20 pl-2 border-l border-gray-200">
                                        <div className="text-[10px] uppercase font-bold text-gray-400">Limit</div>
                                        <input type="text" defaultValue={configMachine.pres.split(' ')[0]} className="w-full mt-1 bg-white border border-gray-200 rounded-md px-2 py-1.5 text-xs text-gray-600 focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button onClick={() => setIsConfigModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors">Discard</button>
                            <button onClick={saveConfig} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1A56DB] hover:bg-blue-700 transition-colors shadow-sm active:scale-95 flex items-center gap-2"><Cloud size={16} /> Sync Tags</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
