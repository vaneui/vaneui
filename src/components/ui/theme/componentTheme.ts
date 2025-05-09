import { VariantAppearance } from "./commonTypes";
import { TypographyThemeClass } from "./typographyThemeClass";
import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";
import { AppearanceTheme, StyleVariantAppearanceTheme } from "./appearanceTheme";
import { SizeTheme } from "./sizeTheme";

export * from "./commonTypes";
export * from "./typographyThemeClass";
export * from "./appearanceTheme";
export * from "./sizeTheme";

export * from "./baseLayoutTheme";
export * from "./cardLayoutTheme";
export * from "./rowLayoutTheme";
export * from "./colLayoutTheme";
export * from "./stackLayoutTheme";
export * from "./buttonLayoutTheme";
export * from "./badgeLayoutTheme";
export * from "./chipLayoutTheme";

// Component theme for button, chip, and badge
// This type is kept for backward compatibility

// Component theme for other components
export type ComponentTheme<T extends VariantAppearance, P = {}> = {
  base: string;
} & SizeTheme & AppearanceTheme<T> & {
  typography: TypographyThemeClass;
  layout: BaseLayoutTheme;
  defaults: Partial<P>;
};
