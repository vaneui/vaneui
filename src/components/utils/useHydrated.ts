import { useEffect, useState } from 'react';

/**
 * False on the server AND on the hydrating render, true from the first client effect.
 *
 * A portal has no server markup, so floating content that is already open on the first
 * client render portals DOM React never emitted server-side and the subtree is thrown
 * away and re-rendered. Gating the open state (rather than just the portal call) keeps
 * the transition and every element-dependent effect downstream of the gate, so they run
 * once the element actually attaches.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
