import {
  SizeKey,
  AppearanceKey,
  TransparentKey,
  LinkKey,
} from "../props";

export const filledTextAppearanceClasses: Record<AppearanceKey | TransparentKey | LinkKey, string> = {
  default: "text-white",
  primary: "text-white",
  secondary: "text-white",
  tertiary: "text-white",
  link: "text-white",
  accent: "text-white",
  success: "text-white",
  danger: "text-white",
  warning: "text-white",
  info: "text-white",
  transparent: "text-transparent",
}

export const textAppearanceClasses: Record<AppearanceKey | TransparentKey | LinkKey, string> = {
  default: "text-(--text-color-default)",
  primary: "text-(--text-color-primary)",
  secondary: "text-(--text-color-secondary)",
  tertiary: "text-(--text-color-tertiary)",
  link: "text-(--text-color-link)",
  accent: "text-(--text-color-accent)",
  success: "text-(--text-color-success)",
  danger: "text-(--text-color-danger)",
  warning: "text-(--text-color-warning)",
  info: "text-(--text-color-info)",
  transparent: "text-transparent",
}

export const textSizeClasses: Record<SizeKey, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

