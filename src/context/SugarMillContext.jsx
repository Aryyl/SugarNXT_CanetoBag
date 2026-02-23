import React, { createContext, useContext, useState, useEffect } from 'react';

const SugarMillContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSugarMill = () => useContext(SugarMillContext);

export const SugarMillProvider = ({ children }) => {
    // ---- CORE SIMULATION STATE ----
    // Inputs
    const [crushRate, setCrushRate] = useState(250); // Tons per Hour
    const [totalCane, setTotalCane] = useState(1250); // Daily Tons crushed so far

    // Quality
    const [polPercent, setPolPercent] = useState(14.2);
    const brixPercent = 15.1;

    // Process Node States
    const [millingLoad, setMillingLoad] = useState(92); // %
    const clarificationpH = 7.1;
    const [boilerPressure, setBoilerPressure] = useState(65); // bar
    const crystallizerBrix = 85; // %

    // Global Health & Automation
    const automationIndex = 92; // %
    const healthIndex = 98; // %
    const energyUsage = 28; // kWh/T

    // Derived Financials & Outputs
    const recoveryRate = (polPercent * 0.85) / 100; // Simplified recovery formula (~12%)
    const sugarProduced = totalCane * recoveryRate; // Tons of sugar
    const marketPricePerTon = 35000; // ₹
    const dailyRevenue = sugarProduced * marketPricePerTon; // ₹
    const maintenanceSavings = 4200000; // ₹4.2L Base (Incrementing)

    // IIoT Simulation Engine
    useEffect(() => {
        const tick = setInterval(() => {
            // 1. Randomize base telemetry slightly to simulate live IIoT sensors
            setCrushRate(prev => {
                const fluctuation = (Math.random() * 4) - 2; // -2 to +2
                return Math.max(200, Math.min(300, prev + fluctuation));
            });

            setPolPercent(prev => {
                const fluctuation = (Math.random() * 0.2) - 0.1; // -0.1 to +0.1
                return parseFloat(Math.max(13.5, Math.min(15.5, prev + fluctuation)).toFixed(2));
            });

            setMillingLoad(prev => {
                const fluctuation = (Math.random() * 2) - 1;
                return Math.max(80, Math.min(100, prev + fluctuation));
            });

            setBoilerPressure(prev => {
                const fluctuation = (Math.random() * 1) - 0.5;
                return parseFloat(Math.max(60, Math.min(70, prev + fluctuation)).toFixed(1));
            });

            // 2. Increment cumulative totals logically
            // If we are crushing ~250 T/h, that's ~4.16 T/min, or ~0.069 T/sec
            setTotalCane(prev => prev + (crushRate / 3600) * 3); // Update every 3 seconds

        }, 3000); // Trigger physical event loop every 3 seconds

        return () => clearInterval(tick);
    }, [crushRate]);

    // Data package exposed to all dashboards
    const value = {
        metrics: {
            input: {
                crushRate: crushRate.toFixed(1),
                totalCane: totalCane.toFixed(0),
                polPercent: polPercent.toFixed(2),
                brixPercent: brixPercent.toFixed(2),
            },
            processes: {
                millingLoad: millingLoad.toFixed(1),
                clarificationpH: clarificationpH.toFixed(1),
                boilerPressure: boilerPressure.toFixed(1),
                crystallizerBrix: crystallizerBrix.toFixed(1)
            },
            health: {
                automationIndex,
                healthIndex,
                energyUsage: energyUsage.toFixed(1)
            },
            derived: {
                sugarProduced: sugarProduced.toFixed(1),
                recoveryRate: (recoveryRate * 100).toFixed(2),
                dailyRevenue,
                maintenanceSavings
            }
        }
    };

    return (
        <SugarMillContext.Provider value={value}>
            {children}
        </SugarMillContext.Provider>
    );
};
