# Liquidity Intelligence Platform

A real-time liquidity risk management platform designed for financial institutions to monitor, analyze, and respond to liquidity challenges in dynamic market conditions.

## What This Platform Truly Is

The Liquidity Intelligence Platform is a comprehensive financial technology solution that provides **real-time liquidity monitoring** and **predictive risk assessment** for banks and financial institutions. Unlike traditional treasury management systems that focus on historical reporting, this platform offers:

- **Live liquidity horizon mapping** across regulatory time buckets
- **Predictive analytics** for cash flow projections and withdrawal behavior
- **Stress testing capabilities** for extreme market scenarios
- **Automated decision support** with actionable recommendations
- **Multi-source data integration** from core banking, payments, treasury, and markets

## Philosophy & Design Principles

### Real-Time Intelligence Over Historical Reporting
Traditional liquidity management relies on end-of-day snapshots and manual analysis. This platform embraces a philosophy of **continuous monitoring** and **proactive intervention**, treating liquidity as a dynamic, real-time challenge rather than a periodic compliance exercise.

### Risk-First Architecture
Every component is designed with risk mitigation as the primary objective:
- **Multi-layered alerting** with severity-based prioritization
- **Scenario-based stress testing** to simulate extreme conditions
- **Confidence scoring** on all financial events and predictions
- **Audit trails** with event lineage for regulatory compliance

### Human-Machine Collaboration
The platform bridges human expertise with machine intelligence:
- **Semi-automated execution** of liquidity actions
- **Explainable AI recommendations** with clear reasoning
- **Override capabilities** for experienced treasury teams
- **Full audit logging** of all automated and manual interventions

## Core Metrics & KPIs

### Regulatory Compliance Metrics
- **LCR (Liquidity Coverage Ratio)**: High-quality liquid assets vs. net cash outflows over 30 days (regulatory minimum: 100%)
- **NSFR (Net Stable Funding Ratio)**: Stable funding relative to required stable funding over one year (regulatory minimum: 100%)

### Operational Liquidity Metrics
- **Cash Position**: Current available cash balance with intraday net flow percentage
- **Survival Days**: Number of days the institution can operate without additional funding
- **Net Cash Gaps**: Liquidity position across time buckets (intraday, 1-7 days, 8-30 days, etc.)

### Risk Assessment
- **Risk Label**: Dynamic risk classification (Stable/Watch/Critical)
- **Confidence Scores**: Reliability rating for each financial event and prediction
- **Stress Impact**: Projected deterioration under various market scenarios

## Who This Platform Is For

### Primary Users
- **Treasury Teams**: Real-time liquidity monitoring and cash management
- **Risk Managers**: Regulatory compliance and stress testing oversight
- **Chief Risk Officers**: Enterprise-wide liquidity risk assessment
- **Liquidity Committees**: Data-driven decision making for liquidity policies

### Secondary Users
- **Regulators**: Supervisory monitoring and compliance verification
- **Financial Analysts**: Market impact analysis and scenario planning
- **IT Operations**: System monitoring and data pipeline management

### Target Organizations
- **Commercial Banks**: Core liquidity management and regulatory reporting
- **Investment Banks**: Intraday liquidity and market risk integration
- **Fintech Companies**: Liquidity-as-a-service providers
- **Central Banks**: Supervisory technology and market monitoring

## Key Features

### 🔍 Real-Time Liquidity Monitoring
- **Live data streaming** from multiple financial systems
- **Normalized event processing** with confidence scoring
- **Intraday gap analysis** across regulatory time buckets
- **Automated anomaly detection** for unusual withdrawal patterns

### 📊 Advanced Analytics Engine
- **Time Bucket Engine**: Maps cash flows to regulatory horizons
- **Liquidity Engine**: Calculates HQLA buffers and haircut applications
- **Risk Engine**: Computes LCR, NSFR, and funding concentrations
- **Forecasting Engine**: Predicts withdrawal behavior and cash flow projections
- **Stress Testing Engine**: Simulates bank runs, market freezes, and credit downgrades

### ⚠️ Intelligent Alerting System
- **Multi-severity alerts**: Critical, Warning, and Informational levels
- **Context-aware notifications**: Specific details about breaches and gaps
- **Real-time updates**: Immediate notification of regulatory breaches
- **Historical tracking**: Alert patterns and resolution times

