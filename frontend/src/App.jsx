import React from 'react';
import { Dashboard } from './components/Dashboard';
import { ArchitecturePage } from './components/ArchitecturePage';
import { useMarketContext } from './hooks/useMarketContext';

export default function App() {
  const isArchitecture = window.location.pathname === '/architecture';
  const { context, loading, saveContext } = useMarketContext();

  if (isArchitecture) {
    return <ArchitecturePage />;
  }

  return (
    <>
      <header className="mx-auto flex w-full max-w-6xl justify-end px-4 pt-4 sm:px-6">
        <a href="/architecture" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600">
          View Architecture
        </a>
      </header>
      <Dashboard context={context} onUpdate={saveContext} loading={loading} />
    </>
  );
}
