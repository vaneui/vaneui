import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { PopupProps } from "./PopupProps";
import type { PopupTheme } from "./PopupTheme";
import { POPUP_CATEGORIES } from "./PopupCategories";
import { popupDefaults } from "./popupDefaults";
import { GapClassMapper } from "../theme/size/gapClassMapper";
import { PxClassMapper } from "../theme/size/pxClassMapper";
import { PyClassMapper } from "../theme/size/pyClassMapper";
import { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import { BorderClassMapper } from "../theme/layout/borderClassMapper";
import { RingClassMapper } from "../theme/layout/ringClassMapper";
import { TransitionClassMapper } from "../theme/layout/transitionClassMapper";
import { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass } from "../classes/appearanceClasses";
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
      transition: new TransitionClassMapper(),
      shadow: ShadowAppearanceClassMapper.createLayoutTheme(),
      width: new WidthClassMapper(),
    },
    appearance: {
      background: new SimpleConsumerClassMapper({ base: bgConsumerClasses.base }, 'bg'),
      text: new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerClassMapper({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring'),
    },
  },
  // Defaults
  popupDefaults,
  POPUP_CATEGORIES,
  undefined,
  'layout'
);
