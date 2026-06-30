import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { TypographyProps, TextTheme } from "../common";
import { TYPOGRAPHY_CATEGORIES } from "../common";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { titleDefaults } from "./titleDefaults";

/** Title specific theme - uses responsive font size */
export const defaultTitleTheme = new ComponentTheme<TypographyProps, TextTheme>(
  "h3",
  "vane-title text-balance",
  typographyClassMappers,
  titleDefaults,
  TYPOGRAPHY_CATEGORIES,
  (props: TypographyProps) => props.href ? "a" : "h3",
  'ui'
);

/** Alias for backward compatibility */
export const titleTheme = defaultTitleTheme;
