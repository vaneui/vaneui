import React from 'react';
import type { TypographyProps } from "../common";

/** Link component props - extends TypographyProps with anchor-specific attributes */
export type LinkProps = TypographyProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
  /** URL to navigate to */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
  /** Mark as external link. Auto-sets target="_blank" and rel="noopener noreferrer". */
  external?: boolean;
  /** Disable the link. An <a> ignores the native `disabled` attribute, so this
   *  applies the aria-disabled pattern: the link stays focusable but its href
   *  is removed and activation (click / Enter) is blocked. */
  disabled?: boolean;
};
