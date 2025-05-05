import {
  HideKey,
  PositionKey,
  SizeKey
} from "../props/propKeys";
import {
  activeShadowClasses,
  borderModeClasses,
  hideClasses,
  hoverShadowClasses,
  noBorderModeClasses,
  noRingModeClasses,
  noShadowModeClasses,
  positionClasses,
  ringModeClasses,
  shadowClasses
} from "../classes/layoutClasses";
import { Mode } from "../settings/mode";
import { ModeledStyles } from "./commonTypes";

// Layout theme structure
export type LayoutTheme = {
  hide: Record<HideKey, string>;
  position: Record<PositionKey, string>;
  shadow: Record<Mode, Record<SizeKey, string>>;
  border: Record<Mode, string>;
  ring: Record<Mode, string>;
  radius: Record<SizeKey, string>;
  flags: {
    noBorder: ModeledStyles;
    noShadow: ModeledStyles;
    noRing: ModeledStyles;
  };
};

// Default layout theme (without radius, which is component-specific)
export const createDefaultLayoutTheme = (radius: Record<SizeKey, string>): LayoutTheme => ({
  hide: hideClasses,
  position: positionClasses,
  shadow: {
    base: shadowClasses,
    hover: hoverShadowClasses,
    active: activeShadowClasses,
  },
  border: borderModeClasses,
  ring: ringModeClasses,
  radius,
  flags: {
    noBorder: noBorderModeClasses,
    noRing: noRingModeClasses,
    noShadow: noShadowModeClasses,
  },
});