import { ComponentTheme, defaultTypographyClassMappers, layoutClassMappers, bgAppearance, textAppearance, borderAppearance, ringAppearance, shadowAppearance } from "../theme/common";
import type { PopupProps } from "./PopupProps";
import type { PopupTheme } from "./PopupTheme";
import { POPUP_CATEGORIES } from "./PopupCategories";
import { popupDefaults } from "./popupDefaults";
import { MaxHeightClassMapper, MinWidthClassMapper, PointerEventsClassMapper, TransitionClassMapper, WidthClassMapper } from "../theme/layout";

/**
 * Default theme for Popup component.
 *
 * Base classes provide:
 * - z-index for stacking above other content
 *
 * Props control:
 * - flex: Flexbox display (default: true)
 * - column: Column direction (default: true)
 * - overflowAuto: Scrollable content (default: true)
 * - maxHeight: Size-dependent max-height via --max-height (default: true)
 * - padding, gap, rounded, shadow: Visual styling (default: true)
 *
 * Includes `typography: defaultTypographyClassMappers` to mirror Modal —
 * Popup is also a wrapper around arbitrary children, and its categories
 * include `TYPOGRAPHY_FULL` (`fontWeight`, `fontStyle`, `textDecoration`,
 * `textTransform`, `fontFamily`, `textAlign`, `truncate`). Without these
 * mappers wired up those props would be silently dead.
 *
 * Menu popups omit maxHeight + overflowAuto, so they grow to fit content.
 */
export const defaultPopupTheme = new ComponentTheme<PopupProps, PopupTheme>(
  'div',
  'vane-popup z-(--z-index)',
  {
    size: layoutClassMappers.size,
    layout: {
      ...layoutClassMappers.layout,
      transition: new TransitionClassMapper(),
      shadow: shadowAppearance,
      width: new WidthClassMapper(),
      pointerEvents: new PointerEventsClassMapper(),
      minWidth: new MinWidthClassMapper(),
      maxHeight: new MaxHeightClassMapper(),
    },
    appearance: {
      background: bgAppearance,
      text: textAppearance,
      border: borderAppearance,
      ring: ringAppearance,
    },
    typography: defaultTypographyClassMappers,
  },
  popupDefaults,
  POPUP_CATEGORIES,
  undefined,
  'layout'
);
