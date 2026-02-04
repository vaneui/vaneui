import type {
  BaseTypographyComponentTheme,
  DefaultLayoutThemes,
} from "../../theme/common/ComponentTheme";
import type { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import type { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import type { LetterSpacingClassMapper } from "../../theme/typography/letterSpacingClassMapper";
import type { SimpleConsumerClassMapper } from "../../theme/appearance/simpleConsumerClassMapper";

export interface TextTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
    letterSpacing: LetterSpacingClassMapper;
  };
  appearance: {
    text: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutThemes;
}

/** Alias for TextTheme - used by Text, Title, SectionTitle, PageTitle, ListItem components */
export type TypographyTheme = TextTheme;
