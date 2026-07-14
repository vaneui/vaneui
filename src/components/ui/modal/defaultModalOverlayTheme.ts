import { ComponentTheme, defaultSizedLayoutClassMappers } from "../theme/common";
import type { OverlayProps } from "../overlay";
import type { ModalOverlayTheme } from "./ModalOverlayTheme";
import { OVERLAY_CATEGORIES } from "../overlay/OverlayCategories";
import { modalOverlayDefaults } from "./modalOverlayDefaults";
import { BlurClassMapper, OverlayBackgroundClassMapper, PointerEventsClassMapper } from "../theme/layout";

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
    },
  },
  modalOverlayDefaults,
  OVERLAY_CATEGORIES,
  undefined,
  'layout'
);
