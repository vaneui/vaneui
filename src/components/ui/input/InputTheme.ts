import type { BaseTypographyComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { DirectionClassMapper, BorderClassMapper, RadiusClassMapper, RingClassMapper, FocusVisibleClassMapper, CursorClassMapper, WrapClassMapper, TransitionClassMapper } from "../theme/layout";
import type { FontSizeClassMapper, LineHeightClassMapper, GapClassMapper, PxClassMapper, PyClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper, StatusClassMapper } from "../theme/appearance";

export interface InputTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
    status: StatusClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    focusVisible: FocusVisibleClassMapper;
    cursor: CursorClassMapper;
    radius: RadiusClassMapper;
    wrap: WrapClassMapper;
    flexDirection: DirectionClassMapper;
    transition: TransitionClassMapper;
  };
}
