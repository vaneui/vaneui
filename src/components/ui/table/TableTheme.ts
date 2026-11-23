import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { MarginClassMapper } from "../theme/size";
import type { BorderClassMapper, WidthClassMapper, StripedClassMapper, HoverableClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper, FilledSurfaceClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper, FontFamilyClassMapper } from "../theme/typography";

export interface TableTheme extends BaseComponentTheme {
  size: {
    margin: MarginClassMapper;
  };
  appearance: {
    surface: FilledSurfaceClassMapper;
    border: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    border: BorderClassMapper;
    width: WidthClassMapper;
    striped: StripedClassMapper;
    hoverable: HoverableClassMapper;
  };
  typography: {
    textAlign: TextAlignClassMapper;
    fontFamily: FontFamilyClassMapper;
  };
}
