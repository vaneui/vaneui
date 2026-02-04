import { defaultLayoutsThemes, defaultTypographyThemes } from "../../theme/common/ComponentTheme";
import type { TextTheme } from "./TypographyTheme";
import { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import { LetterSpacingClassMapper } from "../../theme/typography/letterSpacingClassMapper";
import { SimpleConsumerClassMapper } from "../../theme/appearance/simpleConsumerClassMapper";
import { textConsumerClass } from "../../classes/appearanceClasses";
import type { DeepPartial } from "../../../utils/deepPartial";

/** Shared sub-themes used by all typography components (Text, Title, SectionTitle, PageTitle) */
export const typographySubThemes: DeepPartial<TextTheme> = {
  size: {
    text: new FontSizeClassMapper(),
    lineHeight: new LineHeightClassMapper(),
    letterSpacing: new LetterSpacingClassMapper(),
  },
  appearance: {
    text: new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text'),
  },
  typography: defaultTypographyThemes,
  layout: defaultLayoutsThemes,
};
