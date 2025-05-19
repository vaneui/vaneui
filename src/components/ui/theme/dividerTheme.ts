import { SizeTheme } from "./size/sizeTheme";
import { BaseLayoutTheme } from "./layout/baseLayoutTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";
import { LayoutComponentProps } from "../props/props";

export const defaultDividerTheme: SimpleComponentTheme<LayoutComponentProps> = SimpleComponentTheme.createSimpleComponentTheme<LayoutComponentProps>(
  "div",
  "bg-gray-200 h-px w-full",
  new SizeTheme(),
  TypographyTheme.createDefaultTypographyTheme(),
  BaseLayoutTheme.createBaseLayoutTheme(),
  {
    md: true,
    default: true,
  }
);
