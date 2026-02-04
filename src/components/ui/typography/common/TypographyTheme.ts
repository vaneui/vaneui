import type {
  BaseTypographyComponentTheme,
  DefaultLayoutThemes,
} from "../../theme/common/ComponentTheme";
import type { FontSizeTheme } from "../../theme/size/fontSizeTheme";
import type { LineHeightTheme } from "../../theme/size/lineHeightTheme";
import type { LetterSpacingTheme } from "../../theme/typography/letterSpacingTheme";
import type { SimpleConsumerTheme } from "../../theme/appearance/simpleConsumerTheme";

export interface TextTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
    letterSpacing: LetterSpacingTheme;
  };
  appearance: {
    text: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes;
}

/** Alias for TextTheme - used by Text, Title, SectionTitle, PageTitle, ListItem components */
export type TypographyTheme = TextTheme;
