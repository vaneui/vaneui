import {
  SizeKey,
  AppearanceKey,
  TransparentKey,
} from "../props";

export const filledTextAppearanceClasses: Record<AppearanceKey | TransparentKey, string> = {
  default: "text-(--filled-text-color-default)",
  primary: "text-(--filled-text-color-primary)",
  secondary: "text-(--filled-text-color-secondary)",
  tertiary: "text-(--filled-text-color-tertiary)",
  link: "text-(--filled-text-color-link)",
  accent: "text-(--filled-text-color-accent)",
  success: "text-(--filled-text-color-success)",
  danger: "text-(--filled-text-color-danger)",
  warning: "text-(--filled-text-color-warning)",
  info: "text-(--filled-text-color-info)",
  transparent: "text-transparent",
}

export const textAppearanceClasses: Record<AppearanceKey | TransparentKey, string> = {
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

