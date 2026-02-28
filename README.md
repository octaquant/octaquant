# OctaQuant – Multi-Market Risk Intelligence Engine

> Building India’s First Retail Trap Detection & Automated Risk Infrastructure.

OctaQuant is a **multi-market AI risk intelligence and trading automation infrastructure** designed for capital preservation, probabilistic execution, and systematic decision support across Indian derivatives, crypto, and forex markets.

This project is not a signal-selling bot and not a discretionary trading playbook. It is an institutional-grade framework for turning fragmented market data into risk-aware, automation-ready execution intelligence.

---

## Core Thesis

Most retail participants underperform because they optimize for **entry excitement** instead of **risk survival**. OctaQuant is built around a different premise:

- Detect structural retail traps before they become losses.
- Quantify uncertainty in real time using probability-first models.
- Execute with risk constraints that prioritize capital longevity.

---

## Why 90% of Traders Lose (and What OctaQuant Solves)

### 1) Emotional Trading vs Probability Trading

Retail systems frequently rely on narrative, impulse, and recency bias. A setup that "worked yesterday" is overfit into tomorrow’s market. OctaQuant reframes decisions as conditional probabilities under changing volatility and liquidity regimes.

### 2) Risk of Ruin Is Usually Ignored

Even a strategy with a positive expected value can fail with poor sizing discipline. OctaQuant integrates risk-of-ruin constraints into the execution pathway, forcing survival-centric exposure limits rather than return-chasing behavior.

### 3) Volatility Regime Blindness

Many losses are not signal failures—they are regime failures. Strategies are often deployed into unsuitable volatility states. OctaQuant applies volatility filtering and regime-aware logic before trade authorization.

---

## What OctaQuant Builds

### Layered Architecture

```text
OctaQuant Risk Intelligence Stack
├── Layer 1: Market Adapters
│   ├── India: NIFTY, BANKNIFTY, Option Chain OI, PCR, India VIX
│   ├── Crypto: BTC, ETH, funding data, liquidation clusters
│   └── Forex: XAUUSD, EURUSD, ATR/session volatility
├── Layer 2: Strategy Engine
│   ├── Signal orchestration
│   ├── Multi-timeframe context routing
│   └── Rule + model hybrid evaluation
├── Layer 3: Smart Money Divergence Model
│   ├── Price-volume behavior asymmetry
│   ├── Distribution/absorption signatures
│   └── Retail trap probability scoring
├── Layer 4: Volatility Regime Classifier
│   ├── Expansion/contraction detection
│   ├── Session-aware volatility mapping
│   └── Trade-permission filtering
├── Layer 5: Universal Risk Engine
│   ├── Position sizing constraints
│   ├── Risk-of-ruin estimation
│   ├── Capital survival probability
│   └── Dynamic drawdown throttling
├── Layer 6: Paper & Live Execution System
│   ├── Simulated execution environment
│   ├── Broker/exchange order routing
│   └── Slippage/latency-aware controls
└── Layer 7: SaaS Multi-User Architecture
    ├── User segregation + encrypted API vault
    ├── Subscription and entitlement controls
    ├── Market profile switching
    └── Institutional monitoring dashboard
```

---

## Market Coverage

### Indian Markets

- NIFTY and BANKNIFTY index structures
- Option Chain Open Interest mapping
- PCR regime interpretation
- India VIX for volatility-state gating

### Crypto Markets

- BTC and ETH directional structure
- Funding rate pressure as positioning proxy
- Liquidation cluster behavior for sweep risk

### Forex Markets

- Gold (XAUUSD) volatility and trend-state diagnostics
- EURUSD structure and session-specific context
- ATR and session volatility normalization

---

## Strategy Intelligence Modules

OctaQuant combines deterministic and probabilistic components to reduce false confidence in unstable conditions.

