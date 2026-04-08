import type {
  BaseTypographyComponentTheme,
  DefaultSizedLayoutClassMappers,
} from "../../theme/common/ComponentTheme";
import type { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import type { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import type { LetterSpacingClassMapper } from "../../theme/typography/letterSpacingClassMapper";
import type { CursorClassMapper } from "../../theme/layout/cursorClassMapper";
import type { LinkVariantClassMapper } from "../../theme/appearance/linkVariantClassMapper";

export interface LinkTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
    letterSpacing: LetterSpacingClassMapper;
  };
  appearance: {
    text: LinkVariantClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    cursor: CursorClassMapper;
  };
}
