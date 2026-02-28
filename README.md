# OctaQuant — Multi-Market Trading Automation SaaS

Production-oriented monorepo scaffold for a FastAPI + PostgreSQL backend and React + Tailwind frontend.

## Folder structure

```text
backend/
  app/
    routers/market.py
    services/
      bot_manager.py
      market_context_service.py
      risk_engine.py
      strategy_engine.py
      volatility.py
    config.py
    db.py
    deps.py
    main.py
    models.py
    schemas.py
  market_adapters/
    indian.py
    crypto.py
    forex.py
  market_router.py
  migrations/001_create_market_context.sql
  requirements.txt
frontend/
  src/
    api/marketApi.js
    components/Dashboard.jsx
    hooks/useMarketContext.js
    App.jsx
    main.jsx
    styles.css
  index.html
  package.json
  vite.config.js
```

## Core capabilities implemented

- Global market context persisted in `market_context` table and managed through `/api/v1/market/context`.
- Dynamic market adapter loading via `backend/market_router.py`.
- Volatility filter with market-specific thresholds and automatic HOLD behavior through strategy engine.
- Unified risk engine for INR and USD contracts with lot-size normalization.
- Safe bot restart lifecycle whenever market/symbol/mode changes.
- Mobile-first dashboard where market selection dynamically updates intelligence, strategy analytics, crowd psychology, and symbol dropdown.

## Run backend

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload
```

## Run frontend

```bash
cd frontend
npm install
npm run dev
```
