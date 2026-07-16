import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { PxClassMapper, PyClassMapper } from "../theme/size";
import type { BorderClassMapper, WidthClassMapper, HeightClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper } from "../theme/typography";

export interface TdTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
  };
  appearance: {
    border: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    border: BorderClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
  };
  typography: {
    textAlign: TextAlignClassMapper;
  };
}
