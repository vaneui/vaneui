import {
  BreakpointProps,
  GapProps,
  ItemsProps,
  JustifyProps,
  NoGapProps,
  NoPaddingProps,
  StackDirectionProps,
  PillProps,
  RoundedProps,
  SharpProps,
  WrapProps,
  HideProps, PositionProps,
  SizeProps
} from "./props"

export const rowToColumnBreakpointClasses: Record<keyof BreakpointProps, string> = {
  xsCol: "max-xs:flex-col",
  smCol: "max-sm:flex-col",
  mdCol: "max-md:flex-col",
  lgCol: "max-lg:flex-col",
  xlCol: "max-xl:flex-col"
}

export const gridGaps: Record<keyof GapProps, string> = {
  xs: "gap-2",
  sm: "gap-4  max-lg:gap-2",
  md: "gap-6  max-lg:gap-4",
  lg: "gap-8  max-lg:gap-6 max-md:gap-4",
  xl: "gap-10 max-lg:gap-8 max-md:gap-6"
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

export const commonGaps: Record<keyof GapProps, string> = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8"
}

export const noGapClasses: Record<keyof NoGapProps, string> = {
  noGap: "gap-0"
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

export const roundedClasses: Record<keyof RoundedProps, string> = {
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

export const noPaddingClasses: Record<keyof NoPaddingProps, string> = {
  noPadding: "p-0"
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

export const pxClasses: Record<keyof SizeProps, string> = {
  xs: "px-2",
  sm: "px-2.5",
  md: "px-3.5",
  lg: "px-5",
  xl: "px-6"
}

export const pyClasses: Record<keyof SizeProps, string> = {
  xs: "py-1",
  sm: "py-1.5",
  md: "py-2",
  lg: "py-3",
  xl: "py-4"
}

export const paddingClasses: Record<keyof SizeProps, string> = {
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
  xl: "p-6"
}
