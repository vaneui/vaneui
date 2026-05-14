import { defaultSizedLayoutClassMappers, defaultTypographyClassMappers } from "./ComponentTheme";
import type { TextTheme } from "../../typography/common/TypographyTheme";
import { FontSizeClassMapper } from "../size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../size/lineHeightClassMapper";
import { LetterSpacingClassMapper } from "../typography/letterSpacingClassMapper";
import { CursorClassMapper } from "../layout/cursorClassMapper";
import { textAppearance } from "./appearanceClassMappers";
import type { DeepPartial } from "../../../utils/deepPartial";

// Typography components are background-less by design; no bgAppearance, no `transparent` category.
// CursorClassMapper enables `<Text cursorPointer>` for clickable inline text.
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
