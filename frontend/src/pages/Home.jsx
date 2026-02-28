import React from 'react';
import { Link } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { useMarketContext } from '../hooks/useMarketContext';

export default function Home() {
  const { context, loading, saveContext } = useMarketContext();

  return (
    <div className="min-h-screen bg-[#04070f] text-slate-100">
      <nav className="mx-auto flex w-full max-w-6xl items-center gap-5 px-4 py-4 text-sm sm:px-6">
        <Link to="/" className="text-cyan-300 transition hover:text-cyan-200">
          Home
        </Link>
        <Link to="/join-beta" className="text-slate-300 transition hover:text-white">
          Join Beta
        </Link>
        <Link to="/architecture" className="text-slate-300 transition hover:text-white">
          View Architecture
        </Link>
      </nav>
      <Dashboard context={context} onUpdate={saveContext} loading={loading} />
    </div>
  );
}
