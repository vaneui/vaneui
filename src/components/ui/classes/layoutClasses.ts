import {
  BreakpointProps,
  ItemsProps,
  JustifyProps,
  StackDirectionProps,
  PillProps,
  SharpProps,
  WrapProps,
  HideProps, PositionProps,
  SizeProps, NoBorderProps, NoShadowProps
} from "../props/props"

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

export const stackDirectionClasses: Record<keyof StackDirectionProps, string> = {
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
  xs: "hover:shadow-xs",
  sm: "hover:shadow-sm",
  md: "hover:shadow-md",
  lg: "hover:shadow-lg",
  xl: "hover:shadow-xl"
}

export const noBorderClasses: Record<keyof NoBorderProps, string> = {
  noBorder: "border-none"
}

export const noShadowClasses: Record<keyof NoShadowProps, string> = {
  noShadow: "shadow-none"
}