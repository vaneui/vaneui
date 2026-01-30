import {
  BaseComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes,
} from './common/ComponentTheme';
import type { OverlayProps } from '../overlay';
import { OVERLAY_CATEGORIES } from '../props';
import { themeDefaults } from './defaults';
import { BlurTheme } from './layout/blurTheme';
import { PointerEventsTheme } from './layout/pointerEventsTheme';

export interface OverlayTheme extends BaseComponentTheme {
  layout: DefaultLayoutThemes & {
    blur: BlurTheme;
    pointerEvents: PointerEventsTheme;
  };
}

/**
 * Default theme for Overlay component.
 *
 * Base classes provide:
 * - inset-0 for full viewport coverage
 * - z-index for stacking above content
 * - Semi-transparent background via CSS variable
 *
 * Props control:
 * - fixed: Fixed positioning (default: true)
 * - flex: Flexbox display (default: true)
 * - itemsCenter: Vertical centering (default: true)
 * - justifyCenter: Horizontal centering (default: true)
 * - blur: Backdrop blur effect (default: false)
 * - pointerEventsNone: Disable pointer events (default: false)
 */
export const defaultOverlayTheme = new ComponentTheme<OverlayProps, OverlayTheme>(
  'div',
  // Base classes - only non-prop-driven styles
  'vane-overlay inset-0 z-50 bg-(--overlay-bg)',
  {
    layout: {
      ...defaultLayoutsThemes,
      blur: new BlurTheme(),
      pointerEvents: new PointerEventsTheme(),
    },
  },
  // Defaults - use boolean props instead of hardcoded classes
  themeDefaults.overlay as Partial<OverlayProps>,
  OVERLAY_CATEGORIES,
  undefined,
  'layout'
);
