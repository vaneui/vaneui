import { VariantAppearance } from "./commonTypes";
import { TypographyTheme } from "./typographyTheme";
import { LayoutTheme } from "./layoutTheme";
import { AppearanceTheme } from "./appearanceTheme";
import { SizeTheme } from "./sizeTheme";

// Re-export all theme-related types and functions for backward compatibility
export * from "./commonTypes";
export * from "./typographyTheme";
export * from "./layoutTheme";
export * from "./appearanceTheme";
export * from "./sizeTheme";

// Component theme structure that combines all theme aspects
export type ComponentTheme<T extends VariantAppearance, P = {}> = {
  base: string;
} & SizeTheme & AppearanceTheme<T> & {
  typography: TypographyTheme;
  layout: LayoutTheme;
  defaults: Partial<P>;
};
