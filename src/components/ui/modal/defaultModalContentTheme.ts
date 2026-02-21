import { ComponentTheme, defaultTypographyClassMappers, layoutClassMappers, bgAppearance, textAppearance, borderAppearance, ringAppearance, shadowAppearance } from "../theme/common";
import type { ModalProps } from "./ModalProps";
import type { ModalContentTheme } from "./ModalContentTheme";
import { MODAL_CATEGORIES } from "./ModalCategories";
import { modalContentDefaults } from "./modalContentDefaults";

/**
 * Default theme for Modal content (the dialog box).
 *
 * Base classes provide:
 * - Width controlled by CSS variable (--modal-width)
 * - Max height to prevent viewport overflow
 *
 * Props control:
 * - flex: Flexbox display (default: true)
 * - column: Column direction (default: true)
 * - overflowAuto: Scrollable content (default: true)
 * - padding, gap, rounded, shadow: Visual styling (default: true)
 */
export const defaultModalContentTheme = new ComponentTheme<ModalProps, ModalContentTheme>(
  'div',
  // Base classes - CSS variables for max-w and max-h allow flexible customization
  'vane-modal max-w-(--modal-width) max-h-(--modal-max-height)',
  {
    size: layoutClassMappers.size,
    layout: {
      ...layoutClassMappers.layout,
      shadow: shadowAppearance,
    },
    appearance: {
      background: bgAppearance,
      text: textAppearance,
      border: borderAppearance,
      ring: ringAppearance,
    },
    typography: defaultTypographyClassMappers,
  },
  // Defaults - use boolean props instead of hardcoded classes
  modalContentDefaults,
  MODAL_CATEGORIES,
  undefined,
  'layout'
);
