import {
  NoGapProps,
  NoPaddingProps,
  SizeProps
} from "../props/props"

export const gridGaps: Record<keyof SizeProps, string> = {
  xs: "gap-2",
  sm: "gap-4  max-lg:gap-2",
  md: "gap-6  max-lg:gap-4",
  lg: "gap-8  max-lg:gap-6 max-md:gap-4",
  xl: "gap-10 max-lg:gap-8 max-md:gap-6"
}

export const noGapClasses: Record<keyof NoGapProps, string> = {
  noGap: "gap-0"
}

export const noPaddingClasses: Record<keyof NoPaddingProps, string> = {
  noPadding: "px-0 py-0"
}

export const pxClasses: Record<keyof SizeProps, string> = {
  xs: "px-2",
  sm: "px-4",
  md: "px-6",
  lg: "px-8",
  xl: "px-10"
}

export const pyClasses: Record<keyof SizeProps, string> = {
  xs: "py-2",
  sm: "py-4",
  md: "py-6",
  lg: "py-8",
  xl: "py-10"
}

export const commonGaps: Record<keyof SizeProps, string> = {
  xs: "gap-1",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8"
}