import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { TypographyProps, TextTheme } from "../common";
import { TYPOGRAPHY_CATEGORIES } from "../common";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { blockquoteDefaults } from "./blockquoteDefaults";

/** Blockquote specific theme */
export const defaultBlockquoteTheme = new ComponentTheme<TypographyProps, TextTheme>(
  "blockquote",
  // Logical accent border + indent (border-inline-start / padding-inline-start):
  // renders on the left in LTR, flips to the right under dir="rtl".
  "vane-blockquote p-0 m-0 border-s-3 border-(--border-color) ps-(--pl)",
  typographyClassMappers,
  blockquoteDefaults,
  TYPOGRAPHY_CATEGORIES,
  undefined,
  'ui'
);

/** Alias for backward compatibility */
export const blockquoteTheme = defaultBlockquoteTheme;
