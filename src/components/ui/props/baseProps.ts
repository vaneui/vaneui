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
