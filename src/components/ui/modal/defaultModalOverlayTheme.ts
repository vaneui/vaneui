import { ComponentTheme, defaultSizedLayoutClassMappers } from "../theme/common";
import type { OverlayProps } from "../overlay";
import type { ModalOverlayTheme } from "./ModalOverlayTheme";
import { OVERLAY_CATEGORIES } from "../overlay/OverlayCategories";
import { modalOverlayDefaults } from "./modalOverlayDefaults";
import { BlurClassMapper, OverlayBackgroundClassMapper, PointerEventsClassMapper, RingClassMapper } from "../theme/layout";
import { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";
import { ringConsumerClass } from "../classes/appearanceClasses";

export const defaultModalOverlayTheme = new ComponentTheme<OverlayProps, ModalOverlayTheme>(
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
      shadow: new ShadowAppearanceClassMapper(),
    },
    appearance: {
      ring: new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring'),
    },
  },
  modalOverlayDefaults,
  OVERLAY_CATEGORIES,
  undefined,
  'layout'
);
