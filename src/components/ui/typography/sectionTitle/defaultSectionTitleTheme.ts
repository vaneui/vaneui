import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { TypographyProps } from "../common/TypographyProps";
import type { TextTheme } from "../common/TypographyTheme";
import { TYPOGRAPHY_CATEGORIES } from "../common/TypographyCategories";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { sectionTitleDefaults } from "./sectionTitleDefaults";
import { mergeDefaults } from "../../../utils/deepMerge";

/** Section title specific theme - uses responsive font size */
export const defaultSectionTitleTheme = new ComponentTheme<TypographyProps, TextTheme>(
  "h2",
  "vane-section-title text-balance w-fit",
  typographyClassMappers,
  mergeDefaults(sectionTitleDefaults as Record<string, boolean>, { semibold: true }),
  TYPOGRAPHY_CATEGORIES,
  (props: TypographyProps) => props.href ? "a" : "h2",
  'ui'
);

/** Alias for backward compatibility */
export const sectionTitleTheme = defaultSectionTitleTheme;
