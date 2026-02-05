import type {
  BaseTypographyComponentTheme,
  DefaultLayoutClassMappers,
} from "../../theme/common/ComponentTheme";
import type { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import type { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import type { SimpleConsumerClassMapper } from "../../theme/appearance/simpleConsumerClassMapper";

export interface ListItemTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
  };
  appearance: {
    text: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers;
}
