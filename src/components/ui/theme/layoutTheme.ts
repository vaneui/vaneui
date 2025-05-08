import {
  DirectionKey,
  HideKey, ItemsKey, JustifyKey,
  PositionKey, DirectionReverseKey,
  SizeKey, WrapKey, BreakpointKey
} from "../props/propKeys";
import {
  activeShadowClasses,
  borderModeClasses, directionClasses,
  hideClasses,
  hoverShadowClasses, itemsClasses, justifyClasses,
  noBorderModeClasses,
  noRingModeClasses,
  noShadowModeClasses,
  positionClasses,
  ringModeClasses, rowToColumnBreakpointClasses,
  shadowClasses, wrapClasses
} from "../classes/layoutClasses";
import { Mode } from "../props/mode";

// Layout theme structure
export type LayoutTheme = {
  hide: Record<HideKey, string>;
  position: Record<PositionKey, string>;
  shadow: Record<Mode, Record<SizeKey, string>>;
  border: Record<Mode, string>;
  ring: Record<Mode, string>;
  radius?: Record<SizeKey, string>;
  flags: {
    noBorder: Record<Mode, string>;
    noShadow: Record<Mode, string>;
    noRing: Record<Mode, string>;
  };

  reverse: Record<DirectionReverseKey, string>;
  direction: Record<DirectionKey, string>;
  items: Record<ItemsKey, string>;
  justify: Record<JustifyKey, string>;
  wrap: Record<WrapKey, string>;
  breakpoint: Record<BreakpointKey, string>;
};

export const createDefaultLayoutTheme = (radius: Record<SizeKey, string> | undefined = undefined): LayoutTheme => ({
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
  items: itemsClasses,
  justify: justifyClasses,
  direction: directionClasses,
  wrap: wrapClasses,
  breakpoint: rowToColumnBreakpointClasses,
  //TODO: update properly
  reverse: {
    reverse: ""
  }
});