import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { Lock, ShieldAlert, Delete } from 'lucide-react';

export default function AdminLayout({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pinSequence, setPinSequence] = useState('');
    const [error, setError] = useState(false);

    const CORRECT_PIN = '1234';

    // Check auth synchronously on mount instead of an effect
    useState(() => {
        const auth = typeof window !== 'undefined' ? sessionStorage.getItem('admin_auth') : null;
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    });

    // Clear auth when leaving the admin panel (component unmount)
    useEffect(() => {
        return () => {
            sessionStorage.removeItem('admin_auth');
        };
    }, []);

    const handleNumberClick = (num) => {
        if (pinSequence.length < 4) {
            const newPin = pinSequence + num;
            setPinSequence(newPin);
            setError(false);

            if (newPin.length === 4) {
                if (newPin === CORRECT_PIN) {
                    sessionStorage.setItem('admin_auth', 'true');
                    setTimeout(() => setIsAuthenticated(true), 300);
                } else {
                    setError(true);
                    setTimeout(() => setPinSequence(''), 500);
                }
            }
        }
    };

    const handleDelete = () => {
        setPinSequence(pinSequence.slice(0, -1));
        setError(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex h-screen w-full bg-[#FAFAFA] items-center justify-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/50 blur-[120px] rounded-full"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center max-w-sm w-full animate-in fade-in zoom-in-95 duration-500 bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 shadow-sm">
                        <Lock className="text-blue-600 w-7 h-7" />
                    </div>

                    <h1 className="text-[22px] font-extrabold text-gray-900 mb-2 tracking-tight">Admin Authentication</h1>
                    <p className="text-gray-500 text-[13px] font-medium mb-8 text-center">Enter authorized PIN to access control systems</p>

                    {/* PIN Display */}
                    <div className="flex gap-4 mb-10">
                        {[0, 1, 2, 3].map((index) => (
                            <div
                                key={index}
                                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${error
                                    ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                                    : pinSequence.length > index
                                        ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-110'
                                        : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Keypad */}
                    <div className="grid grid-cols-3 gap-3 w-full px-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button
                                key={num}
                                onClick={() => handleNumberClick(num.toString())}
                                className="h-14 rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 text-lg font-bold hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-sm"
                            >
                                {num}
                            </button>
                        ))}
                        <div className="h-14"></div>
                        <button
                            onClick={() => handleNumberClick('0')}
                            className="h-14 rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 text-lg font-bold hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-sm"
                        >
                            0
                        </button>
                        <button
                            onClick={handleDelete}
                            className="h-14 rounded-2xl bg-gray-50 border border-gray-100 text-gray-600 hover:text-red-500 hover:bg-red-50 active:bg-red-100 transition-colors shadow-sm flex items-center justify-center"
                        >
                            <Delete className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Hint */}
                    <p className="text-gray-400 mt-8 text-[11px] font-bold uppercase tracking-widest">
                        Hint: Try 1234 for Demo
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {children}

                {/* Optional: Add a subtle overlay or top bar indicator showing authenticated state if desired */}
            </div>
        </div>
    );
}
