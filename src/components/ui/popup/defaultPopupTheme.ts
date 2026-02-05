import {
  ComponentTheme,
} from "../theme/common/ComponentTheme";
import type { PopupProps } from "./PopupProps";
import type { PopupTheme } from "./PopupTheme";
import { POPUP_CATEGORIES } from "./PopupCategories";
import { popupDefaults } from "./popupDefaults";
import { layoutClassMappers } from "../theme/common/layoutClassMappers";
import { bgAppearance, textAppearance, borderAppearance, ringAppearance, shadowLayoutAppearance } from "../theme/common/appearanceClassMappers";
import { TransitionClassMapper } from "../theme/layout/transitionClassMapper";
import { WidthClassMapper } from "../theme/layout/widthClassMapper";

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
  'vane-popup z-50 max-h-(--popup-max-height)',
  {
    size: layoutClassMappers.size,
    layout: {
      ...layoutClassMappers.layout,
      transition: new TransitionClassMapper(),
      shadow: shadowLayoutAppearance,
      width: new WidthClassMapper(),
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
