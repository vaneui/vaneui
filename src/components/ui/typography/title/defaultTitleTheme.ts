import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { TypographyProps } from "../common/TypographyProps";
import type { TextTheme } from "../common/TypographyTheme";
import { TYPOGRAPHY_CATEGORIES } from "../common/TypographyCategories";
import { typographySubThemes } from "../common/typographySubThemes";
import { titleDefaults } from "./titleDefaults";
import { mergeDefaults } from "../../../utils/deepMerge";

/** Title specific theme - uses responsive font size */
export const defaultTitleTheme = new ComponentTheme<TypographyProps, TextTheme>(
  "h3",
  "vane-title text-balance w-fit",
  typographySubThemes,
  mergeDefaults(titleDefaults as Record<string, boolean>, { semibold: true }),
  TYPOGRAPHY_CATEGORIES,
  (props: TypographyProps) => props.href ? "a" : "h3",
  'ui'
);

/** Alias for backward compatibility */
export const titleTheme = defaultTitleTheme;
