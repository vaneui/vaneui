import type { ReactNode } from 'react';
import type { TypographyProps } from '../common';

/** ListItem component props */
export type ListItemProps = TypographyProps & {
  /**
   * Optional custom marker content rendered before the item text.
   * When provided, the native list marker is suppressed on that item
   * (via `list-none`) and `data-has-icon="true"` is set on the `<li>`.
   */
  icon?: ReactNode;
};
