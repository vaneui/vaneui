import { VariantAppearance } from "./commonTypes";
import { TypographyTheme } from "./typographyTheme";
import { LayoutTheme } from "./layoutTheme";
import { AppearanceTheme } from "./appearanceTheme";
import { SizeTheme } from "./sizeTheme";

export * from "./commonTypes";
export * from "./typographyTheme";
export * from "./layoutTheme";
export * from "./appearanceTheme";
export * from "./sizeTheme";

export * from "./baseLayoutTheme";
export * from "./cardLayoutTheme";
export * from "./rowLayoutTheme";
export * from "./colLayoutTheme";
export * from "./stackLayoutTheme";

export type ComponentTheme<T extends VariantAppearance, P = {}> = {
  base: string;
} & SizeTheme & AppearanceTheme<T> & {
  typography: TypographyTheme;
  layout: LayoutTheme;
  defaults: Partial<P>;
};
