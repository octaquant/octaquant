import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const layers = [
  {
    id: 1,
    title: 'Layer 1 — Market Adapters',
    items: ['Indian Market Adapter', 'Crypto Adapter', 'Forex Adapter', 'Volatility Feed']
  },
  {
    id: 2,
    title: 'Layer 2 — Strategy Engine',
    items: ['Retail Trap Detection', 'Gamma Pressure Model', 'Expiry Engine']
  },
  {
    id: 3,
    title: 'Layer 3 — Risk Engine',
    items: ['Position sizing', 'Risk of ruin', 'Monte Carlo simulation']
  },
  {
    id: 4,
    title: 'Layer 4 — Execution Layer',
    items: ['Paper trading engine', 'Live execution router']
  },
  {
    id: 5,
    title: 'Layer 5 — SaaS Infrastructure',
    items: ['Multi-user SaaS layer', 'Encrypted API vault', 'Subscription control']
  }
];

export default function Architecture() {
  const [activeLayer, setActiveLayer] = useState(1);

  return (
    <main className="min-h-screen bg-[#04070f] text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-5 text-sm">
          <Link to="/" className="text-cyan-300 transition hover:text-cyan-200">
            Home
          </Link>
          <Link to="/join-beta" className="text-slate-300 transition hover:text-white">
            Join Beta
          </Link>
          <Link to="/architecture" className="text-slate-200 transition hover:text-white">
            View Architecture
          </Link>
        </nav>

        <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-8 shadow-[0_0_60px_rgba(56,189,248,0.08)]">
          <h1 className="text-3xl font-semibold text-white">OctaQuant System Architecture</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Multi-market risk intelligence stack designed for deterministic execution, controlled automation, and scalable
            deployment.
          </p>

          <div className="mt-8 space-y-4">
            {layers.map((layer) => {
              const isActive = activeLayer === layer.id;

              return (
                <article
                  key={layer.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900"
                >
                  <button
                    type="button"
                    onClick={() => setActiveLayer(isActive ? null : layer.id)}
                    className="flex w-full items-center justify-between text-left"
                    aria-expanded={isActive}
                    aria-controls={`layer-content-${layer.id}`}
                  >
                    <h2 className="text-lg font-medium text-cyan-200">{layer.title}</h2>
                    <span
                      className={`text-cyan-300 transition-all duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </button>

                  <div
                    id={`layer-content-${layer.id}`}
                    className={`overflow-hidden transition-all duration-300 ${isActive ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <ul className="space-y-2 text-gray-300">
                      {layer.items.map((item) => (
                        <li key={item} className="rounded-md border border-slate-800/80 bg-slate-950/60 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
