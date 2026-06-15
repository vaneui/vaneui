import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect logs a warning when rendered on the server under React
// SSR; effects never run server-side, so a useEffect stand-in is safe and
// silences the warning without changing client behavior.
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
