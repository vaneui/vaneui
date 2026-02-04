import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { PopupProps } from "./PopupProps";
import type { PopupTheme } from "./PopupTheme";
import { POPUP_CATEGORIES } from "./PopupCategories";
import { popupDefaults } from "./popupDefaults";
import { GapTheme } from "../theme/size/gapTheme";
import { PxTheme } from "../theme/size/pxTheme";
import { PyTheme } from "../theme/size/pyTheme";
import { RadiusTheme } from "../theme/layout/radiusTheme";
import { DirectionTheme } from "../theme/layout/directionTheme";
import { BorderTheme } from "../theme/layout/borderTheme";
import { RingTheme } from "../theme/layout/ringTheme";
import { TransitionTheme } from "../theme/layout/transitionTheme";
import { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass } from "../classes/appearanceClasses";
import { WidthTheme } from "../theme/layout/widthTheme";

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
      transition: new TransitionTheme(),
      shadow: ShadowAppearanceTheme.createLayoutTheme(),
      width: new WidthTheme(),
    },
    appearance: {
      background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
    },
  },
  // Defaults
  popupDefaults,
  POPUP_CATEGORIES,
  undefined,
  'layout'
);
