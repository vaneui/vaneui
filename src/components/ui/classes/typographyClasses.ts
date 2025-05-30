import {
  FontFamilyKey,
  FontStyleKey,
  FontWeightKey,
  SizeKey,
  TextAlignKey,
  TextAppearanceKey,
  TextDecorationKey,
  TextTransformKey
} from "../props/keys";

export const fontWeightClasses: Record<FontWeightKey, string> = {
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

export const fontStyleClasses: Record<FontStyleKey, string> = {
  italic: "italic",
  notItalic: "not-italic",
}

export const fontFamilyClasses: Record<FontFamilyKey, string> = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
}

export const textDecorationClasses: Record<TextDecorationKey, string> = {
  underline: "underline",
  lineThrough: "line-through",
  noUnderline: "no-underline",
  overline: "overline",
}

export const textTransformClasses: Record<TextTransformKey, string> = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  normalCase: "normal-case",
}

export const textAlignClasses: Record<TextAlignKey, string> = {
  textLeft: "text-left",
  textCenter: "text-center",
  textRight: "text-right",
  textJustify: "text-justify",
}

// Text appearance classes for filled buttons (all white text)
export const filledTextAppearanceClasses: Record<TextAppearanceKey, string> = {
  default: "text-white",
  primary: "text-white",
  secondary: "text-white",
  tertiary: "text-white",
  muted: "text-white",
  link: "text-white",
  accent: "text-white",
  success: "text-white",
  danger: "text-white",
  warning: "text-white",
  info: "text-white",
  transparent: "text-transparent",
}

// Default text appearance classes (for non-button components)
export const textAppearanceClasses: Record<TextAppearanceKey, string> = {
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

// Text size classes
export const textSizeClasses: Record<SizeKey, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}
