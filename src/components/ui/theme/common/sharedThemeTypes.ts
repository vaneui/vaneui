import type { BaseTypographyComponentTheme, DefaultLayoutThemes, BaseComponentTheme } from "./ComponentTheme";
import type { FontSizeTheme } from "../size/fontSizeTheme";
import type { LineHeightTheme } from "../size/lineHeightTheme";
import type { GapTheme } from "../size/gapTheme";
import type { PxTheme } from "../size/pxTheme";
import type { PyTheme } from "../size/pyTheme";
import type { BreakpointTheme } from "../size/breakpointTheme";
import type { RadiusTheme } from "../layout/radiusTheme";
import type { BorderTheme } from "../layout/borderTheme";
import type { RingTheme } from "../layout/ringTheme";
import type { FocusVisibleTheme } from "../layout/focusVisibleTheme";
import type { WrapTheme } from "../layout/wrapTheme";
import type { DirectionTheme } from "../layout/directionTheme";
import type { CursorTheme } from "../layout/cursorTheme";
import type { TransitionTheme } from "../layout/transitionTheme";
import type { WhitespaceTheme } from "../layout/whitespaceTheme";
import type { WidthTheme } from "../layout/widthTheme";
import type { HeightTheme } from "../layout/heightTheme";
import type { SimpleConsumerTheme } from "../appearance/simpleConsumerTheme";
import type { ShadowAppearanceTheme } from "../appearance/shadowAppearanceTheme";
import type { TextAlignTheme } from "../typography/textAlignTheme";

/**
 * Size theme structure for interactive components (Button, Badge, Chip).
 */
export interface InteractiveSizeTheme {
  px: PxTheme;
  py: PyTheme;
  text: FontSizeTheme;
  lineHeight: LineHeightTheme;
  gap: GapTheme;
}

/**
 * Appearance theme structure for interactive components.
 */
export interface InteractiveAppearanceTheme {
  background: SimpleConsumerTheme;
  text: SimpleConsumerTheme;
  border: SimpleConsumerTheme;
  ring: SimpleConsumerTheme;
  focusVisible: SimpleConsumerTheme;
  shadow: ShadowAppearanceTheme;
}

/**
 * Layout theme structure for interactive components.
 */
export interface InteractiveLayoutTheme extends DefaultLayoutThemes {
  border: BorderTheme;
  ring: RingTheme;
  focusVisible: FocusVisibleTheme;
  radius: RadiusTheme;
  wrap: WrapTheme;
  flexDirection: DirectionTheme;
  cursor: CursorTheme;
  transition: TransitionTheme;
  whitespace: WhitespaceTheme;
  width: WidthTheme;
  height: HeightTheme;
}

/**
 * Shared theme interface for interactive components (Badge, Chip, Code, Button).
 */
export interface InteractiveComponentTheme extends BaseTypographyComponentTheme {
  size: InteractiveSizeTheme;
  appearance: InteractiveAppearanceTheme;
  layout: InteractiveLayoutTheme;
}

/**
 * Layout theme for Button component.
 * @deprecated Use InteractiveLayoutTheme instead - cursor is now included in base theme.
 */
export type ButtonLayoutTheme = InteractiveLayoutTheme;

/**
 * Size theme structure for layout components (Card, Section, Container, Stack, Row, Col).
 */
export interface LayoutSizeTheme {
  px: PxTheme;
  py: PyTheme;
  gap: GapTheme;
}

/**
 * Appearance theme structure for layout components.
 */
export interface LayoutAppearanceTheme {
  background: SimpleConsumerTheme;
  text: SimpleConsumerTheme;
  border: SimpleConsumerTheme;
  ring: SimpleConsumerTheme;
  shadow: ShadowAppearanceTheme;
}

/**
 * Layout theme structure for layout components.
 */
export interface LayoutLayoutTheme extends DefaultLayoutThemes {
  wrap: WrapTheme;
  direction: DirectionTheme;
  border: BorderTheme;
  ring: RingTheme;
  radius: RadiusTheme;
}

/**
 * Shared theme interface for basic flex layout components (Col).
 */
export interface BasicFlexLayoutComponentTheme extends BaseComponentTheme {
  size: LayoutSizeTheme;
  appearance: LayoutAppearanceTheme;
  layout: LayoutLayoutTheme;
  typography: { textAlign: TextAlignTheme };
}

/**
 * Shared theme interface for layout components with breakpoint support (Stack, Row).
 */
export interface FlexLayoutComponentTheme extends BaseComponentTheme {
  size: LayoutSizeTheme & { breakpoint: BreakpointTheme };
  appearance: LayoutAppearanceTheme;
  layout: LayoutLayoutTheme;
  typography: { textAlign: TextAlignTheme };
}
