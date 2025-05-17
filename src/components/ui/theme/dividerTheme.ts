import { SizeTheme } from "./size/sizeTheme";
import { BaseLayoutTheme } from "./layout/baseLayoutTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";

export const defaultDividerTheme: SimpleComponentTheme = new SimpleComponentTheme(
  "bg-gray-200 h-px w-full",
  new SizeTheme(),
  TypographyTheme.createDefaultTypographyTheme(),
  BaseLayoutTheme.createBaseLayoutTheme(),
  {
    md: true,
    outline: true,
    default: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  }
);