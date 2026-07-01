import {
  TYPOGRAPHY_FULL,
  LAYOUT_CORE,
  VISUAL_CORE,
  VARIANT,
  WIDTH,
  HEIGHT,
  RESPONSIVE,
  INHERIT_SIZE,
  INHERIT_COLOR,
} from "../../props/categoryBuilders";

/**
 * Categories for the ListItem component — deliberately narrower than the
 * List component's `LIST_CATEGORIES`. Every category here is both
 * expressible via `ListItemProps` (= TypographyProps + icon) and handled by
 * `defaultListItemTheme` (class mapper, data attribute, or component-level
 * extraction). `propsCategoriesAlignment.test.ts` and
 * `componentThemeCoverage.test.ts` enforce both directions.
 *
 * Dropped relative to LIST_CATEGORIES:
 * - `listStyle` / `listPosition` / `gap` / `padding` — List-only deltas
 *   (ListStyle/ListPosition/ListGap/Pl class mappers live on the List theme);
 *   the ListItem theme has no mappers for them and ListItemProps cannot
 *   express them. The icon-to-text gap is a base-string class, not a category.
 * - `transparent` / `inheritBg` — not expressible via ListItemProps:
 *   TypographyProps excludes TransparentProps and InheritBgProps by design.
 * - `margin` — items use the list's inter-item gap, not per-item margins;
 *   ListItemProps omits MarginProps to stay aligned.
 *
 * Like LIST_CATEGORIES, this also omits typography's `cursor` and
 * `letterSpacing` (LetterSpacingClassMapper emits a default `tracking-(--ls)`
 * class even when the prop is absent, which would change every ListItem's
 * class output).
 */
export const LIST_ITEM_CATEGORIES = [
  ...TYPOGRAPHY_FULL,
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...RESPONSIVE,
  ...INHERIT_SIZE,
  ...INHERIT_COLOR,
] as const;
