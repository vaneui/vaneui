import type { BaseTypographyComponentTheme, DefaultSizedLayoutClassMappers, BaseComponentTheme } from "./ComponentTheme";
import type { FontSizeClassMapper } from "../size/fontSizeClassMapper";
import type { LineHeightClassMapper } from "../size/lineHeightClassMapper";
import type { GapClassMapper } from "../size/gapClassMapper";
import type { PxClassMapper } from "../size/pxClassMapper";
import type { PyClassMapper } from "../size/pyClassMapper";
import type { BreakpointClassMapper } from "../size/breakpointClassMapper";
import type { RadiusClassMapper } from "../layout/radiusClassMapper";
import type { BorderClassMapper } from "../layout/borderClassMapper";
import type { RingClassMapper } from "../layout/ringClassMapper";
import type { FocusVisibleClassMapper } from "../layout/focusVisibleClassMapper";
import type { WrapClassMapper } from "../layout/wrapClassMapper";
import type { DirectionClassMapper } from "../layout/directionClassMapper";
import type { CursorClassMapper } from "../layout/cursorClassMapper";
import type { TransitionClassMapper } from "../layout/transitionClassMapper";
import type { WhitespaceClassMapper } from "../layout/whitespaceClassMapper";
import type { FlexClassMapper } from "../layout/flexClassMapper";
import type { ShrinkClassMapper } from "../layout/shrinkClassMapper";
import type { SimpleConsumerClassMapper } from "../appearance/simpleConsumerClassMapper";
import type { ShadowAppearanceClassMapper } from "../appearance/shadowAppearanceClassMapper";
import type { DisabledClassMapper } from "../appearance/disabledClassMapper";
import type { TextAlignClassMapper } from "../typography/textAlignClassMapper";

export interface InteractiveSizeClassMapper {
  px: PxClassMapper;
  py: PyClassMapper;
  text: FontSizeClassMapper;
  lineHeight: LineHeightClassMapper;
  gap: GapClassMapper;
}

export interface InteractiveAppearanceClassMappers {
  background: SimpleConsumerClassMapper;
  text: SimpleConsumerClassMapper;
  border: SimpleConsumerClassMapper;
  ring: SimpleConsumerClassMapper;
  focusVisible: SimpleConsumerClassMapper;
  shadow: ShadowAppearanceClassMapper;
  disabled: DisabledClassMapper;
}

export interface InteractiveLayoutClassMappers extends DefaultSizedLayoutClassMappers {
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
}

export interface InteractiveComponentTheme extends BaseTypographyComponentTheme {
  size: InteractiveSizeClassMapper;
  appearance: InteractiveAppearanceClassMappers;
  layout: InteractiveLayoutClassMappers;
}

/** @deprecated Use InteractiveLayoutClassMappers — cursor now included in base. */
export type ButtonLayoutClassMappers = InteractiveLayoutClassMappers;

export interface LayoutSizeClassMapper {
  px: PxClassMapper;
  py: PyClassMapper;
  gap: GapClassMapper;
}

export interface LayoutAppearanceClassMappers {
  background: SimpleConsumerClassMapper;
  text: SimpleConsumerClassMapper;
  border: SimpleConsumerClassMapper;
  ring: SimpleConsumerClassMapper;
  shadow: ShadowAppearanceClassMapper;
}

export interface LayoutLayoutClassMappers extends DefaultSizedLayoutClassMappers {
  wrap: WrapClassMapper;
  direction: DirectionClassMapper;
  border: BorderClassMapper;
  ring: RingClassMapper;
  radius: RadiusClassMapper;
  flex: FlexClassMapper;
  shrink: ShrinkClassMapper;
}

export interface BasicFlexLayoutComponentTheme extends BaseComponentTheme {
  size: LayoutSizeClassMapper;
  appearance: LayoutAppearanceClassMappers;
  layout: LayoutLayoutClassMappers;
  typography: { textAlign: TextAlignClassMapper };
}

// breakpoint support adds responsive flex-direction switching (Stack, Row)
export interface FlexLayoutComponentTheme extends BaseComponentTheme {
  size: LayoutSizeClassMapper & { breakpoint: BreakpointClassMapper };
  appearance: LayoutAppearanceClassMappers;
  layout: LayoutLayoutClassMappers;
  typography: { textAlign: TextAlignClassMapper };
}
