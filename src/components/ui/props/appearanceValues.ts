import { BorderAppearanceProps, CommonAppearanceProps, NoBorderProps } from "./props"

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
}

export const noBorderClasses: Record<keyof NoBorderProps, string> = {
  noBorder: "border-none"
} 