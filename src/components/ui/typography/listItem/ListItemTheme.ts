import type {
  BaseTypographyComponentTheme,
  DefaultSizedLayoutClassMappers,
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
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
  };
  // sized variant: LIST_ITEM_CATEGORIES registers `width`/`height`, so the layout
  // group must carry their mappers (inherited from typographyClassMappers)
  layout: DefaultSizedLayoutClassMappers;
}
