import React from 'react';

const MARKET_SYMBOLS = {
  indian: ['NIFTY', 'BANKNIFTY', 'FINNIFTY'],
  crypto: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'],
  forex: ['XAUUSD', 'EURUSD', 'GBPUSD']
};

export function Dashboard({ context, onUpdate, loading }) {
  if (!context) return <div className="p-6">Loading...</div>;

  const onMarketChange = (selected_market) => {
    onUpdate({
      selected_market,
      selected_symbol: MARKET_SYMBOLS[selected_market][0],
      mode: context.mode,
      auto_volatility_filter: context.auto_volatility_filter
    });
  };

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">
      <section className="grid gap-4 rounded-xl border p-4 shadow-sm sm:grid-cols-2">
        <label className="text-sm font-medium">
          Market
          <select className="mt-2 w-full rounded border p-2" value={context.selected_market} onChange={(e) => onMarketChange(e.target.value)}>
            <option value="indian">Indian</option>
            <option value="crypto">Crypto</option>
            <option value="forex">Forex</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Symbol
          <select
            className="mt-2 w-full rounded border p-2"
            value={context.selected_symbol}
            onChange={(e) => onUpdate({ ...context, selected_symbol: e.target.value })}
          >
            {MARKET_SYMBOLS[context.selected_market].map((symbol) => (
              <option key={symbol} value={symbol}>{symbol}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Mode
          <select className="mt-2 w-full rounded border p-2" value={context.mode} onChange={(e) => onUpdate({ ...context, mode: e.target.value })}>
            <option value="paper">Paper</option>
            <option value="live">Live</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={context.auto_volatility_filter}
            onChange={(e) => onUpdate({ ...context, auto_volatility_filter: e.target.checked })}
          />
          Auto Volatility Filter ON/OFF
        </label>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        <Slide title="Slide 2 — Market Intelligence" data={context.market_intelligence} />
        <Slide title="Slide 3 — Strategy Analytics" data={context.strategy_analytics} />
        <Slide title="Slide 4 — Crowd Psychology" data={context.crowd_psychology} />
      </section>
      {loading && <p className="mt-2 text-xs text-slate-500">Applying safe bot restart...</p>}
    </main>
  );
}

function Slide({ title, data }) {
  return (
    <article className="rounded-xl border p-4 shadow-sm">
      <h2 className="text-base font-semibold">{title}</h2>
      <pre className="mt-3 overflow-auto rounded bg-slate-900 p-3 text-xs text-slate-100">{JSON.stringify(data, null, 2)}</pre>
    </article>
  );
}
