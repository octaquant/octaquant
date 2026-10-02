import React, { useMemo, useState } from 'react';

const examples = [
  'https://t.me/crypto_airdrop_official',
  'https://binance-bonus.claim-now.io',
  'https://t.me/verified_drop_news'
];

const threatSignals = [
  ['Domain reputation', 'Newly registered domain', 'High'],
  ['Brand impersonation', 'Binance visual signature', 'High'],
  ['Redirect chain', '3 hidden redirect hops', 'Medium'],
  ['Telegram footprint', 'Mass-forwarded message pattern', 'Medium']
];

function Icon({ name, size = 20 }) {
  const paths = {
    shield: <><path d="M12 3 4.8 6.2v5.3c0 4.4 3.1 7.9 7.2 9.5 4.1-1.6 7.2-5.1 7.2-9.5V6.2L12 3Z" /><path d="m8.8 12 2.1 2.1 4.3-4.5" /></>,
    search: <><circle cx="10.8" cy="10.8" r="5.8" /><path d="m16 16 4 4" /></>,
    bolt: <path d="m13.2 2.8-7 10h5.5l-.9 8.4 7-10h-5.5l.9-8.4Z" />,
    check: <path d="m5 12.5 4.3 4.2L19 7" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.4 3.7 5.4 3.7 9S14.5 18.6 12 21c-2.5-2.4-3.7-5.4-3.7-9S9.5 5.4 12 3Z" /></>,
    telegram: <path d="m21 4-3.1 16.2c-.2.9-.8 1.2-1.6.8l-5.2-3.8-2.5 2.4c-.3.3-.5.5-1 .5l.4-5.3L17.7 6c.4-.4-.1-.6-.6-.3L5.2 13.2.1 11.6c-.9-.3-.9-.9.2-1.3L20.3 2.6C21.1 2.3 21.4 3 21 4Z" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function Home() {
  const [value, setValue] = useState(examples[1]);
  const [scanned, setScanned] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const verdict = useMemo(() => value.toLowerCase().includes('claim') || value.toLowerCase().includes('airdrop'), [value]);

  const scan = () => {
    setIsScanning(true);
    setScanned(false);
    window.setTimeout(() => { setIsScanning(false); setScanned(true); }, 700);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a href="#top" className="brand"><span className="brand-mark"><Icon name="shield" size={22} /></span><span>VIGIL<span>AI</span></span></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#how">How it works</a><a href="#features">Features</a><a href="#pricing">Pricing</a>
          <button className="nav-login">Log in</button><button className="nav-cta">Start free <Icon name="arrow" size={15} /></button>
        </nav>
        <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'x' : 'menu'} /></button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> AI-POWERED THREAT INTELLIGENCE</div>
            <h1>Know what’s <em>real.</em><br />Before it costs you.</h1>
            <p>VigilAI instantly exposes fake Telegram channels, scam websites, and fraudulent links—before they reach your people.</p>
            <div className="hero-actions"><button className="primary-button" onClick={() => document.querySelector('#scanner')?.scrollIntoView({ behavior: 'smooth' })}>Scan a link for free <Icon name="arrow" size={17} /></button><a className="text-button" href="#how">See how it works <span>↓</span></a></div>
            <div className="trust-row"><div className="avatars"><b>R</b><b>J</b><b>M</b><b>+</b></div><span>Trusted by <strong>2,000+ teams</strong><br />to stay one step ahead.</span></div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="glow-circle" /><div className="grid-disc" />
            <div className="scan-orbit orbit-one" /><div className="scan-orbit orbit-two" />
            <div className="shield-hero"><Icon name="shield" size={115} /><span className="shield-check"><Icon name="check" size={17} /></span></div>
            <span className="floating-card card-safe"><Icon name="check" size={16} /> SECURE</span>
            <span className="floating-card card-block"><i /> THREAT BLOCKED</span>
            <span className="floating-card card-ai"><Icon name="bolt" size={15} /> AI ANALYZING</span>
          </div>
        </section>

        <section id="scanner" className="scanner-section">
          <div className="section-label">INSTANT LINK SCANNER</div>
          <h2>Is this link safe?</h2><p>Paste any URL or Telegram channel. We’ll analyze it in seconds.</p>
          <div className="scanner-card">
            <div className="url-input"><Icon name="search" size={20} /><input aria-label="URL to scan" value={value} onChange={(e) => { setValue(e.target.value); setScanned(false); }} placeholder="Paste a link or Telegram channel..." /><button onClick={scan} disabled={isScanning}>{isScanning ? 'Analyzing...' : <>Analyze <Icon name="arrow" size={16} /></>}</button></div>
            <div className="example-links"><span>Try an example:</span>{examples.map((example) => <button key={example} onClick={() => { setValue(example); setScanned(true); }}>{example.replace('https://', '')}</button>)}</div>
            {scanned && <div className={verdict ? 'scan-result danger' : 'scan-result safe'}><div className="result-icon">{verdict ? '!' : <Icon name="check" size={21} />}</div><div><strong>{verdict ? 'High risk detected' : 'No critical risks found'}</strong><span>{verdict ? 'This destination shows patterns commonly linked to phishing.' : 'This destination passed our current safety checks.'}</span></div><span className="risk-score">{verdict ? '92' : '08'}<small>/100 risk</small></span></div>}
          </div>
          <div className="privacy-note"><Icon name="lock" size={14} /> Your scans are private and never shared.</div>
        </section>

        <section id="how" className="how-section">
          <div className="section-label">BUILT FOR THE INTERNET YOU ACTUALLY USE</div><h2>One scan. A thousand signals.</h2>
          <div className="feature-grid" id="features">
            <article><span className="feature-icon purple"><Icon name="telegram" /></span><h3>Telegram intelligence</h3><p>Spot impersonators, fake giveaways, cloned groups, and suspicious channel behavior.</p><a href="#scanner">Explore Telegram checks <Icon name="arrow" size={15} /></a></article>
            <article><span className="feature-icon teal"><Icon name="globe" /></span><h3>Website verification</h3><p>Understand a site’s reputation, age, ownership signals, and hidden redirects.</p><a href="#scanner">Verify a website <Icon name="arrow" size={15} /></a></article>
            <article><span className="feature-icon amber"><Icon name="bolt" /></span><h3>Threats, explained</h3><p>Clear, human-readable reasons behind every warning—no security degree required.</p><a href="#scanner">See an example <Icon name="arrow" size={15} /></a></article>
          </div>
        </section>

        <section className="signals-section"><div><div className="section-label">THREAT SIGNALS</div><h2>Don’t just flag threats.<br /><em>Understand</em> them.</h2><p>VigilAI turns complex security signals into clear answers your team can act on—with context, confidence, and zero guesswork.</p><button className="outline-button">Explore the platform <Icon name="arrow" size={16} /></button></div><div className="signals-card"><div className="signals-title"><span>Analysis report</span><b><i /> High risk</b></div>{threatSignals.map(([label, value, risk]) => <div className="signal-row" key={label}><span className="signal-check"><Icon name="check" size={12} /></span><div><strong>{label}</strong><small>{value}</small></div><em className={risk.toLowerCase()}>{risk}</em></div>)}<div className="confidence"><span>AI confidence</span><b>94%</b><div><i /></div></div></div></section>

        <section className="bottom-cta" id="pricing"><div className="cta-shield"><Icon name="shield" size={35} /></div><h2>Stay ahead of every scam.</h2><p>Get started free. No credit card required.</p><button className="primary-button">Create your free account <Icon name="arrow" size={17} /></button></section>
      </main>
      <footer><a href="#top" className="brand"><span className="brand-mark"><Icon name="shield" size={17} /></span><span>VIGIL<span>AI</span></span></a><span>© 2024 VigilAI. Safer internet, together.</span><div><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Contact</a></div></footer>
    </div>
  );
}
