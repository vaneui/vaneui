import { defaultSizedLayoutClassMappers, defaultTypographyClassMappers } from "./ComponentTheme";
import type { TextTheme } from "../../typography/common/TypographyTheme";
import { FontSizeClassMapper } from "../size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../size/lineHeightClassMapper";
import { LetterSpacingClassMapper } from "../typography/letterSpacingClassMapper";
import { CursorClassMapper } from "../layout/cursorClassMapper";
import { textAppearance } from "./appearanceClassMappers";
import type { DeepPartial } from "../../../utils/deepPartial";

/**
 * Shared sub-themes used by all typography components (Text, Title,
 * SectionTitle, PageTitle, Blockquote).
 *
 * Typography components are intentionally background-less — they render
 * inline-style text that inherits its container's background. Therefore
 * `bgAppearance` is NOT included, and `transparent` is excluded from
 * `TYPOGRAPHY_CATEGORIES` since it has no meaning here. For a highlighted
 * text effect, use the `Mark` component instead.
 *
 * Includes `CursorClassMapper` so `<Text cursorPointer>` works on
 * clickable inline text.
 */
export const typographyClassMappers: DeepPartial<TextTheme> = {
  size: {
    text: new FontSizeClassMapper(),
    lineHeight: new LineHeightClassMapper(),
    letterSpacing: new LetterSpacingClassMapper(),
  },
  appearance: {
    text: textAppearance,
  },
  typography: defaultTypographyClassMappers,
  layout: {
    ...defaultSizedLayoutClassMappers,
    cursor: new CursorClassMapper(),
  },
};
