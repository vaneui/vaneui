import type {
  BaseTypographyComponentTheme,
  DefaultLayoutClassMappers,
} from "../../theme/common/ComponentTheme";
import type { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import type { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import type { LinkVariantClassMapper } from "../../theme/appearance/linkVariantClassMapper";

export interface LinkTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
  };
  appearance: {
    text: LinkVariantClassMapper;
  };
  layout: DefaultLayoutClassMappers;
}
