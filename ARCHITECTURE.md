# SugarMill AI (SugarNXT): System Architecture

This document provides a comprehensive overview of the **SugarMill AI** (SugarNXT Enterprise V4.2) architecture. It details what the platform does, how it was constructed under the hood, and the core modules that power its real-time IIoT simulation.

---

## 🏭 1. What The Platform Does

SugarMill AI is an advanced, physics-simulated industrial monitoring dashboard for modern sugar manufacturing facilities. It replicates the behavior of a heavy industrial pipeline without requiring a physical backend.

Its core purposes are:
1.  **Real-Time Telemetry Visualization:** It displays simulated, dynamic sensor data (Pressure, Temperature, Flow Rates, Brix %, pH) across a 6-stage milling process.
2.  **Autonomous Operations Monitoring:** It visualizes the transition from manual control to "Zero-Touch" AI automation through confidence scoring and process overrides.
3.  **Predictive Maintenance:** It tracks the "Remaining Useful Life" (RUL) of physical assets (like gearboxes and motors) using simulated vibration and temperature deviations.
4.  **Financial Analytics:** It actively computes daily revenue, ROI payback periods, and maintenance savings directly derived from the simulated physical throughput (crush rate and recovery percentage).
5.  **Secure Administration:** It features a segregated, PIN-protected environment for system administrators to manage simulated hardware limits, AI models, and user roles.

---

## 🛠️ 2. How It Is Built (Tech Stack)

The application is a pure front-end Single Page Application (SPA), engineered to feel like a deeply integrated enterprise SCADA system.

*   **Core Framework:** React 18
*   **Build Tool:** Vite (for rapid hot-module replacement and optimized production bundling)
*   **Styling Engine:** Vanilla Tailwind CSS (No component libraries; every element is custom-styled using Tailwind utility classes for maximum bespoke control).
*   **Routing:** React Router DOM (v6) for seamless client-side navigation without page reloads.
*   **State Management:** React Context API (`SugarMillContext`). We avoided heavy external libraries like Redux in favor of native, lightweight context structures since the simulation engine acts as a single source of truth.
*   **Iconography:** Lucide-React (for consistent, scalable SVG industrial icons).

---

## 🧠 3. Core Engine: The Simulation Context

The beating heart of the platform is `src/context/SugarMillContext.jsx`. Because there is no mechanical backend, this file acts as a **Physics & Financial Simulation Engine**.

**How the Engine Works:**
*   It initializes baseline constants for the factory (e.g., Crush Rate: 250 T/h, Ambient Boiler Pressure: 65 bar).
*   A React `useEffect` hook runs a recurring `setInterval` "tick" every 3 seconds.
*   During each tick, random variances (`fluctuations`) are mathematically applied to the base telemetry to simulate real-world physical chaos (pipe vibrations, temperature spikes).
*   These localized data points then cascade into larger cumulative metrics. For example, the `Crush Rate` mathematically increments the `Total Cane Crushed`, which then calculates the `Sugar Produced`, which ultimately updates the `Daily Revenue` and `Maintenance Savings`.
*   This cohesive data package is exposed via a standard `useSugarMill()` custom hook to the entire visual application.

---

## 🏗️ 4. What Was Built (Component Architecture)

The application is cleanly divided into two primary environments: The **Operator Visors** and the **Control Admin Panel**.

### A. The Operator Visors (Main App Layout)
These screens are wrapped in `Layout.jsx`, which features a collapsible left-hand navigation sidebar and a top status bar complete with a global Emergency Stop sequence.

1.  **Command Center (`/dashboard`):** The at-a-glance facility overview. Houses KPI cards bound to the simulation context, a daily tonnage trend line, and recent anomaly alerts.
2.  **Zero-Touch Ops (`/zero-touch` / `/human-ai-control`):** The autonomous control grid. It features a 5-column "Active Process Matrix" that visually represents the AI's confidence levels (via a 5-dot score) in operating different mill stages automatically versus requiring human intervention.
3.  **Predictive Maintenance (`/predictive-maint`):** A forensic view of equipment. Displays timeline lifecycle charts and real-time degradation metrics to predict catastrophic gear failures.
4.  **Process Flow & Node Dashboards (`/process-flow/*`):** An interactive 6-stage pipeline map (Cane Yard → Milling → Clarification → Evaporation → Crystallization → Bagging). Users can click into any node (`ProcessDetail.jsx`) to see microscopic telemetry for that specific stage.
5.  **Cane Quality AI (`/cane-quality`):** Visualizes the incoming raw material grading, estimating sucrose polarity (Pol %) and Brix density.
6.  **Analytics & ROI (`/analytics-roi`):** The financial translation layer. It converts the physical facility output metrics into Indian Rupees (₹), mapping capital expenditures and carbon footprint reductions.

### B. The Control Admin Panel (`/admin-panel/*`)
A strict management zone wrapped in `AdminLayout.jsx`.

*   **Security Architecture:** Unlike the public operator routes, entering the `/admin-panel` triggers a mandatory PIN-pad lock screen (`1234`). This state is verified against `sessionStorage`. When the component unmounts (the user leaves the admin area), the session token is destroyed, forcing re-authentication upon return.
*   **The Modules:**
    *   **System & Infrastructure (`AdminSystem.jsx`):** Maps the edge computing devices connecting the SCADA network to the cloud. Simulated "Reboot" actions update online statuses.
    *   **Equipment Configuration (`AdminEquipment.jsx`):** Tables dictating the pressure and temperature limits of individual motors. These tables fetch their master thresholds directly from the `SugarMillContext`.
    *   **Audit Logs (`AdminLogs.jsx`):** An immutable, time-stamped ledger of every action taken by operators (Set-point changes, Manual overrides). Features distinct Tailwind-styled badges.
    *   **Users, Alerts, Integrations & AI Models:** Comprehensive data grids for configuring the platform's backend rulesets, API hooks, and personnel access levels.

---

## 📂 5. Directory Mapping

```text
src/
├── components/          # Reusable UI Blocks
│   ├── Layout.jsx           # Public Wrapper (Sidebar, TopNav)
│   ├── AdminLayout.jsx      # Auth-Protected Wrapper (PIN Lock)
│   ├── KpiCards.jsx         # Live telemetry cards
│   ├── ProcessAutomationTable.jsx # Zero-Touch status matrix
│   └── ...
├── context/
│   └── SugarMillContext.jsx # The Real-Time Simulation Engine
├── pages/               # Top-Level Route Views
│   ├── CommandCenter.jsx
│   ├── ProcessFlow.jsx
│   ├── AdminSystem.jsx
│   ├── AdminLogs.jsx
│   └── ...
├── App.jsx              # Application Router & Provider Mount
├── index.css            # Base Tailwind imports & bespoke animations
└── main.jsx             # React Virtual DOM entry point
```

This structure ensures complete decoupling of the visual presentation layers from the simulated hardware logic, resulting in a highly performant and scalable React application.
