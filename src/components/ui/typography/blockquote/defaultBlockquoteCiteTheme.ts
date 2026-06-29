import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { TypographyProps, TextTheme } from "../common";
import { TYPOGRAPHY_CATEGORIES } from "../common";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { blockquoteCiteDefaults } from "./blockquoteCiteDefaults";

// The visible source line for <Blockquote cite="...">. A themed <cite> rendered
// through the typography system rather than a raw CSS class: muted via the
// `tertiary` appearance token (not opacity), `block` + `notItalic` via props,
// top margin from --gap, and font-size inherited from the quote (--fs). Nothing
// is a fixed literal, and it's customizable via `theme.blockquoteCite`.
export const defaultBlockquoteCiteTheme = new ComponentTheme<TypographyProps, TextTheme>(
  "cite",
  "vane-blockquote-cite mt-(--gap)",
  typographyClassMappers,
  blockquoteCiteDefaults,
  TYPOGRAPHY_CATEGORIES,
  undefined,
  'ui'
);
