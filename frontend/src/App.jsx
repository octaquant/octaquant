import React from 'react';
import { Dashboard } from './components/Dashboard';
import { useMarketContext } from './hooks/useMarketContext';

export default function App() {
  const { context, loading, saveContext } = useMarketContext();
  return <Dashboard context={context} onUpdate={saveContext} loading={loading} />;
}
