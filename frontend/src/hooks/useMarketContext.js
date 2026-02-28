import { useEffect, useState } from 'react';
import { fetchContext, updateContext } from '../api/marketApi';

export function useMarketContext() {
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchContext()
      .then((data) => {
        if (mounted) {
          setContext(data);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const saveContext = async (payload) => {
    setLoading(true);
    try {
      const data = await updateContext(payload);
      setContext(data);
    } finally {
      setLoading(false);
    }
  };

  return { context, loading, saveContext };
}
