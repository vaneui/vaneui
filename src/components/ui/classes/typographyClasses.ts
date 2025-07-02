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
