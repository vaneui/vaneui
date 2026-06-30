import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { TypographyProps, TextTheme } from "../common";
import { TYPOGRAPHY_CATEGORIES } from "../common";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { pageTitleDefaults } from "./pageTitleDefaults";

/** Page title specific theme - uses responsive font size */
export const defaultPageTitleTheme = new ComponentTheme<TypographyProps, TextTheme>(
  "h1",
  "vane-page-title text-balance",
  typographyClassMappers,
  pageTitleDefaults,
  TYPOGRAPHY_CATEGORIES,
  (props: TypographyProps) => props.href ? "a" : "h1",
  'ui'
);

/** Alias for backward compatibility */
export const pageTitleTheme = defaultPageTitleTheme;
