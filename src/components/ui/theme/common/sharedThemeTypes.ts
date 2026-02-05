import type { BaseTypographyComponentTheme, DefaultLayoutClassMappers, BaseComponentTheme } from "./ComponentTheme";
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
import type { WidthClassMapper } from "../layout/widthClassMapper";
import type { HeightClassMapper } from "../layout/heightClassMapper";
import type { SimpleConsumerClassMapper } from "../appearance/simpleConsumerClassMapper";
import type { ShadowAppearanceClassMapper } from "../appearance/shadowAppearanceClassMapper";
import type { TextAlignClassMapper } from "../typography/textAlignClassMapper";

/**
 * Size theme structure for interactive components (Button, Badge, Chip).
 */
export interface InteractiveSizeClassMapper {
  px: PxClassMapper;
  py: PyClassMapper;
  text: FontSizeClassMapper;
  lineHeight: LineHeightClassMapper;
  gap: GapClassMapper;
}

/**
 * Appearance theme structure for interactive components.
 */
export interface InteractiveAppearanceClassMappers {
  background: SimpleConsumerClassMapper;
  text: SimpleConsumerClassMapper;
  border: SimpleConsumerClassMapper;
  ring: SimpleConsumerClassMapper;
  focusVisible: SimpleConsumerClassMapper;
  shadow: ShadowAppearanceClassMapper;
}

/**
 * Layout theme structure for interactive components.
 */
export interface InteractiveLayoutClassMappers extends DefaultLayoutClassMappers {
  border: BorderClassMapper;
  ring: RingClassMapper;
  focusVisible: FocusVisibleClassMapper;
  radius: RadiusClassMapper;
  wrap: WrapClassMapper;
  flexDirection: DirectionClassMapper;
  cursor: CursorClassMapper;
  transition: TransitionClassMapper;
  whitespace: WhitespaceClassMapper;
  width: WidthClassMapper;
  height: HeightClassMapper;
}

/**
 * Shared theme interface for interactive components (Badge, Chip, Code, Button).
 */
export interface InteractiveComponentTheme extends BaseTypographyComponentTheme {
  size: InteractiveSizeClassMapper;
  appearance: InteractiveAppearanceClassMappers;
  layout: InteractiveLayoutClassMappers;
}

/**
 * Layout theme for Button component.
 * @deprecated Use InteractiveLayoutClassMappers instead - cursor is now included in base theme.
 */
export type ButtonLayoutClassMappers = InteractiveLayoutClassMappers;

/**
 * Size theme structure for layout components (Card, Section, Container, Stack, Row, Col).
 */
export interface LayoutSizeClassMapper {
  px: PxClassMapper;
  py: PyClassMapper;
  gap: GapClassMapper;
}

/**
 * Appearance theme structure for layout components.
 */
export interface LayoutAppearanceClassMappers {
  background: SimpleConsumerClassMapper;
  text: SimpleConsumerClassMapper;
  border: SimpleConsumerClassMapper;
  ring: SimpleConsumerClassMapper;
  shadow: ShadowAppearanceClassMapper;
}

/**
 * Layout theme structure for layout components.
 */
export interface LayoutLayoutClassMappers extends DefaultLayoutClassMappers {
  wrap: WrapClassMapper;
  direction: DirectionClassMapper;
  border: BorderClassMapper;
  ring: RingClassMapper;
  radius: RadiusClassMapper;
}

/**
 * Shared theme interface for basic flex layout components (Col).
 */
export interface BasicFlexLayoutComponentTheme extends BaseComponentTheme {
  size: LayoutSizeClassMapper;
  appearance: LayoutAppearanceClassMappers;
  layout: LayoutLayoutClassMappers;
  typography: { textAlign: TextAlignClassMapper };
}

/**
 * Shared theme interface for layout components with breakpoint support (Stack, Row).
 */
export interface FlexLayoutComponentTheme extends BaseComponentTheme {
  size: LayoutSizeClassMapper & { breakpoint: BreakpointClassMapper };
  appearance: LayoutAppearanceClassMappers;
  layout: LayoutLayoutClassMappers;
  typography: { textAlign: TextAlignClassMapper };
}
