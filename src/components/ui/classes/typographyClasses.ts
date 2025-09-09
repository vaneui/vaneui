import {
  SizeKey,
  AppearanceKey,
  TransparentKey,
} from "../props";

export const filledTextAppearanceClasses: Record<AppearanceKey | TransparentKey, string> = {
  default: "text-(--color-text-filled-default)",
  primary: "text-(--color-text-filled-primary)",
  secondary: "text-(--color-text-filled-secondary)",
  tertiary: "text-(--color-text-filled-tertiary)",
  link: "text-(--color-text-filled-link)",
  accent: "text-(--color-text-filled-accent)",
  success: "text-(--color-text-filled-success)",
  danger: "text-(--color-text-filled-danger)",
  warning: "text-(--color-text-filled-warning)",
  info: "text-(--color-text-filled-info)",
  transparent: "text-transparent",
}

export const textAppearanceClasses: Record<AppearanceKey | TransparentKey, string> = {
  default: "text-(--color-text-default)",
  primary: "text-(--color-text-primary)",
  secondary: "text-(--color-text-secondary)",
  tertiary: "text-(--color-text-tertiary)",
  link: "text-(--color-text-link)",
  accent: "text-(--color-text-accent)",
  success: "text-(--color-text-success)",
  danger: "text-(--color-text-danger)",
  warning: "text-(--color-text-warning)",
  info: "text-(--color-text-info)",
  transparent: "text-transparent",
}

export const textSizeClasses: Record<SizeKey, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

