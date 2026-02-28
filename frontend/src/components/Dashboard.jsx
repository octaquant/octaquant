import React, { useEffect, useState } from 'react';

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
      <section className="panel-elite animate-fade-in grid gap-4 sm:grid-cols-2">
        <label className="field-wrap">
          <span className="field-label">Market</span>
          <select className="field-input" value={context.selected_market} onChange={(e) => onMarketChange(e.target.value)}>
            <option value="indian">Indian</option>
            <option value="crypto">Crypto</option>
            <option value="forex">Forex</option>
          </select>
        </label>
        <label className="field-wrap">
          <span className="field-label">Symbol</span>
          <select
            className="field-input"
            value={context.selected_symbol}
            onChange={(e) => onUpdate({ ...context, selected_symbol: e.target.value })}
          >
            {MARKET_SYMBOLS[context.selected_market].map((symbol) => (
              <option key={symbol} value={symbol}>{symbol}</option>
            ))}
          </select>
        </label>
        <label className="field-wrap">
          <span className="field-label">Mode</span>
          <select className="field-input" value={context.mode} onChange={(e) => onUpdate({ ...context, mode: e.target.value })}>
            <option value="paper">Paper</option>
            <option value="live">Live</option>
          </select>
        </label>
        <label className="field-wrap justify-end">
          <span className="field-label">Volatility Filter</span>
          <span className="inline-flex items-center gap-3 rounded-xl border border-slate-700/70 bg-slate-950/70 px-4 py-[0.8rem] text-sm font-medium text-slate-200">
            <input
              type="checkbox"
              checked={context.auto_volatility_filter}
              onChange={(e) => onUpdate({ ...context, auto_volatility_filter: e.target.checked })}
            />
            Auto Volatility Filter ON/OFF
          </span>
        </label>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <MarketIntelligenceCard data={context.market_intelligence} />
        <StrategyAnalyticsCard data={context.strategy_analytics} />
        <CrowdPsychologyCard data={context.crowd_psychology} />
      </section>
      {loading && <p className="mt-2 text-xs text-cyan-300">Applying safe bot restart...</p>}
    </main>
  );
}

function MarketIntelligenceCard({ data = {} }) {
  const trend = getTrend(data);
  const volatility = getVolatilityScore(data);
  const confidence = getConfidenceScore(data);

  return (
    <article className="dashboard-card animate-rise-in" style={{ animationDelay: '0ms' }}>
      <CardTitle title="Market Intelligence" subtitle="Live directional pulse" />
      <div className="space-y-4">
        <MetricRow label="Trend">
          <span className={`trend-badge ${trend.direction === 'bullish' ? 'trend-bullish' : 'trend-bearish'}`}>
            {trend.direction.toUpperCase()} · {trend.score > 0 ? '+' : ''}{trend.score.toFixed(1)}
          </span>
        </MetricRow>

        <MetricRow label="Volatility">
          <div className="w-full">
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-800/90">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 transition-all duration-700" style={{ width: `${volatility}%` }} />
            </div>
            <p className="mt-1 text-right text-xs text-slate-400">{volatility.toFixed(0)}%</p>
          </div>
        </MetricRow>

        <MetricRow label="Confidence">
          <CircularGauge value={confidence} />
        </MetricRow>
      </div>
    </article>
  );
}

