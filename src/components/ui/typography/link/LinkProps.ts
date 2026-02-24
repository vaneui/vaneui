import React from 'react';
import type { TypographyProps } from "../common";

/** Link component props - extends TypographyProps with anchor-specific attributes */
export type LinkProps = TypographyProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
  /** URL to navigate to */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
  /** Mark as external link. Auto-sets target="_blank", rel="noopener noreferrer", and appends icon. */
  external?: boolean;
  /** Icon element rendered before the link text */
  startIcon?: React.ReactNode;
  /** Icon element rendered after the link text. When `external` is set, defaults to the theme's external icon. */
  endIcon?: React.ReactNode;
};
