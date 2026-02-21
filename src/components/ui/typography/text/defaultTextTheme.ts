import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { TypographyProps, TextTheme } from "../common";
import { TYPOGRAPHY_CATEGORIES } from "../common";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { textDefaults } from "./textDefaults";

/** Text specific theme */
export const defaultTextTheme = new ComponentTheme<TypographyProps, TextTheme>(
  "p",
  "vane-text p-0 m-0",
  typographyClassMappers,
  textDefaults,
  TYPOGRAPHY_CATEGORIES,
  (props: TypographyProps) => props.href ? "a" : "p",
  'ui'
);

/** Alias for backward compatibility */
export const textTheme = defaultTextTheme;
