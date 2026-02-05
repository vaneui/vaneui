import { defaultLayoutClassMappers, defaultTypographyClassMappers } from "./ComponentTheme";
import type { TextTheme } from "../../typography/common/TypographyTheme";
import { FontSizeClassMapper } from "../size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../size/lineHeightClassMapper";
import { LetterSpacingClassMapper } from "../typography/letterSpacingClassMapper";
import { textAppearance } from "./appearanceClassMappers";
import type { DeepPartial } from "../../../utils/deepPartial";

/** Shared sub-themes used by all typography components (Text, Title, SectionTitle, PageTitle) */
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
  layout: defaultLayoutClassMappers,
};
