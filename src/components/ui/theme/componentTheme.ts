import { VariantAppearance } from "./commonTypes";
import { TypographyThemeClass } from "./typographyThemeClass";
import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";
import { SimpleAppearanceTheme, StyleVariantAppearanceTheme } from "./appearanceThemeClass";
import { SizeTheme } from "./sizeTheme";
import { ComponentThemeClass, StyleVariantComponentThemeClass, SimpleComponentThemeClass } from "./componentThemeClass";

export * from "./commonTypes";
export * from "./typographyThemeClass";
export * from "./appearanceTheme";
export * from "./sizeTheme";
export * from "./componentThemeClass";

export * from "./baseLayoutTheme";
export * from "./cardLayoutTheme";
export * from "./rowLayoutTheme";
export * from "./colLayoutTheme";
export * from "./stackLayoutTheme";
export * from "./buttonLayoutTheme";
export * from "./badgeLayoutTheme";
export * from "./chipLayoutTheme";

// Component theme for other components
// This type is kept for backward compatibility
export type ComponentTheme<T extends VariantAppearance, P = {}> = ComponentThemeClass;
