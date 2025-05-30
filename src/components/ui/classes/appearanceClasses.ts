import { TextAppearanceKey } from "../props/keys";

// Background classes for filled buttons
export const filledBackgroundAppearanceClasses: Record<TextAppearanceKey, string> = {
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
  muted: "bg-(--filled-background-color-muted)",
  link: "bg-(--filled-background-color-link)",
}

// Hover background classes for filled buttons
export const filledHoverBackgroundAppearanceClasses: Record<TextAppearanceKey, string> = {
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
  muted: "hover:bg-(--filled-background-color-hover-muted)",
  link: "hover:bg-(--filled-background-color-hover-link)",
}

// Active background classes for filled buttons
export const filledActiveBackgroundAppearanceClasses: Record<TextAppearanceKey, string> = {
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
  muted: "active:bg-(--filled-background-color-active-muted)",
  link: "active:bg-(--filled-background-color-active-link)",
}

// Default background appearance classes (for non-button components)
export const backgroundAppearanceClasses: Record<TextAppearanceKey, string> = {
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
  muted: "bg-(--background-color-muted)",
  link: "bg-(--background-color-link)",
}

// Hover background appearance classes for outline buttons
export const hoverBackgroundAppearanceClasses: Record<TextAppearanceKey, string> = {
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
  muted: "hover:bg-(--background-color-hover-muted)",
  link: "hover:bg-(--background-color-hover-link)",
}

// Active background appearance classes for outline buttons
export const activeBackgroundAppearanceClasses: Record<TextAppearanceKey, string> = {
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
  muted: "active:bg-(--background-color-active-muted)",
  link: "active:bg-(--background-color-active-link)",
}

//TODO: use the classes
export const layoutBackgroundAppearanceClasses: Record<TextAppearanceKey, string> = {
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
  muted: "bg-(--layout-background-muted)",
  link: "bg-(--layout-background-link)",
}

export const borderAppearanceClasses: Record<TextAppearanceKey, string> = {
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
  muted: "border-(--border-color-muted)",
  link: "border-(--border-color-link)",
}

// Border classes for filled elements
export const filledBorderAppearanceClasses: Record<TextAppearanceKey, string> = {
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
  muted: "border-(--filled-border-color-muted)",
  link: "border-(--filled-border-color-link)",
}

export const ringAppearanceClasses: Record<TextAppearanceKey, string> = {
  default: "ring-(--border-color-default)",
  primary: "ring-(--border-color-primary)",
  secondary: "ring-(--border-color-secondary)",
  tertiary: "ring-(--border-color-tertiary)",
  accent: "ring-(--border-color-accent)",
  success: "ring-(--border-color-success)",
  danger: "ring-(--border-color-danger)",
  warning: "ring-(--border-color-warning)",
  info: "ring-(--border-color-info)",
  transparent: "ring-transparent",
  muted: "ring-(--border-color-muted)",
  link: "ring-(--border-color-link)",
}

// Ring classes for filled elements
export const filledRingAppearanceClasses: Record<TextAppearanceKey, string> = {
  default: "ring-(--filled-border-color-default)",
  primary: "ring-(--filled-border-color-primary)",
  secondary: "ring-(--filled-border-color-secondary)",
  tertiary: "ring-(--filled-border-color-tertiary)",
  accent: "ring-(--filled-border-color-accent)",
  success: "ring-(--filled-border-color-success)",
  danger: "ring-(--filled-border-color-danger)",
  warning: "ring-(--filled-border-color-warning)",
  info: "ring-(--filled-border-color-info)",
  transparent: "ring-transparent",
  muted: "ring-(--filled-border-color-muted)",
  link: "ring-(--filled-border-color-link)",
}
