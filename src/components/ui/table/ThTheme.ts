import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { PxClassMapper, PyClassMapper, FontSizeClassMapper } from "../theme/size";
import type { BorderClassMapper, WidthClassMapper, HeightClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper, FilledSurfaceClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper, FontWeightClassMapper } from "../theme/typography";

export interface ThTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    fontSize: FontSizeClassMapper;
  };
  appearance: {
    surface: FilledSurfaceClassMapper;
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
