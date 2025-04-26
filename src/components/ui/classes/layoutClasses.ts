import {
  BreakpointProps,
  ItemsProps,
  JustifyProps,
  DirectionProps,
  PillProps,
  SharpProps,
  ShapeProps,
  WrapProps,
  HideProps, PositionProps,
  SizeProps, NoBorderProps, NoShadowProps
} from "../props/props"
import { Mode } from "../settings/mode";

export const rowToColumnBreakpointClasses: Record<keyof BreakpointProps, string> = {
  xsCol: "max-xs:flex-col",
  smCol: "max-sm:flex-col",
  mdCol: "max-md:flex-col",
  lgCol: "max-lg:flex-col",
  xlCol: "max-xl:flex-col"
}

export const itemsClasses: Record<keyof ItemsProps, string> = {
  itemsStart: "items-start",
  itemsEnd: "items-end",
  itemsCenter: "items-center",
  itemsBaseline: "items-baseline",
  itemsStretch: "items-stretch",
}

export const justifyClasses: Record<keyof JustifyProps, string> = {
  justifyStart: "justify-start",
  justifyEnd: "justify-end",
  justifyCenter: "justify-center",
  justifyBetween: "justify-between",
  justifyAround: "justify-around",
  justifyEvenly: "justify-evenly",
  justifyStretch: "justify-stretch",
  justifyBaseline: "justify-baseline",
}

export const directionClasses: Record<keyof DirectionProps, string> = {
  row: "flex-row",
  column: "flex-col"
};

export const wrapClasses: Record<keyof WrapProps, string> = {
  flexWrap: "flex-wrap",
  flexNoWrap: "flex-nowrap",
  flexWrapReverse: "flex-wrap-reverse"
};

export const roundedClasses: Record<keyof SizeProps, string> = {
  xs: "rounded-sm",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
}

export const pillClasses: Record<keyof PillProps, string> = {
  pill: "rounded-full"
}
export const sharpClasses: Record<keyof SharpProps, string> = {
  sharp: "rounded-none"
}

export const hideClasses: Record<keyof HideProps, string> = {
  xsHide: "max-xs:hidden",
  smHide: "max-sm:hidden",
  mdHide: "max-md:hidden",
  lgHide: "max-lg:hidden",
  xlHide: "max-xl:hidden"
}

export const positionClasses: Record<keyof PositionProps, string> = {
  relative: "relative",
  absolute: "absolute",
  fixed: "fixed",
  sticky: "sticky",
  static: "static"
}

export const shadowClasses: Record<keyof SizeProps, string> = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl"
}

export const hoverShadowClasses: Record<keyof SizeProps, string> = {
  xs: "hover:shadow-sm",
  sm: "hover:shadow-md",
  md: "hover:shadow-lg",
  lg: "hover:shadow-xl",
  xl: "hover:shadow-2xl"
}

export const noRingModeClasses: Record<Mode, string> = {
  base: "ring-0",
  hover: "hover:ring-0",
  active: "active:ring-0",
}

export const ringModeClasses: Record<Mode, string> = {
  base: "ring ring-inset",
  hover: "hover:ring hover:ring-inset",
  active: "active:ring active:ring-inset",
}

export const noBorderModeClasses: Record<Mode, string> = {
  base: "border-none",
  hover: "hover:border-none",
  active: "active:border-none",
}

export const borderModeClasses: Record<Mode, string> = {
  base: "border",
  hover: "hover:border",
  active: "active:border",
}

export const noShadowModeClasses: Record<Mode, string> = {
  base: "shadow-none",
  hover: "hover:shadow-none",
  active: "active:shadow-none",
}

export const pillModeClasses: Record<Mode, string> = {
  base: "rounded-full",
  hover: "hover:rounded-full",
  active: "active:rounded-full",
}

export const sharpModeClasses: Record<Mode, string> = {
  base: "rounded-none",
  hover: "hover:rounded-none",
  active: "active:rounded-none",
}

export const hoverRoundedClasses: Record<keyof SizeProps, string> = {
  xs: "hover:rounded-sm",
  sm: "hover:rounded-md",
  md: "hover:rounded-lg",
  lg: "hover:rounded-xl",
  xl: "hover:rounded-2xl",
}

export const activeRoundedClasses: Record<keyof SizeProps, string> = {
  xs: "active:rounded-sm",
  sm: "active:rounded-md",
  md: "active:rounded-lg",
  lg: "active:rounded-xl",
  xl: "active:rounded-2xl",
}

export const roundedModeClasses: Record<Mode, Record<keyof SizeProps, string>> = {
  base: roundedClasses,
  hover: hoverRoundedClasses,
  active: activeRoundedClasses
}

export const noShadowClasses: Record<keyof NoShadowProps, string> = {
  noShadow: "shadow-none"
}
