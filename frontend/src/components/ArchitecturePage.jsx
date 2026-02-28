import React, { useEffect } from 'react';

const LAYERS = [
  {
    title: 'Layer 1 — Market Adapters',
    items: [
      'Indian Markets (NIFTY, Option Chain, VIX, PCR)',
      'Crypto Markets (Funding Rate, Long/Short Ratio)',
      'Forex Markets (ATR, Session Volatility)'
    ]
  },
  {
    title: 'Layer 2 — Strategy Engine',
    items: [
      'Retail Trap Detection',
      'Smart Money Divergence',
      'Expiry Volatility Model',
      'Gamma Cluster Awareness'
    ]
  },
  {
    title: 'Layer 3 — Risk Engine',
    items: ['Position Sizing', 'Risk of Ruin', 'Capital Survival Probability', 'Monte Carlo Simulation']
  },
  {
    title: 'Layer 4 — Execution Layer',
    items: ['Paper Trading Mode', 'Live Trading Mode', 'API Management', 'Subscription Lock']
  },
  {
    title: 'Layer 5 — SaaS Infrastructure',
    items: ['Multi-User System', 'Encrypted API Storage', 'Background Worker System', 'Market Context Router']
  }
];

const DATA_FLOW_STEPS = ['Market Data', 'Adapter', 'Strategy Engine', 'Risk Engine', 'Trade Decision', 'Execution', 'Log', 'Analytics'];

export function ArchitecturePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="architecture-page">
      <div className="architecture-bg" aria-hidden />
      <section className="hero reveal">
        <p className="eyebrow">OctaQuant Infrastructure</p>
        <h1>OctaQuant System Architecture</h1>
        <h2>Multi-Market Risk Intelligence Infrastructure</h2>
        <p className="hero-copy">
          OctaQuant is built as a layered, scalable, market-agnostic trading automation system.
        </p>
        <a className="back-button" href="/">
          Back to Home
        </a>
      </section>

      <section className="content-section reveal" id="layers">
        <h3>Layered Architecture</h3>
        <div className="layer-grid">
          {LAYERS.map((layer) => (
            <article key={layer.title} className="layer-card">
              <h4>{layer.title}</h4>
              <ul>
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section reveal" id="data-flow">
        <h3>Data Flow</h3>
        <p>The execution pipeline is deterministic, auditable, and built for controlled automation.</p>
        <div className="flow-row">
          {DATA_FLOW_STEPS.map((step, index) => (
            <React.Fragment key={step}>
              <div className="flow-node">{step}</div>
              {index < DATA_FLOW_STEPS.length - 1 && <span className="flow-arrow">→</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="content-section reveal" id="scalability">
        <h3>Scalability</h3>
        <div className="info-grid">
          <article>
            <h4>Cloud ready deployment</h4>
            <p>Containerized architecture with horizontal worker scaling and centralized observability support.</p>
          </article>
          <article>
            <h4>Market switching system</h4>
            <p>Unified market context controls allow fast transitions between Indian, crypto, and forex workflows.</p>
          </article>
          <article>
            <h4>Adapter-based expansion</h4>
            <p>New exchanges and market feeds are onboarded as pluggable adapters without strategy core rewrites.</p>
          </article>
          <article>
            <h4>Future institutional layer</h4>
            <p>Reserved interface contracts support governance, permissions, and multi-desk portfolio orchestration.</p>
          </article>
        </div>
      </section>

      <section className="content-section reveal" id="security">
        <h3>Security</h3>
        <div className="security-list">
          <p>Encrypted API keys</p>
          <p>JWT authentication</p>
          <p>Backend-only execution</p>
          <p>No frontend broker exposure</p>
        </div>
      </section>

      <section className="closing reveal">
        <p>OctaQuant is not a signal tool.</p>
        <p>It is a risk-first trading infrastructure.</p>
      </section>
    </main>
  );
}
