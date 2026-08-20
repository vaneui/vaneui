import { useEffect, useState } from 'react';

/** False on the server and on the hydrating render, true from the first client effect. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
