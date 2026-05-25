import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { DirectionClassMapper, WrapClassMapper, BorderClassMapper, RadiusClassMapper, RingClassMapper, CursorClassMapper, FocusVisibleClassMapper } from "../theme/layout";
import type { GapClassMapper, PxClassMapper, PyClassMapper, BreakpointClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper } from "../theme/typography";

export interface CardTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
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
    focusVisible: FocusVisibleClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
  };
  typography: {
    textAlign: TextAlignClassMapper;
  };
}
