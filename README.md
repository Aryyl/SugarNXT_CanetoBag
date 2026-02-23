# SugarMill AI (Enterprise V4.2)
**Intelligent Operations & Predictive Maintenance Dashboard**

SugarMill AI is a state-of-the-art enterprise monitoring platform built to visualize complex industrial processes within a sugar manufacturing facility. Built with React and Tailwind CSS, this platform simulates real-time physics-based IIoT sensor telemetry, AI-driven predictive maintenance, and autonomous hybrid-control systems across a sprawling 6-stage milling pipeline.

## 🌟 Key Features

* **Physics-Engine Simulation Context (`SugarMillContext.jsx`)**: 
  A centralized global state manager that simulates live sensor fluctuations (Pressure, Temp, Load, pH) every 3 seconds, mimicking the chaotic reality of heavy industrial machinery. Total daily tonnage and derived financial outputs (ROI, Savings) dynamically calculate strictly from this root physics engine.
  
* **Zero-Touch Automation Index**:
  Visualizes the balance of AI decision-making vs manual human overrides. Features a robust 'Hybrid Active' matrix tracking confidence intervals for autonomous systems governing the Shredder, Boiler, and Crystallization lines.

* **6-Stage Process Pipeline Visualizer**:
  An interactive, flowing process map tracing the production journey: *Cane Yard → Milling → Clarification → Evaporation → Crystallization → Bagging*. Each localized node expands into detailed dashboards exposing component-level telemetry.

* **Predictive Maintenance Ecosystem**:
  Uses simulated historical deviation to trend Equipment Health Scores and forecast "Remaining Useful Life" (RUL) preventing catastrophic line failures before they occur.

* **Secure Admin Operations Panel**:
  An isolated administrative interface protected by a session-gated PIN firewall (`1234`). Empowers facility engineers to:
  * Restructure hardware limits in the **Equipment Configuration** module.
  * Register new SCADA endpoints in the **System & Infrastructure** network visualizer.
  * Audit all immutable operator changes across the **Security Logs**.

## 🚀 Tech Stack

- **Frontend Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS (Vanilla)
- **Routing:** React Router DOM (v6)
- **Icons:** Lucide-React
- **Architecture:** Context API (Global State)

## 📦 Local Installation

To run the SugarMill AI platform locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aryyl/SugarNXT_CanetoBag.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd SugarNXT_CanetoBag
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`. 
   
> **Note:** To access the secure `/admin-panel` routes, use the demo PIN `1234`.

## 📁 Project Architecture

The application is structured to strictly separate pure UI presentation logic from the mathematical IIoT simulation.

```text
src/
├── components/          # Reusable UI widgets (KpiCards, TopBar, AdminLayout)
├── context/
│   └── SugarMillContext.jsx  # Global IIoT Physics Simulation Engine
├── pages/
│   ├── CommandCenter.jsx     # Main Operator Dashboard
│   ├── ProcessFlow.jsx       # 6-Stage Pipeline Interactive Map
│   ├── PredictiveMaint.jsx   # Equipment Health Analytics
│   ├── AdminSystem.jsx       # Admin: Edge Device Infrastructure
│   └── ...                   # Additional routing views
├── App.jsx              # Core Router and Context Provider Injection
└── index.css            # Global Tailwind Directives
```

## 🔐 Admin Authentication System
The administrative interface utilizes a robust `sessionStorage` guard logic to enforce a strict visual boundary between standard factory operators and system engineers. The `AdminLayout.jsx` wrapper validates the lifecycle of the token and automatically forces an ejection unmount when exiting the panel.

---
*Developed for industrial excellence. Built for the future of automated refining.*
