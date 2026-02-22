import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { TypographyProps, TextTheme } from "../common";
import { TYPOGRAPHY_CATEGORIES } from "../common";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { blockquoteDefaults } from "./blockquoteDefaults";

/** Blockquote specific theme */
export const defaultBlockquoteTheme = new ComponentTheme<TypographyProps, TextTheme>(
  "blockquote",
  "vane-blockquote p-0 m-0 border-l-3 border-(--border-color) pl-(--pl)",
  typographyClassMappers,
  blockquoteDefaults,
  TYPOGRAPHY_CATEGORIES,
  undefined,
  'ui'
);

/** Alias for backward compatibility */
export const blockquoteTheme = defaultBlockquoteTheme;
