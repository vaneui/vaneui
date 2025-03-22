import { FontFamilyProps, FontStyleProps, FontWeightProps, TextAlignProps, TextAppearanceProps, TextDecorationProps, TextTransformProps, CommonAppearanceProps } from "./props"

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

export const textAppearanceClasses: Record<keyof TextAppearanceProps, string> = {
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
  transparent: "text-transparent",
} 