import React from 'react';
import type { TypographyProps } from "../common";

/** Link component props - extends TypographyProps with anchor-specific attributes */
export type LinkProps = TypographyProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
  /** URL to navigate to */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
