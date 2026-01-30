import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes,
  defaultTypographyThemes,
} from './common/ComponentTheme';
import type { ModalProps } from '../modal';
import { MODAL_CATEGORIES } from '../props';
import { GapTheme } from './size/gapTheme';
import { PxTheme } from './size/pxTheme';
import { PyTheme } from './size/pyTheme';
import { RadiusTheme } from './layout/radiusTheme';
import { DirectionTheme } from './layout/directionTheme';
import { ShadowAppearanceTheme } from './appearance/shadowAppearanceTheme';
import { SimpleConsumerTheme } from './appearance/simpleConsumerTheme';
import { bgConsumerClasses, textConsumerClass } from '../classes/appearanceClasses';
import { themeDefaults } from './defaults';

export interface ModalTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes & {
    radius: RadiusTheme;
    direction: DirectionTheme;
    shadow: ShadowAppearanceTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
  };
}

/**
 * Default theme for Modal component.
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
export const defaultModalTheme = new ComponentTheme<ModalProps, ModalTheme>(
  'div',
  // Base classes - only non-prop-driven styles
  'vane-modal w-full max-w-(--modal-width) max-h-[90vh]',
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
      shadow: ShadowAppearanceTheme.createLayoutTheme(),
    },
    appearance: {
      background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
    },
    typography: defaultTypographyThemes,
  },
  // Defaults - use boolean props instead of hardcoded classes
  themeDefaults.modal as Partial<ModalProps>,
  MODAL_CATEGORIES,
  undefined,
  'layout'
);