### 🎯 Decision Support & Automation
- **Actionable recommendations**: Specific steps to improve liquidity positions
- **Semi-automated execution**: Human approval with automated queuing
- **Audit trails**: Complete lineage from events to actions taken
- **Override capabilities**: Manual intervention when needed

### 📈 Stress Testing & Scenario Analysis
- **Pre-built scenarios**: Bank run, market freeze, credit downgrade
- **Customizable parameters**: Outflow multipliers, haircut applications
- **Impact visualization**: Side-by-side comparison of normal vs. stressed conditions
- **Survival analysis**: Projected days of operation under stress

### 🔗 Multi-Source Data Integration
- **Core Banking Systems**: Real-time transaction and balance data
- **Payment Systems**: Transfer and settlement information
- **Treasury Platforms**: Asset/liability and funding position data
- **External Markets**: Interest rates, bond prices, and FX data

## Project Architecture

### Frontend (Next.js + Tailwind CSS)
- **App Router**: Modern React architecture with server/client components
- **Glassmorphism UI**: Modern, translucent design with depth and hierarchy
- **Responsive Dashboard**: Mobile-first design with adaptive layouts
- **Real-time Updates**: Server-Sent Events for live data streaming

### Backend (Node.js + Express)
- **RESTful API**: Clean HTTP endpoints for data access and actions
- **Event Simulation**: Realistic financial event generation for testing
- **Stream Processing**: Server-Sent Events for real-time data delivery
- **State Management**: In-memory computation with persistence simulation

### Data Flow
1. **Event Ingestion**: Financial events from multiple sources normalized to common schema
2. **State Computation**: Real-time calculation of liquidity metrics and risk indicators
3. **Scenario Projection**: Stress testing and forward-looking analysis
4. **Recommendation Engine**: Action prioritization based on current state
5. **Alert Generation**: Risk-based notification system
6. **Action Execution**: Audited implementation of liquidity interventions

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd liquidity-intelligence-platform

# Install all dependencies
npm install
```

### Running the Platform

```bash
# Start both frontend and backend in development mode
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

### Health Check
Visit `http://localhost:8000/api/health` to verify the backend is running.

## API Reference

### Configuration Endpoints
- `GET /api/config` - Platform configuration (sources, engines, scenarios, modes)

### State Endpoints
- `GET /api/state?mode=normal&scenario=bank_run` - Current liquidity snapshot
- `GET /api/stream?mode=normal&scenario=bank_run` - Real-time Server-Sent Events stream

### Action Endpoints
- `POST /api/events/spike` - Inject sudden withdrawal spike for testing
- `POST /api/actions/execute` - Queue recommended liquidity action

### Query Parameters
- `mode`: Operating mode (`normal`, `stress`, `crisis`)
- `scenario`: Stress scenario (`bank_run`, `market_freeze`, `credit_downgrade`)

## Dashboard Views

### Command Center
Primary operational view with:
- Real-time liquidity metrics and risk indicators
- Actionable recommendations queue
- Active alerts and notifications
- Data source status monitoring
- Semi-automated action execution

### Engines View
Technical architecture overview showing:
- Active service modules and their functions
- Engine status and processing capabilities
- System health and performance metrics

### Events View
Detailed event monitoring with:
- Normalized financial event stream
- Event confidence scoring and metadata
- Source system attribution
- Manual spike injection for testing

### Stress Testing View
Scenario analysis interface featuring:
- Side-by-side normal vs. stressed comparisons
- Configurable scenario parameters
- Impact visualization on key metrics
- Survival analysis projections

## Technology Stack

### Frontend
- **Next.js 14+**: App Router with server components
- **Tailwind CSS**: Utility-first styling with custom glassmorphism theme
- **Recharts**: Responsive data visualization components
- **Server-Sent Events**: Real-time data streaming

### Backend
- **Node.js**: Runtime environment
- **Express.js**: RESTful API framework
- **CORS**: Cross-origin resource sharing
- **In-memory state**: Fast computation and simulation

### Development Tools
- **Concurrently**: Parallel development server execution
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing and optimization

## Contributing

This platform is designed for financial institutions and regulatory environments. Contributions should focus on:

- Enhanced risk modeling and prediction accuracy
- Additional regulatory compliance features
- Improved user experience for treasury operations
- Extended data source integrations
- Performance optimizations for high-frequency data

## License

Proprietary - Contact for licensing information.

## Support

For technical support or feature requests, please contact the development team.
