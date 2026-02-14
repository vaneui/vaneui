import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { DirectionClassMapper, WrapClassMapper, BorderClassMapper, RingClassMapper, RadiusClassMapper } from "../theme/layout";
import type { GapClassMapper, PxClassMapper, PyClassMapper, BreakpointClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper } from "../theme/typography";

export interface SectionTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
    breakpoint: BreakpointClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    wrap: WrapClassMapper;
    direction: DirectionClassMapper;
    border: BorderClassMapper;
    ring: RingClassMapper;
    radius: RadiusClassMapper;
  };
  typography: {
    textAlign: TextAlignClassMapper;
  };
}
