import { VariantAppearance } from "./commonTypes";
import { TypographyTheme } from "./typographyTheme";
import { BaseLayoutTheme } from "./baseLayoutTheme";
import { AppearanceTheme } from "./appearanceTheme";
import { SizeTheme } from "./sizeTheme";

export * from "./commonTypes";
export * from "./typographyTheme";
export * from "./appearanceTheme";
export * from "./sizeTheme";

export * from "./baseLayoutTheme";
export const createDefaultLayoutTheme = createBaseLayoutTheme;
export * from "./cardLayoutTheme";
export * from "./rowLayoutTheme";
export * from "./colLayoutTheme";
export * from "./stackLayoutTheme";
export * from "./buttonLayoutTheme";
export * from "./badgeLayoutTheme";
export * from "./chipLayoutTheme";

export type ComponentTheme<T extends VariantAppearance, P = {}> = {
  base: string;
} & SizeTheme & AppearanceTheme<T> & {
  typography: TypographyTheme;
  layout: BaseLayoutTheme;
  defaults: Partial<P>;
};
