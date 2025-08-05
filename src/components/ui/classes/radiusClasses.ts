import { SizeKey, ShapeKey } from "../props";

export const borderRadiusClasses: Record<SizeKey, string> = {
  xs: "rounded-(--border-radius-xs)",
  sm: "rounded-(--border-radius-sm)", 
  md: "rounded-(--border-radius-md)",
  lg: "rounded-(--border-radius-lg)",
  xl: "rounded-(--border-radius-xl)",
};

export const borderRadiusShapeClasses: Record<ShapeKey, string | Record<SizeKey, string>> = {
  pill: "rounded-full",
  sharp: "rounded-none",
  rounded: borderRadiusClasses,
};