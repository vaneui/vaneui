import type { BaseTypographyComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { BorderClassMapper, RingClassMapper, FocusVisibleClassMapper, RadiusClassMapper, WrapClassMapper, DirectionClassMapper, CursorClassMapper, TransitionClassMapper, WhitespaceClassMapper } from "../theme/layout";
import type { PxClassMapper, PyClassMapper, GapClassMapper, FontSizeClassMapper, LineHeightClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";

/** MenuLabel theme — non-interactive presentational heading (no background mapper). */
export interface MenuLabelTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
    gap: GapClassMapper;
  };
  appearance: {
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    focusVisible: FocusVisibleClassMapper;
    radius: RadiusClassMapper;
    wrap: WrapClassMapper;
    flexDirection: DirectionClassMapper;
    cursor: CursorClassMapper;
    transition: TransitionClassMapper;
    whitespace: WhitespaceClassMapper;
  };
}
