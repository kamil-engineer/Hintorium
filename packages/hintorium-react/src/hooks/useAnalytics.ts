import { useCallback, useEffect, useState } from "react";
import { Analytics } from "hintorium-core";

export function useAnalytics() {
  const [data, setData] = useState<Record<string, number>>({});

  const refresh = useCallback(() => {
    setData(Analytics.getAll());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const increment = useCallback(
    (id: string) => {
      Analytics.increment(id);
      refresh();
    },
    [refresh],
  );

  const getCount = useCallback((id: string) => {
    return Analytics.getCount(id);
  }, []);

  const resetAll = useCallback(() => {
    Analytics.resetAll();
    refresh();
  }, [refresh]);

  return {
    data,
    getCount,
    increment,
    resetAll,
    refresh,
  };
}
