import { defaultLayoutsThemes, defaultTypographyThemes } from "./ComponentTheme";
import { FontSizeClassMapper } from "../size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../size/lineHeightClassMapper";
import { PxClassMapper } from "../size/pxClassMapper";
import { PyClassMapper } from "../size/pyClassMapper";
import { GapClassMapper } from "../size/gapClassMapper";
import { RadiusClassMapper } from "../layout/radiusClassMapper";
import { BorderClassMapper } from "../layout/borderClassMapper";
import { RingClassMapper } from "../layout/ringClassMapper";
import { FocusVisibleClassMapper } from "../layout/focusVisibleClassMapper";
import { WrapClassMapper } from "../layout/wrapClassMapper";
import { DirectionClassMapper } from "../layout/directionClassMapper";
import { CursorClassMapper } from "../layout/cursorClassMapper";
import { TransitionClassMapper } from "../layout/transitionClassMapper";
import { WhitespaceClassMapper } from "../layout/whitespaceClassMapper";
import { WidthClassMapper } from "../layout/widthClassMapper";
import { HeightClassMapper } from "../layout/heightClassMapper";
import { SimpleConsumerClassMapper } from "../appearance/simpleConsumerClassMapper";
import { ShadowAppearanceClassMapper } from "../appearance/shadowAppearanceClassMapper";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass, focusVisibleConsumerClass } from "../../classes/appearanceClasses";

/**
 * Shared sub-themes used by interactive components (Badge, Chip, Code).
 * Button extends this with additional hover/active states.
 */
export const interactiveSubThemes = {
  size: {
    px: new PxClassMapper(),
    py: new PyClassMapper(),
    gap: new GapClassMapper(),
    text: new FontSizeClassMapper(),
    lineHeight: new LineHeightClassMapper(),
  },
  appearance: {
    background: new SimpleConsumerClassMapper({ base: bgConsumerClasses.base }, 'bg'),
    text: new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text'),
    border: new SimpleConsumerClassMapper({ base: borderConsumerClass }, 'border'),
    ring: new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring'),
    focusVisible: new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass }, 'focusVisible'),
    shadow: ShadowAppearanceClassMapper.createLayoutTheme(),
  },
  layout: {
    ...defaultLayoutsThemes,
    border: new BorderClassMapper(),
    ring: new RingClassMapper(),
    focusVisible: new FocusVisibleClassMapper(),
    radius: new RadiusClassMapper(),
    wrap: new WrapClassMapper(),
    flexDirection: new DirectionClassMapper(),
    cursor: new CursorClassMapper(),
    transition: new TransitionClassMapper(),
    whitespace: new WhitespaceClassMapper(),
    width: new WidthClassMapper(),
    height: new HeightClassMapper(),
  },
  typography: defaultTypographyThemes,
};
