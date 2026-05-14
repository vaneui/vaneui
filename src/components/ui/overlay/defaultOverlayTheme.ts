import { ComponentTheme, defaultSizedLayoutClassMappers, ringAppearance, shadowAppearance } from "../theme/common";
import type { OverlayProps } from "./OverlayProps";
import { BlurClassMapper, OverlayBackgroundClassMapper, PointerEventsClassMapper, RingClassMapper } from "../theme/layout";
import { OVERLAY_CATEGORIES } from "./OverlayCategories";
import type { OverlayTheme } from "./OverlayTheme";
import { overlayDefaults } from "./overlayDefaults";

export const defaultOverlayTheme = new ComponentTheme<OverlayProps, OverlayTheme>(
  'div',
  // bg lives in overlayBackground mapper so the transparent prop can suppress it
  'vane-overlay inset-0 z-(--z-index)',
  {
    layout: {
      ...defaultSizedLayoutClassMappers,
      blur: new BlurClassMapper(),
      overlayBackground: new OverlayBackgroundClassMapper(),
      pointerEvents: new PointerEventsClassMapper(),
      ring: new RingClassMapper(),
      shadow: shadowAppearance,
    },
    appearance: {
      ring: ringAppearance,
    },
  },
  overlayDefaults,
  OVERLAY_CATEGORIES,
  undefined,
  'layout'
);
