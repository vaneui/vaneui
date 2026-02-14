import type { BaseTypographyComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { DirectionClassMapper, WrapClassMapper, BorderClassMapper, RadiusClassMapper, RingClassMapper, CursorClassMapper } from "../theme/layout";
import type { LineHeightClassMapper, GapClassMapper, PxClassMapper, PyClassMapper, BreakpointClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";

export interface CardTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    lineHeight: LineHeightClassMapper;
    gap: GapClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    border: BorderClassMapper;
    radius: RadiusClassMapper;
    ring: RingClassMapper;
    wrap: WrapClassMapper;
    direction: DirectionClassMapper;
    breakpoint: BreakpointClassMapper;
    shadow: ShadowAppearanceClassMapper;
    cursor: CursorClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
  };
}
