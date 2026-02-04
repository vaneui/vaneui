import type {
  BaseTypographyComponentTheme,
  DefaultLayoutThemes,
} from "../../theme/common/ComponentTheme";
import type { FontSizeTheme } from "../../theme/size/fontSizeTheme";
import type { LineHeightTheme } from "../../theme/size/lineHeightTheme";
import type { LinkVariantTheme } from "../../theme/appearance/linkVariantTheme";

export interface LinkTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
  };
  appearance: {
    text: LinkVariantTheme;
  };
  layout: DefaultLayoutThemes;
}
