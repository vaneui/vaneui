import { BgAppearanceKey, TextAppearanceKey } from "../props";

export const filledBackgroundAppearanceClasses: Record<BgAppearanceKey, string> = {
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

export const filledHoverBackgroundAppearanceClasses: Record<BgAppearanceKey, string> = {
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

export const filledActiveBackgroundAppearanceClasses: Record<BgAppearanceKey, string> = {
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

export const backgroundAppearanceClasses: Record<BgAppearanceKey, string> = {
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

export const hoverBackgroundAppearanceClasses: Record<BgAppearanceKey, string> = {
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

export const activeBackgroundAppearanceClasses: Record<BgAppearanceKey, string> = {
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

export const layoutBackgroundAppearanceClasses: Record<BgAppearanceKey, string> = {
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

export const bgBorderAppearanceClasses: Record<TextAppearanceKey, string> = {
  default: "bg-(--border-color-default)",
  primary: "bg-(--border-color-primary)",
  secondary: "bg-(--border-color-secondary)",
  tertiary: "bg-(--border-color-tertiary)",
  accent: "bg-(--border-color-accent)",
  success: "bg-(--border-color-success)",
  danger: "bg-(--border-color-danger)",
  warning: "bg-(--border-color-warning)",
  info: "bg-(--border-color-info)",
  muted: "bg-(--border-color-muted)",
  link: "bg-(--border-color-link)",
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
  muted: "border-(--border-color-muted)",
  link: "border-(--border-color-link)",
}

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
  muted: "ring-(--border-color-muted)",
  link: "ring-(--border-color-link)",
}

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
  muted: "ring-(--filled-border-color-muted)",
  link: "ring-(--filled-border-color-link)",
}
