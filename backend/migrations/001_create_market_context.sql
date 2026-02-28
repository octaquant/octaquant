CREATE TYPE markettype AS ENUM ('indian', 'crypto', 'forex');
CREATE TYPE trademode AS ENUM ('paper', 'live');

CREATE TABLE IF NOT EXISTS market_context (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    selected_market markettype NOT NULL DEFAULT 'indian',
    selected_symbol VARCHAR(50) NOT NULL DEFAULT 'NIFTY',
    auto_volatility_filter BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bot_state (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    enabled BOOLEAN NOT NULL DEFAULT FALSE,
    mode trademode NOT NULL DEFAULT 'paper',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
