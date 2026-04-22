import type { ReactNode } from 'react';
import type { TypographyProps } from '../common';

/** ListItem component props */
export type ListItemProps = TypographyProps & {
  /**
   * Optional custom marker content rendered before the item text.
   * When provided, the native list marker is suppressed on that item
   * (via `list-none`) and `data-has-icon="true"` is set on the `<li>`.
   *
   * For decorative icons (e.g. a checkmark glyph that repeats the list's
   * semantic), pass `aria-hidden="true"` on the icon node so screen
   * readers do not announce it alongside the item text.
   */
  icon?: ReactNode;
};
