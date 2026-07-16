import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { PxClassMapper, PyClassMapper } from "../theme/size";
import type { BorderClassMapper, WidthClassMapper, HeightClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper, FontWeightClassMapper } from "../theme/typography";

export interface ThTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
  };
  appearance: {
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    border: BorderClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
  };
  typography: {
    textAlign: TextAlignClassMapper;
    fontWeight: FontWeightClassMapper;
  };
}
