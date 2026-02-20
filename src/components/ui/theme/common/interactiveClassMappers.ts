import { defaultSizedLayoutClassMappers, defaultTypographyClassMappers } from "./ComponentTheme";
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
import { bgAppearance, textAppearance, borderAppearance, ringAppearance, focusVisibleAppearance, shadowAppearance } from "./appearanceClassMappers";
import { DisabledClassMapper } from "../appearance/disabledClassMapper";

/**
 * Shared sub-themes used by interactive components (Badge, Chip, Code).
 * Button extends this with additional hover/active states.
 */
export const interactiveClassMappers = {
  size: {
    px: new PxClassMapper(),
    py: new PyClassMapper(),
    gap: new GapClassMapper(),
    text: new FontSizeClassMapper(),
    lineHeight: new LineHeightClassMapper(),
  },
  appearance: {
    background: bgAppearance,
    text: textAppearance,
    border: borderAppearance,
    ring: ringAppearance,
    focusVisible: focusVisibleAppearance,
    shadow: shadowAppearance,
    disabled: new DisabledClassMapper(),
  },
  layout: {
    ...defaultSizedLayoutClassMappers,
    border: new BorderClassMapper(),
    ring: new RingClassMapper(),
    focusVisible: new FocusVisibleClassMapper(),
    radius: new RadiusClassMapper(),
    wrap: new WrapClassMapper(),
    flexDirection: new DirectionClassMapper(),
    cursor: new CursorClassMapper(),
    transition: new TransitionClassMapper(),
    whitespace: new WhitespaceClassMapper(),
  },
  typography: defaultTypographyClassMappers,
};
