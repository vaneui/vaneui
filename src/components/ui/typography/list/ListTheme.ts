import type {
  BaseTypographyComponentTheme,
  DefaultLayoutThemes,
} from "../../theme/common/ComponentTheme";
import type { FontSizeTheme } from "../../theme/size/fontSizeTheme";
import type { LineHeightTheme } from "../../theme/size/lineHeightTheme";
import type { PlTheme } from "../../theme/size/plTheme";
import type { SimpleConsumerTheme } from "../../theme/appearance/simpleConsumerTheme";
import type { ListStyleTheme } from "../../theme/list/listStyleTheme";

export interface ListTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
    paddingLeft: PlTheme;
  }
  appearance: {
    text: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes;
  listStyle: ListStyleTheme;
}
