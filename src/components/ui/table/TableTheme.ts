import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { MarginClassMapper } from "../theme/size";
import type { BorderClassMapper, WidthClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper } from "../theme/typography";

export interface TableTheme extends BaseComponentTheme {
  size: {
    margin: MarginClassMapper;
  };
  appearance: {
    border: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    border: BorderClassMapper;
    width: WidthClassMapper;
  };
  typography: {
    textAlign: TextAlignClassMapper;
  };
}
