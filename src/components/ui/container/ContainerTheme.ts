import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { DirectionClassMapper, WrapClassMapper, BorderClassMapper, RingClassMapper, RadiusClassMapper } from "../theme/layout";
import type { GapClassMapper, PxClassMapper, PyClassMapper, SizeClassMapper, BreakpointClassMapper } from "../theme/size";
import type { ShadowAppearanceClassMapper, SimpleConsumerClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper } from "../theme/typography";

export interface ContainerTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
    maxWidth: SizeClassMapper;
    breakpoint: BreakpointClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    wrap: WrapClassMapper;
    direction: DirectionClassMapper;
    border: BorderClassMapper;
    ring: RingClassMapper;
    radius: RadiusClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
  typography: {
    textAlign: TextAlignClassMapper;
  };
}
