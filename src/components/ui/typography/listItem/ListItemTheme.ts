import type {
  BaseTypographyComponentTheme,
  DefaultLayoutThemes,
} from "../../theme/common/ComponentTheme";
import type { FontSizeTheme } from "../../theme/size/fontSizeTheme";
import type { LineHeightTheme } from "../../theme/size/lineHeightTheme";
import type { SimpleConsumerTheme } from "../../theme/appearance/simpleConsumerTheme";

export interface ListItemTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
  };
  appearance: {
    text: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes;
}
