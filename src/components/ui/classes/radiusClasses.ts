import { SizeKey, ShapeKey } from "../props";

export const uiBorderRadiusClasses: Record<SizeKey, string> = {
  xs: "rounded-(--ui-border-radius-xs)",
  sm: "rounded-(--ui-border-radius-sm)", 
  md: "rounded-(--ui-border-radius-md)",
  lg: "rounded-(--ui-border-radius-lg)",
  xl: "rounded-(--ui-border-radius-xl)",
};

export const layoutBorderRadiusClasses: Record<SizeKey, string> = {
  xs: "rounded-(--layout-border-radius-xs)",
  sm: "rounded-(--layout-border-radius-sm)", 
  md: "rounded-(--layout-border-radius-md)",
  lg: "rounded-(--layout-border-radius-lg)",
  xl: "rounded-(--layout-border-radius-xl)",
};

export const uiBorderRadiusShapeClasses: Record<ShapeKey, string | Record<SizeKey, string>> = {
  pill: "rounded-full",
  sharp: "rounded-none",
  rounded: uiBorderRadiusClasses,
};

export const layoutBorderRadiusShapeClasses: Record<ShapeKey, string | Record<SizeKey, string>> = {
  pill: "rounded-full",
  sharp: "rounded-none",
  rounded: layoutBorderRadiusClasses,
};

// Backward compatibility - defaults to layout radius
export const borderRadiusClasses = layoutBorderRadiusClasses;
export const borderRadiusShapeClasses = layoutBorderRadiusShapeClasses;