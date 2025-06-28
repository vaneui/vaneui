import {
  BreakpointKey,
  HideKey,
  JustifyKey, ModeKey,
  PositionKey,
  SizeKey,
  WrapKey
} from "../props/keys";

export const rowToColumnBreakpointClasses: Record<BreakpointKey, string> = {
  xsCol: "max-xs:flex-col",
  smCol: "max-sm:flex-col",
  mdCol: "max-md:flex-col",
  lgCol: "max-lg:flex-col",
  xlCol: "max-xl:flex-col"
}

export const justifyClasses: Record<JustifyKey, string> = {
  justifyStart: "justify-start",
  justifyEnd: "justify-end",
  justifyCenter: "justify-center",
  justifyBetween: "justify-between",
  justifyAround: "justify-around",
  justifyEvenly: "justify-evenly",
  justifyStretch: "justify-stretch",
  justifyBaseline: "justify-baseline",
}

export const wrapClasses: Record<WrapKey, string> = {
  flexWrap: "flex-wrap",
  flexNoWrap: "flex-nowrap",
  flexWrapReverse: "flex-wrap-reverse"
};

export const roundedClasses: Record<SizeKey, string> = {
  xs: "rounded-sm",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
}

export const hideClasses: Record<HideKey, string> = {
  xsHide: "max-xs:hidden",
  smHide: "max-sm:hidden",
  mdHide: "max-md:hidden",
  lgHide: "max-lg:hidden",
  xlHide: "max-xl:hidden"
}

export const positionClasses: Record<PositionKey, string> = {
  relative: "relative",
  absolute: "absolute",
  fixed: "fixed",
  sticky: "sticky",
  static: "static"
}

export const shadowClasses: Record<SizeKey, string> = {
  xs: "shadow-2xs",
  sm: "shadow-xs",
  md: "shadow-sm",
  lg: "shadow-md",
  xl: "shadow-lg"
}

export const hoverShadowClasses: Record<SizeKey, string> = {
  xs: "hover:shadow-xs",
  sm: "hover:shadow-sm",
  md: "hover:shadow-md",
  lg: "hover:shadow-lg",
  xl: "hover:shadow-xl"
}

export const activeShadowClasses: Record<SizeKey, string> = {
  xs: "active:shadow-xs",
  sm: "active:shadow-sm",
  md: "active:shadow-md",
  lg: "active:shadow-lg",
  xl: "active:shadow-xl"
}

export const noRingModeClasses: Record<ModeKey, string> = {
  base: "ring-0",
  hover: "hover:ring-0",
  active: "active:ring-0",
}

export const ringModeClasses: Record<ModeKey, string> = {
  base: "ring ring-inset",
  hover: "hover:ring hover:ring-inset",
  active: "active:ring active:ring-inset",
}

export const noShadowModeClasses: Record<ModeKey, string> = {
  base: "shadow-none",
  hover: "hover:shadow-none",
  active: "active:shadow-none",
}
