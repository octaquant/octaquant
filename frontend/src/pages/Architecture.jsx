import React from 'react';
import { Link } from 'react-router-dom';

const layers = [
  'Layer 1 — Market Adapters',
  'Layer 2 — Strategy Engine',
  'Layer 3 — Risk Engine',
  'Layer 4 — Execution Layer',
  'Layer 5 — SaaS Infrastructure'
];

export default function Architecture() {
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

        <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-8">
          <h1 className="text-3xl font-semibold text-white">OctaQuant System Architecture</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Multi-market risk intelligence stack designed for deterministic execution, controlled automation, and scalable
            deployment.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {layers.map((layer) => (
              <article key={layer} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <h2 className="font-medium text-cyan-200">{layer}</h2>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
