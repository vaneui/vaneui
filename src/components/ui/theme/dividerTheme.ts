import { TypographyTheme } from "./typography/typographyTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { LayoutComponentProps } from "../props/props";

export const defaultDividerTheme = new ComponentTheme<LayoutComponentProps>(
  "div",
  "bg-gray-200 h-px w-full",
  {
    typography: TypographyTheme.createDefaultTypographyTheme(),
    appearance: SimpleAppearanceTheme.createDefaultStyle(),
  },
  {
    md: true,
    default: true,
  }
);
