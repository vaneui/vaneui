import {
  ComponentTheme,
  defaultLayoutsThemes,
  defaultTypographyThemes,
} from "../theme/common/ComponentTheme";
import type { ModalProps } from "./ModalProps";
import type { ModalContentTheme } from "./ModalContentTheme";
import { MODAL_CATEGORIES } from "./ModalCategories";
import { modalContentDefaults } from "./modalContentDefaults";
import { GapClassMapper } from "../theme/size/gapClassMapper";
import { PxClassMapper } from "../theme/size/pxClassMapper";
import { PyClassMapper } from "../theme/size/pyClassMapper";
import { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import { BorderClassMapper } from "../theme/layout/borderClassMapper";
import { RingClassMapper } from "../theme/layout/ringClassMapper";
import { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
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
      px: new PxClassMapper(),
      py: new PyClassMapper(),
      gap: new GapClassMapper(),
    },
    layout: {
      ...defaultLayoutsThemes,
      radius: new RadiusClassMapper(),
      direction: new DirectionClassMapper(),
      border: new BorderClassMapper(),
      ring: new RingClassMapper(),
      shadow: ShadowAppearanceClassMapper.createLayoutTheme(),
    },
    appearance: {
      background: new SimpleConsumerClassMapper({ base: bgConsumerClasses.base }, 'bg'),
      text: new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerClassMapper({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring'),
    },
    typography: defaultTypographyThemes,
  },
  // Defaults - use boolean props instead of hardcoded classes
  modalContentDefaults,
  MODAL_CATEGORIES,
  undefined,
  'layout'
);
