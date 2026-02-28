CREATE TYPE subscriptionplan AS ENUM ('FREE', 'PRO', 'ELITE');
CREATE TYPE trademode AS ENUM ('PAPER', 'LIVE');
CREATE TYPE markettype AS ENUM ('INDIAN', 'CRYPTO', 'FOREX');

ALTER TABLE users ADD COLUMN IF NOT EXISTS plan subscriptionplan NOT NULL DEFAULT 'FREE';
ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE bot_state ADD COLUMN IF NOT EXISTS last_heartbeat timestamptz;
ALTER TABLE bot_state ADD COLUMN IF NOT EXISTS virtual_equity double precision NOT NULL DEFAULT 100000;

CREATE TABLE IF NOT EXISTS api_credentials (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  market markettype NOT NULL,
  encrypted_key text NOT NULL,
  encrypted_secret text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  replaced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
