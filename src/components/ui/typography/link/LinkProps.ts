import React from 'react';
import type { TypographyProps } from "../common";
import type { FocusVisibleProps } from "../../props";

/**
 * Link component props - extends TypographyProps with anchor-specific
 * attributes. Link (unlike the other typography components) carries
 * `focusVisible`: LINK_CATEGORIES includes the focusVisible category and the
 * Link theme has the mapper, so the prop is live here (defaults to true).
 */
export type LinkProps = TypographyProps &
  FocusVisibleProps &
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
