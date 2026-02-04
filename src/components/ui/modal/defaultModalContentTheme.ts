import {
  ComponentTheme,
  defaultLayoutsThemes,
  defaultTypographyThemes,
} from "../theme/common/ComponentTheme";
import type { ModalProps } from "./ModalProps";
import type { ModalContentTheme } from "./ModalContentTheme";
import { MODAL_CATEGORIES } from "./ModalCategories";
import { modalContentDefaults } from "./modalContentDefaults";
import { GapTheme } from "../theme/size/gapTheme";
import { PxTheme } from "../theme/size/pxTheme";
import { PyTheme } from "../theme/size/pyTheme";
import { RadiusTheme } from "../theme/layout/radiusTheme";
import { DirectionTheme } from "../theme/layout/directionTheme";
import { BorderTheme } from "../theme/layout/borderTheme";
import { RingTheme } from "../theme/layout/ringTheme";
import { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass } from "../classes/appearanceClasses";

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
  'vane-modal w-full max-w-(--modal-width) max-h-(--modal-max-height)',
  {
    size: {
      px: new PxTheme(),
      py: new PyTheme(),
      gap: new GapTheme(),
    },
    layout: {
      ...defaultLayoutsThemes,
      radius: new RadiusTheme(),
      direction: new DirectionTheme(),
      border: new BorderTheme(),
      ring: new RingTheme(),
      shadow: ShadowAppearanceTheme.createLayoutTheme(),
    },
    appearance: {
      background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
    },
    typography: defaultTypographyThemes,
  },
  // Defaults - use boolean props instead of hardcoded classes
  modalContentDefaults,
  MODAL_CATEGORIES,
  undefined,
  'layout'
);
