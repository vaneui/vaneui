import type { BaseTypographyComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { BorderClassMapper, RingClassMapper, WrapClassMapper, DirectionClassMapper, CursorClassMapper } from "../theme/layout";
import type { GapClassMapper, FontSizeClassMapper, LineHeightClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";

export interface LabelTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
    gap: GapClassMapper;
  };
  appearance: {
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    wrap: WrapClassMapper;
    flexDirection: DirectionClassMapper;
    cursor: CursorClassMapper;
  };
}
