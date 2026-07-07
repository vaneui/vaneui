import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { TypographyProps } from "../common";
import type { BorderProps } from "../../props";
import type { BlockquoteTheme } from "./BlockquoteTheme";
import { BLOCKQUOTE_CATEGORIES } from "../common";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { borderAppearance } from "../../theme/common/appearanceClassMappers";
import { PerSideBorderClassMapper } from "../../theme/layout/perSideBorderClassMapper";
import { blockquoteDefaults } from "./blockquoteDefaults";

// Typography mappers + a per-side border (width via PerSideBorderClassMapper,
// color via borderAppearance) so the accent is the `borderS` prop.
const blockquoteClassMappers: BlockquoteTheme = {
  ...typographyClassMappers,
  layout: { ...typographyClassMappers.layout, border: new PerSideBorderClassMapper() },
  appearance: { ...typographyClassMappers.appearance, border: borderAppearance },
};

/** Blockquote specific theme */
export const defaultBlockquoteTheme = new ComponentTheme<TypographyProps & BorderProps, BlockquoteTheme>(
  "blockquote",
  // Only the padding reset + logical indent live in the base now. The accent
  // border is the `borderS` prop: its width comes from --bw-s (thickened to 3px
  // by the .vane-blockquote rule) and its color from the appearance system —
  // both flip to the inline-end side under dir="rtl".
  "vane-blockquote p-0 ps-(--pl)",
  blockquoteClassMappers,
  blockquoteDefaults,
  BLOCKQUOTE_CATEGORIES,
  undefined,
  'ui'
);

/** Alias for backward compatibility */
export const blockquoteTheme = defaultBlockquoteTheme;