function StrategyAnalyticsCard({ data = {} }) {
  const metrics = data.metrics ?? {};
  const bars = extractNumericMetrics(metrics).slice(0, 4);
  const performanceBars = bars.length ? bars : [
    { label: 'stability', value: 62 },
    { label: 'alpha', value: 74 },
    { label: 'timing', value: 58 },
    { label: 'defense', value: 69 }
  ];
  const winRate = normalizePercent(metrics.oi_score ? metrics.oi_score * 10 : Math.abs(metrics.positioning_imbalance ?? metrics.sentiment_bias ?? metrics.atr_ratio ?? 55));
  const riskReward = Number(data.risk?.risk_to_reward ?? ratioFromRisk(data.risk) ?? 1.9);

  return (
    <article className="dashboard-card animate-rise-in" style={{ animationDelay: '90ms' }}>
      <CardTitle title="Strategy Analytics" subtitle="Execution quality" />
      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Win Rate</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-white">
            <AnimatedNumber value={winRate} suffix="%" decimals={0} />
          </p>
        </div>

        <MetricRow label="Risk Reward">
          <span className="ratio-badge">1 : <AnimatedNumber value={riskReward} decimals={2} /></span>
        </MetricRow>

        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Performance</p>
          <div className="mt-3 flex h-20 items-end gap-2">
            {performanceBars.map((item, index) => (
              <div key={item.label} className="group flex flex-1 flex-col items-center">
                <div className="w-full rounded-t-md bg-gradient-to-t from-cyan-500/90 to-indigo-400/90 transition-all duration-500 group-hover:from-cyan-300 group-hover:to-fuchsia-300" style={{ height: `${Math.max(item.value, 10)}%` }} />
                <span className="mt-1 text-[10px] uppercase tracking-[0.08em] text-slate-500">P{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function CrowdPsychologyCard({ data = {} }) {
  const heatmap = data.heatmap ?? [];
  const fearGreed = normalizePercent(heatmap.reduce((sum, zone) => sum + Number(zone.intensity || 0), 0) / Math.max(heatmap.length, 1) * 100);
  const sentiment = fearGreed > 60 ? 'greed' : fearGreed < 40 ? 'fear' : 'neutral';
  const socialVolume = normalizePercent((heatmap[0]?.intensity ?? 0.4) * 100);

  return (
    <article className="dashboard-card animate-rise-in" style={{ animationDelay: '180ms' }}>
      <CardTitle title="Crowd Psychology" subtitle="Behavioral signal stack" />
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Fear &amp; Greed Index</p>
          <div className="mt-2 overflow-hidden rounded-full bg-slate-800/90 p-1">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 transition-all duration-700"
              style={{ width: `${fearGreed}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-slate-400"><AnimatedNumber value={fearGreed} decimals={0} /> / 100</p>
        </div>

        <MetricRow label="Sentiment">
          <span className={`sentiment-badge sentiment-${sentiment}`}>{sentiment.toUpperCase()}</span>
        </MetricRow>

        <MetricRow label="Social Volume">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-300" />
              <p className="text-sm font-semibold text-slate-200">
                <AnimatedNumber value={socialVolume} decimals={0} suffix="%" /> active chatter
              </p>
            </div>
          </div>
        </MetricRow>
      </div>
    </article>
  );
}

function CardTitle({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-base font-semibold tracking-wide text-white">{title}</h2>
      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-400">{subtitle}</p>
    </div>
  );
}

function MetricRow({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-400">{label}</span>
      <div className="flex min-w-0 flex-1 justify-end">{children}</div>
    </div>
  );
}

function CircularGauge({ value }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-20 w-20">
      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 90 90" aria-hidden>
        <circle cx="45" cy="45" r={radius} stroke="rgba(51,65,85,0.8)" strokeWidth="9" fill="none" />
        <circle
          cx="45"
          cy="45"
          r={radius}
          stroke="url(#gaugeGradient)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
        <AnimatedNumber value={value} decimals={0} suffix="%" />
      </div>
    </div>
  );
}

function AnimatedNumber({ value, suffix = '', decimals = 0, duration = 900 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const target = Number.isFinite(value) ? value : 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return `${display.toFixed(decimals)}${suffix}`;
}

function extractNumericMetrics(metrics = {}) {
  return Object.entries(metrics)
    .filter(([, value]) => typeof value === 'number' && Number.isFinite(value))
    .map(([label, value]) => ({ label, value: normalizePercent(Math.abs(value)) }));
}

function ratioFromRisk(risk) {
  if (!risk) return null;
  const stop = Number(risk.stop_distance || 0);
  const lot = Number(risk.lot_size || 0);
  if (!stop || !lot) return null;
  return Math.max((lot / stop) * 0.1, 1);
}

function getTrend(data = {}) {
  const directional = data.gamma ?? data.funding_rate ?? (data.macro_regime === 'risk_on' ? 0.8 : -0.8);
  const seed = Number(directional);
  const score = Number.isFinite(seed) ? seed * 100 : 0;
  return { direction: score >= 0 ? 'bullish' : 'bearish', score };
}

function getVolatilityScore(data = {}) {
  const base = Math.abs(Number(data.vix ?? data.range_24h ?? data.session_volatility ?? data.atr ?? 0.55));
  return normalizePercent(base * (base < 3 ? 12 : 4));
}

function getConfidenceScore(data = {}) {
  const confidenceDrivers = [
    Number(data.pcr ?? 1),
    Number(data.long_short_ratio ?? 1),
    Number(data.liquidation_cluster ?? 0.4),
    Number(data.gamma ?? 0.2)
  ].map((value) => Math.abs(value));

  const average = confidenceDrivers.reduce((sum, value) => sum + value, 0) / confidenceDrivers.length;
  return normalizePercent(100 - average * 25);
}

function normalizePercent(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}
