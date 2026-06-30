import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { DirectionClassMapper, WrapClassMapper, BorderClassMapper, RadiusClassMapper, RingClassMapper, CursorClassMapper, FocusVisibleClassMapper } from "../theme/layout";
import type { GapClassMapper, PxClassMapper, PyClassMapper, BreakpointClassMapper, MarginClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper } from "../theme/typography";

export interface CardTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
    margin: MarginClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    border: BorderClassMapper;
    radius: RadiusClassMapper;
    ring: RingClassMapper;
    wrap: WrapClassMapper;
    direction: DirectionClassMapper;
    breakpoint: BreakpointClassMapper;
    cursor: CursorClassMapper;
    focusVisible: FocusVisibleClassMapper;
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
