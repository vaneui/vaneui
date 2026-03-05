import type React from 'react';
import type { BaseProps, TruncateProps, OverflowProps, WhitespaceProps, WidthProps } from '../props';

/** Props for the NavLink label sub-theme (inner text wrapper) */
export type NavLinkLabelProps = BaseProps &
  TruncateProps &
  OverflowProps &
  WhitespaceProps &
  WidthProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
