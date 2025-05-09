import { VariantAppearance } from "./commonTypes";
import { TypographyTheme } from "./typographyTheme";
import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";
import { AppearanceTheme, StyleVariantAppearanceTheme } from "./appearanceTheme";
import { SizeTheme } from "./sizeTheme";

export * from "./commonTypes";
export * from "./typographyTheme";
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
export type StyleVariantComponentTheme<T extends VariantAppearance, P = {}> = {
  base: string;
} & SizeTheme & StyleVariantAppearanceTheme<T> & {
  typography: TypographyTheme;
  layout: BaseLayoutTheme;
  defaults: Partial<P>;
};

// Component theme for other components
export type ComponentTheme<T extends VariantAppearance, P = {}> = {
  base: string;
} & SizeTheme & AppearanceTheme<T> & {
  typography: TypographyTheme;
  layout: BaseLayoutTheme;
  defaults: Partial<P>;
};
