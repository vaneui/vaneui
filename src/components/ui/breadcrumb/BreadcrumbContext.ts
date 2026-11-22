import { createContext, useContext } from 'react';
import type React from 'react';

/** What an item needs from its Breadcrumb: its place in the trail and the separator */
export interface BreadcrumbItemContextValue {
  index: number;
  last: boolean;
  /** Whether any item in the trail sets `current` itself; if none does, the last item is current */
  explicitCurrent: boolean;
  separator?: React.ReactNode;
}

export const BreadcrumbItemContext = createContext<BreadcrumbItemContextValue | null>(null);

export function useBreadcrumbItemContext(): BreadcrumbItemContextValue | null {
  return useContext(BreadcrumbItemContext);
}
