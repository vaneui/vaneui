import { defaultLayoutsThemes, defaultTypographyThemes } from "./ComponentTheme";
import { FontSizeTheme } from "../size/fontSizeTheme";
import { LineHeightTheme } from "../size/lineHeightTheme";
import { PxTheme } from "../size/pxTheme";
import { PyTheme } from "../size/pyTheme";
import { GapTheme } from "../size/gapTheme";
import { RadiusTheme } from "../layout/radiusTheme";
import { BorderTheme } from "../layout/borderTheme";
import { RingTheme } from "../layout/ringTheme";
import { FocusVisibleTheme } from "../layout/focusVisibleTheme";
import { WrapTheme } from "../layout/wrapTheme";
import { DirectionTheme } from "../layout/directionTheme";
import { CursorTheme } from "../layout/cursorTheme";
import { TransitionTheme } from "../layout/transitionTheme";
import { WhitespaceTheme } from "../layout/whitespaceTheme";
import { WidthTheme } from "../layout/widthTheme";
import { HeightTheme } from "../layout/heightTheme";
import { SimpleConsumerTheme } from "../appearance/simpleConsumerTheme";
import { ShadowAppearanceTheme } from "../appearance/shadowAppearanceTheme";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass, focusVisibleConsumerClass } from "../../classes/appearanceClasses";

/**
 * Shared sub-themes used by interactive components (Badge, Chip, Code).
 * Button extends this with additional hover/active states.
 */
export const interactiveSubThemes = {
  size: {
    px: new PxTheme(),
    py: new PyTheme(),
    gap: new GapTheme(),
    text: new FontSizeTheme(),
    lineHeight: new LineHeightTheme(),
  },
  appearance: {
    background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
    text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
    border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
    ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
    focusVisible: new SimpleConsumerTheme({ base: focusVisibleConsumerClass }, 'focusVisible'),
    shadow: ShadowAppearanceTheme.createLayoutTheme(),
  },
  layout: {
    ...defaultLayoutsThemes,
    border: new BorderTheme(),
    ring: new RingTheme(),
    focusVisible: new FocusVisibleTheme(),
    radius: new RadiusTheme(),
    wrap: new WrapTheme(),
    flexDirection: new DirectionTheme(),
    cursor: new CursorTheme(),
    transition: new TransitionTheme(),
    whitespace: new WhitespaceTheme(),
    width: new WidthTheme(),
    height: new HeightTheme(),
  },
  typography: defaultTypographyThemes,
};
