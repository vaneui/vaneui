import type {
  BaseTypographyComponentTheme,
  DefaultLayoutClassMappers,
} from "../../theme/common/ComponentTheme";
import type { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import type { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import type { PlClassMapper } from "../../theme/size/plClassMapper";
import type { SimpleConsumerClassMapper } from "../../theme/appearance/simpleConsumerClassMapper";
import type { ListStyleClassMapper } from "../../theme/list/listStyleClassMapper";

export interface ListTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
    paddingLeft: PlClassMapper;
  }
  appearance: {
    text: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers;
  listStyle: ListStyleClassMapper;
}