- **Retail Trap Detection Model**: Identifies likely breakout failures and liquidity sweeps where retail participation is structurally vulnerable.
- **Smart Money Distribution Logic**: Tracks potential inventory transfer and non-confirmation behavior between price and participation.
- **Gamma Cluster Awareness**: Incorporates option-driven pin/repulsion behavior around key strike clusters in expiry-sensitive environments.
- **Expiry Day Volatility Model**: Re-weights expectations during high-compression/high-expansion windows around derivatives settlement.
- **Monte Carlo Simulation**: Stress-tests strategy performance across scenario paths to estimate return dispersion and drawdown probabilities.
- **Risk of Ruin Calculation**: Continuously estimates bankruptcy probability under current hit rate, payoff ratio, and exposure profile.
- **Capital Survival Probability**: Converts tactical decisions into long-horizon survival metrics, enabling defensive portfolio posture.

---

## SaaS Architecture

OctaQuant is designed as a scalable product infrastructure:

- Multi-user architecture with isolated strategy/risk profiles
- Encrypted API key handling and secure execution boundaries
- Subscription-driven access tiers and feature entitlements
- Paper trading mode for controlled strategy validation
- Live trading mode with explicit risk controls
- Market switching system (India/Crypto/Forex)
- Automatic volatility filter at pre-trade stage

---

## Impact

OctaQuant is intended to shift participant behavior:

- From emotional trading to probabilistic trading
- From guessing to data-driven execution
- From gambling behavior to structured capital survival
- From retail speculation to risk engineering discipline

---

## Roadmap

1. **Phase 1: Core Engine**  
   Build the universal risk core, data normalization layer, and simulation framework.
2. **Phase 2: Multi-Market Deployment**  
   Integrate India derivatives, crypto derivatives, and forex regime adapters.
3. **Phase 3: SaaS Launch**  
   Release secure multi-user product with tiered access and portfolio-level controls.
4. **Phase 4: Institutional Capital Integration**  
   Add allocators, managed accounts, and advanced compliance-grade reporting.
5. **Phase 5: Hedge Fund Infrastructure**  
   Expand to full-stack quantitative risk and execution infrastructure for institutional deployment.

---

## Founder

**Ravi Kumar Rai**  
Founder & Risk Systems Architect

Focused on building long-duration financial infrastructure centered on risk intelligence, execution discipline, and capital preservation—not short-term signal distribution.

---

## Disclaimer

OctaQuant is a trading automation infrastructure. Users are responsible for their own capital decisions.

## Backend SaaS API (FastAPI)

The `backend/` service now includes deployable SaaS primitives:
- JWT auth (`/api/v1/auth/register`, `/api/v1/auth/login`)
- Subscription entitlements (`free`, `pro`, `elite`)
- Encrypted API credential vault with replace + test endpoints
- Multi-market context switching for Indian/Crypto/Forex
- Per-user bot controls (start/stop, paper mode, live-mode placeholder)
- Risk engine endpoint with position sizing + risk-of-ruin estimate
- Background user workers for independent bot heartbeats

### Local Run

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Required Environment Variables

- `DATABASE_URL`
- `JWT_SECRET`
- `FERNET_KEY` (must be a valid Fernet key)
- `ACCESS_TOKEN_EXPIRE_MINUTES` (optional)

### Deployment

- Docker image: `backend/Dockerfile`
- Render blueprint: `backend/render.yaml`
- Fly.io app config: `backend/fly.toml`

## Frontend Deployment (Vercel)

The React + Vite app lives in `frontend/` and is configured for Vercel production deployment.

### Prerequisites

- Push this repository to GitHub.
- Ensure your frontend API endpoint is available and set as `VITE_API_URL` in Vercel environment variables.

### Deploy steps

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New Project** and import this GitHub repository.
3. In project settings, set **Root Directory** to `frontend`.
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables (for example):
   - `VITE_API_URL=https://your-api-domain.com`
6. Deploy.

Vite reads frontend variables with the `VITE_` prefix via `import.meta.env`, for example:

```js
const apiUrl = import.meta.env.VITE_API_URL;
```
