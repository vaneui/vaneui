import { ComponentTheme, defaultTypographyClassMappers, layoutClassMappers, bgAppearance, textAppearance, borderAppearance, ringAppearance, shadowAppearance } from "../theme/common";
import type { PopupProps } from "./PopupProps";
import type { PopupTheme } from "./PopupTheme";
import { POPUP_CATEGORIES } from "./PopupCategories";
import { popupDefaults } from "./popupDefaults";
import { MaxHeightClassMapper, MinWidthClassMapper, PointerEventsClassMapper, TransitionClassMapper, WidthClassMapper, AlignSelfClassMapper, JustifySelfClassMapper } from "../theme/layout";

// Typography mappers are wired because POPUP_CATEGORIES includes TYPOGRAPHY_FULL (would otherwise be silently dead).
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
      // Anchor-positioning placement within the position-area grid: the popup
      // pins itself to an edge via these props (see Popup.tsx getAnchorStyles).
      alignSelf: new AlignSelfClassMapper(),
      justifySelf: new JustifySelfClassMapper(),
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
