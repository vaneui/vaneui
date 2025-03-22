import { BorderAppearanceProps, BorderRadiusProps, BreakpointProps, CommonAppearanceProps, FontFamilyProps, FontStyleProps, FontWeightProps, GapProps, ItemsProps, JustifyProps, StackDirectionProps, TextAlignProps, TextAppearanceProps, TextDecorationProps, TextTransformProps } from "./props"

export const fontWeightClasses: Record<keyof FontWeightProps, string> = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
}

export const fontStyleClasses: Record<keyof FontStyleProps, string> = {
  italic: "italic",
  notItalic: "not-italic",
}

export const fontFamilyClasses: Record<keyof FontFamilyProps, string> = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
}

export const textDecorationClasses: Record<keyof TextDecorationProps, string> = {
  underline: "underline",
  lineThrough: "line-through",
  noUnderline: "no-underline",
  overline: "overline",
}

export const textTransformClasses: Record<keyof TextTransformProps, string> = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  normalCase: "normal-case",
}

export const textAlignClasses: Record<keyof TextAlignProps, string> = {
  textLeft: "text-left",
  textCenter: "text-center",
  textRight: "text-right",
  textJustify: "text-justify",
}

export const textAppearanceClasses: Record<keyof TextAppearanceProps & CommonAppearanceProps, string> = {
  default: "text-(--text-color-default)",
  primary: "text-(--text-color-primary)",
  secondary: "text-(--text-color-secondary)",
  tertiary: "text-(--text-color-tertiary)",
  muted: "text-(--text-color-muted)",
  link: "text-(--text-color-link)",

  accent: "text-(--text-color-accent)",
  success: "text-(--text-color-success)",
  danger: "text-(--text-color-danger)",
  warning: "text-(--text-color-warning)",
  info: "text-(--text-color-info)",
}

export const backgroundAppearanceClasses: Record<keyof CommonAppearanceProps, string> = {
  default: "bg-(--background-color-default)",
  primary: "bg-(--background-color-primary)",
  secondary: "bg-(--background-color-secondary)",
  tertiary: "bg-(--background-color-tertiary)",

  accent: "bg-(--background-color-accent)",
  success: "bg-(--background-color-success)",
  danger: "bg-(--background-color-danger)",
  warning: "bg-(--background-color-warning)",
  info: "bg-(--background-color-info)",
  transparent: "bg-transparent",
}

export const layoutBackgroundAppearanceClasses: Record<keyof CommonAppearanceProps, string> = {
  default: "bg-(--layout-background-default)",
  primary: "bg-(--layout-background-primary)",
  secondary: "bg-(--layout-background-secondary)",
  tertiary: "bg-(--layout-background-tertiary)",
  accent: "bg-(--layout-background-accent)",
  success: "bg-(--layout-background-success)",
  danger: "bg-(--layout-background-danger)",
  warning: "bg-(--layout-background-warning)",
  info: "bg-(--layout-background-info)",
  transparent: "bg-transparent",
}

export const borderAppearanceClasses: Record<keyof BorderAppearanceProps, string> = {
  default: "border-(--border-color-default)",
  primary: "border-(--border-color-primary)",
  secondary: "border-(--border-color-secondary)",
  tertiary: "border-(--border-color-tertiary)",

  accent: "border-(--border-color-accent)",
  success: "border-(--border-color-success)",
  danger: "border-(--border-color-danger)",
  warning: "border-(--border-color-warning)",
  info: "border-(--border-color-info)",
  transparent: "border-transparent",
  noBorder: "border-none",
}

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
  xl: "gap-10 max-lg:gap-8 max-md:gap-6",
  noGap: "gap-0"
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
  xl: "gap-8",
  noGap: "gap-0"
}

export const stackDirectionClasses: Record<keyof StackDirectionProps, string> = {
  row: "flex-row",
  column: "flex-col"
};

export const cardBorderRadiusClasses: Record<keyof BorderRadiusProps, string> = {
  roundedFull: "rounded-full",
  square: "rounded-none",
  xs: "rounded-sm",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
}
