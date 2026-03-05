import { ComponentTheme, layoutClassMappers, bgAppearance, textAppearance, borderAppearance, ringAppearance, shadowAppearance } from "../theme/common";
import type { PopupProps } from "./PopupProps";
import type { PopupTheme } from "./PopupTheme";
import { POPUP_CATEGORIES } from "./PopupCategories";
import { popupDefaults } from "./popupDefaults";
import { MinWidthClassMapper, PointerEventsClassMapper, TransitionClassMapper, WidthClassMapper } from "../theme/layout";
import { PopupOverflowClassMapper } from "./popupOverflowClassMapper";

/**
 * Default theme for Popup component.
 *
 * Base classes provide:
 * - z-index for stacking above other content
 *
 * Props control:
 * - flex: Flexbox display (default: true)
 * - column: Column direction (default: true)
 * - overflowAuto: Scrollable content + max-height constraint (default: true)
 * - padding, gap, rounded, shadow: Visual styling (default: true)
 *
 * Max-height is tied to overflowAuto via PopupOverflowClassMapper.
 * Menu popups omit overflowAuto, so they grow to fit content (matching Mantine/Chakra/shadcn).
 */
export const defaultPopupTheme = new ComponentTheme<PopupProps, PopupTheme>(
  'div',
  'vane-popup z-(--z-index)',
  {
    size: layoutClassMappers.size,
    layout: {
      ...layoutClassMappers.layout,
      overflow: new PopupOverflowClassMapper(),
      transition: new TransitionClassMapper(),
      shadow: shadowAppearance,
      width: new WidthClassMapper(),
      pointerEvents: new PointerEventsClassMapper(),
      minWidth: new MinWidthClassMapper(),
    },
    appearance: {
      background: bgAppearance,
      text: textAppearance,
      border: borderAppearance,
      ring: ringAppearance,
    },
  },
  popupDefaults,
  POPUP_CATEGORIES,
  undefined,
  'layout'
);
