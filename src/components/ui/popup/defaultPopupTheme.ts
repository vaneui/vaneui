import { ComponentTheme, layoutClassMappers, bgAppearance, textAppearance, borderAppearance, ringAppearance, shadowLayoutAppearance } from "../theme/common";
import type { PopupProps } from "./PopupProps";
import type { PopupTheme } from "./PopupTheme";
import { POPUP_CATEGORIES } from "./PopupCategories";
import { popupDefaults } from "./popupDefaults";
import { PointerEventsClassMapper, TransitionClassMapper, WidthClassMapper } from "../theme/layout";

/**
 * Default theme for Popup component.
 *
 * Base classes provide:
 * - z-index for stacking above other content
 * - Width constraints
 *
 * Props control:
 * - flex: Flexbox display (default: true)
 * - column: Column direction (default: true)
 * - overflowAuto: Scrollable content (default: true)
 * - padding, gap, rounded, shadow: Visual styling (default: true)
 */
export const defaultPopupTheme = new ComponentTheme<PopupProps, PopupTheme>(
  'div',
  // Base classes - CSS variable for max-h allows flexible customization
  'vane-popup max-h-(--popup-max-height)',
  {
    size: layoutClassMappers.size,
    layout: {
      ...layoutClassMappers.layout,
      transition: new TransitionClassMapper(),
      shadow: shadowLayoutAppearance,
      width: new WidthClassMapper(),
      pointerEvents: new PointerEventsClassMapper(),
    },
    appearance: {
      background: bgAppearance,
      text: textAppearance,
      border: borderAppearance,
      ring: ringAppearance,
    },
  },
  // Defaults
  popupDefaults,
  POPUP_CATEGORIES,
  undefined,
  'layout'
);
