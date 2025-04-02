import { ButtonStyleProps, CommonAppearanceProps, NoBorderProps, NoShadowProps } from "../props/props"

// Background classes for filled buttons
export const filledBackgroundAppearanceClasses: Record<keyof CommonAppearanceProps, string> = {
  default: "bg-(--filled-background-color-default)",
  primary: "bg-(--filled-background-color-primary)",
  secondary: "bg-(--filled-background-color-secondary)",
  tertiary: "bg-(--filled-background-color-tertiary)",
  accent: "bg-(--filled-background-color-accent)",
  success: "bg-(--filled-background-color-success)",
  danger: "bg-(--filled-background-color-danger)",
  warning: "bg-(--filled-background-color-warning)",
  info: "bg-(--filled-background-color-info)",
  transparent: "bg-transparent",
}

// Hover background classes for filled buttons
export const filledHoverBackgroundAppearanceClasses: Record<keyof CommonAppearanceProps, string> = {
  default: "hover:bg-(--filled-background-color-hover-default)",
  primary: "hover:bg-(--filled-background-color-hover-primary)",
  secondary: "hover:bg-(--filled-background-color-hover-secondary)",
  tertiary: "hover:bg-(--filled-background-color-hover-tertiary)",
  accent: "hover:bg-(--filled-background-color-hover-accent)",
  success: "hover:bg-(--filled-background-color-hover-success)",
  danger: "hover:bg-(--filled-background-color-hover-danger)",
  warning: "hover:bg-(--filled-background-color-hover-warning)",
  info: "hover:bg-(--filled-background-color-hover-info)",
  transparent: "hover:bg-transparent",
}

// Active background classes for filled buttons
export const filledActiveBackgroundAppearanceClasses: Record<keyof CommonAppearanceProps, string> = {
  default: "active:bg-(--filled-background-color-active-default)",
  primary: "active:bg-(--filled-background-color-active-primary)",
  secondary: "active:bg-(--filled-background-color-active-secondary)",
  tertiary: "active:bg-(--filled-background-color-active-tertiary)",
  accent: "active:bg-(--filled-background-color-active-accent)",
  success: "active:bg-(--filled-background-color-active-success)",
  danger: "active:bg-(--filled-background-color-active-danger)",
  warning: "active:bg-(--filled-background-color-active-warning)",
  info: "active:bg-(--filled-background-color-active-info)",
  transparent: "active:bg-transparent",
}

// Default background appearance classes (for non-button components)
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

// Hover background appearance classes for outline buttons
export const hoverBackgroundAppearanceClasses: Record<keyof CommonAppearanceProps, string> = {
  default: "hover:bg-(--background-color-hover-default)",
  primary: "hover:bg-(--background-color-hover-primary)",
  secondary: "hover:bg-(--background-color-hover-secondary)",
  tertiary: "hover:bg-(--background-color-hover-tertiary)",
  accent: "hover:bg-(--background-color-hover-accent)",
  success: "hover:bg-(--background-color-hover-success)",
  danger: "hover:bg-(--background-color-hover-danger)",
  warning: "hover:bg-(--background-color-hover-warning)",
  info: "hover:bg-(--background-color-hover-info)",
  transparent: "hover:bg-transparent",
}

// Active background appearance classes for outline buttons
export const activeBackgroundAppearanceClasses: Record<keyof CommonAppearanceProps, string> = {
  default: "active:bg-(--background-color-active-default)",
  primary: "active:bg-(--background-color-active-primary)",
  secondary: "active:bg-(--background-color-active-secondary)",
  tertiary: "active:bg-(--background-color-active-tertiary)",
  accent: "active:bg-(--background-color-active-accent)",
  success: "active:bg-(--background-color-active-success)",
  danger: "active:bg-(--background-color-active-danger)",
  warning: "active:bg-(--background-color-active-warning)",
  info: "active:bg-(--background-color-active-info)",
  transparent: "active:bg-transparent",
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

export const borderAppearanceClasses: Record<keyof CommonAppearanceProps, string> = {
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

// Border classes for filled buttons
export const filledBorderAppearanceClasses: Record<keyof CommonAppearanceProps, string> = {
  default: "border-(--filled-border-color-default)",
  primary: "border-(--filled-border-color-primary)",
  secondary: "border-(--filled-border-color-secondary)",
  tertiary: "border-(--filled-border-color-tertiary)",

  accent: "border-(--filled-border-color-accent)",
  success: "border-(--filled-border-color-success)",
  danger: "border-(--filled-border-color-danger)",
  warning: "border-(--filled-border-color-warning)",
  info: "border-(--filled-border-color-info)",
  transparent: "border-transparent",
}