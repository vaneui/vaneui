import { defaultLayoutsThemes, defaultTypographyThemes } from "../../theme/common/ComponentTheme";
import type { TextTheme } from "./TypographyTheme";
import { FontSizeTheme } from "../../theme/size/fontSizeTheme";
import { LineHeightTheme } from "../../theme/size/lineHeightTheme";
import { LetterSpacingTheme } from "../../theme/typography/letterSpacingTheme";
import { SimpleConsumerTheme } from "../../theme/appearance/simpleConsumerTheme";
import { textConsumerClass } from "../../classes/appearanceClasses";
import type { DeepPartial } from "../../../utils/deepPartial";

/** Shared sub-themes used by all typography components (Text, Title, SectionTitle, PageTitle) */
export const typographySubThemes: DeepPartial<TextTheme> = {
  size: {
    text: new FontSizeTheme(),
    lineHeight: new LineHeightTheme(),
    letterSpacing: new LetterSpacingTheme(),
  },
  appearance: {
    text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
  },
  typography: defaultTypographyThemes,
  layout: defaultLayoutsThemes,
};
