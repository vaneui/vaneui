import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { TypographyProps } from "../common/TypographyProps";
import type { TextTheme } from "../common/TypographyTheme";
import { TYPOGRAPHY_CATEGORIES } from "../common/TypographyCategories";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { textDefaults } from "./textDefaults";

/** Text specific theme */
export const defaultTextTheme = new ComponentTheme<TypographyProps, TextTheme>(
  "p",
  "vane-text p-0 m-0 w-fit",
  typographyClassMappers,
  textDefaults,
  TYPOGRAPHY_CATEGORIES,
  (props: TypographyProps) => props.href ? "a" : "p",
  'ui'
);

/** Alias for backward compatibility */
export const textTheme = defaultTextTheme;
