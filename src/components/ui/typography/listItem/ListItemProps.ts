import type { ReactNode } from 'react';
import type { TypographyProps } from '../common';
import type { CursorProps, LetterSpacingProps, FocusVisibleProps, MarginProps } from '../../props';

/**
 * ListItem component props.
 *
 * Narrower than `TypographyProps`: `LIST_ITEM_CATEGORIES` deliberately omits
 * the `cursor`, `letterSpacing`, and `focusVisible` categories (see
 * `ListItemCategories.ts`), so those props are excluded from the type too.
 * Were they left in, they would type-check yet emit no class AND leak to the
 * `<li>` (the DOM `omitKeys` set is derived from the component's categories).
 * Mirrors how `List` keeps its props surface aligned with `LIST_CATEGORIES`.
 */
export type ListItemProps = Omit<
  TypographyProps,
  keyof CursorProps | keyof LetterSpacingProps | keyof FocusVisibleProps | keyof MarginProps
> & {
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
