import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes,
} from './common/ComponentTheme';
import type { PopupProps } from '../popup';
import { POPUP_CATEGORIES } from '../props';
import { GapTheme } from './size/gapTheme';
import { PxTheme } from './size/pxTheme';
import { PyTheme } from './size/pyTheme';
import { RadiusTheme } from './layout/radiusTheme';
import { DirectionTheme } from './layout/directionTheme';
import { BorderTheme } from './layout/borderTheme';
import { RingTheme } from './layout/ringTheme';
import { ShadowAppearanceTheme } from './appearance/shadowAppearanceTheme';
import { SimpleConsumerTheme } from './appearance/simpleConsumerTheme';
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass } from '../classes/appearanceClasses';
import { themeDefaults } from './defaults';
import { WidthTheme } from './layout/widthTheme';

export interface PopupTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes & {
    radius: RadiusTheme;
    direction: DirectionTheme;
    border: BorderTheme;
    ring: RingTheme;
    shadow: ShadowAppearanceTheme;
    width: WidthTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
  };
}

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
  themeDefaults.popup || {},
  POPUP_CATEGORIES,
  undefined,
  'layout'
);
