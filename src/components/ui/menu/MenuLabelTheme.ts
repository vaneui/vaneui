import type { BaseTypographyComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { BorderClassMapper, RingClassMapper, FocusVisibleClassMapper, RadiusClassMapper, WrapClassMapper, DirectionClassMapper, CursorClassMapper, TransitionClassMapper, WhitespaceClassMapper, FlexClassMapper, ShrinkClassMapper } from "../theme/layout";
import type { PxClassMapper, PyClassMapper, GapClassMapper, FontSizeClassMapper, LineHeightClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";

/* MenuLabel: non-interactive heading with NO background mapper — it inherits the menu's background (tests assert no bg-*); `transparent` is therefore absent from its categories. */
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
    flex: FlexClassMapper;
    shrink: ShrinkClassMapper;
  };
}
