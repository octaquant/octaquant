import { useEffect, useState } from 'react';
import { fetchContext, updateContext } from '../api/marketApi';

export function useMarketContext() {
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContext().then(setContext).finally(() => setLoading(false));
  }, []);

  const saveContext = async (payload) => {
    setLoading(true);
    const data = await updateContext(payload);
    setContext(data);
    setLoading(false);
  };

  return { context, loading, saveContext };
}
