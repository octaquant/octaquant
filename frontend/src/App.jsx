import React from 'react';
const betaFeatures = [
  'Paper Trading Access',
  'Multi-Market Switching',
  'Trap Detection Dashboard',
  'Risk-of-Ruin Analytics',
  'Crowd Psychology Map',
  'Strategy Backtest Viewer'
];

const idealApplicants = [
  'Serious traders',
  'Quant learners',
  'Risk-focused operators',
  'Not beginners looking for quick profit'
];

const experienceOptions = ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'];

export default function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#04070f] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb glow-orb-primary" />
        <div className="glow-orb glow-orb-secondary" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
        <section className="card-elite w-full rounded-3xl border border-slate-800/70 p-6 shadow-2xl backdrop-blur-xl sm:p-10 animate-rise-in">
          <header className="text-center">
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200">
              OctaQuant Closed Beta
            </p>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Join the OctaQuant Beta</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
              Be among the first to access India&apos;s Risk Intelligence Trading Engine.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              This is not public signal software. <br className="hidden sm:block" />
              This is controlled beta access.
            </p>
          </header>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="panel-elite animate-fade-in" style={{ animationDelay: '80ms' }}>
              <h2 className="section-heading">What Beta Access Includes</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {betaFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="panel-elite animate-fade-in" style={{ animationDelay: '160ms' }}>
              <h2 className="section-heading">Who Should Apply</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {idealApplicants.map((applicant) => (
                  <li key={applicant} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.85)]" />
                    <span>{applicant}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <section className="panel-elite mt-6 animate-fade-in" style={{ animationDelay: '240ms' }}>
            <h2 className="section-heading">Beta Form</h2>
            <form className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="field-wrap sm:col-span-1">
                <span className="field-label">Full Name</span>
                <input type="text" placeholder="Enter your full name" className="field-input" />
              </label>

              <label className="field-wrap sm:col-span-1">
                <span className="field-label">Email</span>
                <input type="email" placeholder="you@domain.com" className="field-input" />
              </label>

              <label className="field-wrap sm:col-span-1">
                <span className="field-label">Trading Experience</span>
                <select className="field-input" defaultValue="">
                  <option value="" disabled>
                    Select experience level
                  </option>
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field-wrap sm:col-span-1">
                <span className="field-label">Market Preference</span>
                <select className="field-input" defaultValue="">
                  <option value="" disabled>
                    Select preferred market
                  </option>
                  <option value="Indian">Indian</option>
                  <option value="Crypto">Crypto</option>
                  <option value="Forex">Forex</option>
                </select>
              </label>

              <label className="field-wrap sm:col-span-2">
                <span className="field-label">Why do you want access?</span>
                <textarea
                  rows={5}
                  placeholder="Share your trading style, risk approach, and why OctaQuant fits your workflow."
                  className="field-input resize-none"
                />
              </label>

              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-400/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/70 hover:bg-cyan-400/25 hover:shadow-[0_0_30px_rgba(34,211,238,0.24)]"
              >
                Request Beta Access
              </button>
            </form>
          </section>

          <section className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <article className="panel-elite animate-fade-in" style={{ animationDelay: '320ms' }}>
              <h3 className="section-heading">Limited Access Notice</h3>
              <p className="mt-3 leading-relaxed text-slate-400">
                Access will be granted selectively. Applications are reviewed with priority given to serious users who value
                process discipline, analytics, and risk control.
              </p>
            </article>
            <article className="panel-elite animate-fade-in" style={{ animationDelay: '380ms' }}>
              <h3 className="section-heading">Disclaimer</h3>
              <p className="mt-3 leading-relaxed text-slate-400">
                OctaQuant does not guarantee profit. Users trade at their own risk.
              </p>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}
