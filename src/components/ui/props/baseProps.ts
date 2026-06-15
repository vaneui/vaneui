/**
 * Base props that all components share
 */

import React from 'react';

export interface BaseProps {
  /** Additional CSS classes to merge with theme classes */
  className?: string;
  /** Component content */
  children?: React.ReactNode;
}

/**
 * Cleans a React HTML attributes type for intersection with component props.
 *
 * Always removes `className`/`children` (owned by BaseProps). Pass extra
 * keys via `OmitKeys` whenever a CUSTOM prop's name collides with a native
 * HTML attribute — otherwise the intersection silently narrows the custom
 * prop's type (e.g. native `title?: string` ∩ custom `title?: ReactNode`
 * collapses to `string`).
 *
 * @example
 * type ModalProps = ... & CleanHTMLProps<React.HTMLAttributes<HTMLDivElement>, 'title'> & { title?: React.ReactNode }
 */
export type CleanHTMLProps<A, OmitKeys extends keyof A = never> =
  Omit<A, 'className' | 'children' | OmitKeys>;
