import type { BaseTypographyComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { BorderClassMapper, RingClassMapper, FocusVisibleClassMapper, RadiusClassMapper, WrapClassMapper, DirectionClassMapper, CursorClassMapper, TransitionClassMapper, WhitespaceClassMapper } from "../theme/layout";
import type { PxClassMapper, PyClassMapper, GapClassMapper, FontSizeClassMapper, LineHeightClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";

/**
 * MenuLabel theme — non-interactive presentational heading.
 *
 * Intentionally has NO `background` mapper. MenuLabel renders a section
 * heading inside a menu and inherits the menu's background. Adding a
 * background classes here would conflict with the existing design tests
 * that assert MenuLabel never emits `bg-*` classes.
 *
 * Because there's no background, `transparent` has no meaning here and is
 * NOT in `MENU_LABEL_CATEGORIES`.
 */
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
