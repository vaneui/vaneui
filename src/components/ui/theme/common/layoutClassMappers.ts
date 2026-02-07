import { defaultSizedLayoutClassMappers } from "./ComponentTheme";
import { PxClassMapper } from "../size/pxClassMapper";
import { PyClassMapper } from "../size/pyClassMapper";
import { GapClassMapper } from "../size/gapClassMapper";
import { WrapClassMapper } from "../layout/wrapClassMapper";
import { DirectionClassMapper } from "../layout/directionClassMapper";
import { BorderClassMapper } from "../layout/borderClassMapper";
import { RingClassMapper } from "../layout/ringClassMapper";
import { RadiusClassMapper } from "../layout/radiusClassMapper";
import { bgAppearance, textAppearance, borderAppearance, ringAppearance, shadowLayoutAppearance } from "./appearanceClassMappers";

/**
 * Shared sub-themes used by layout components (Card, Section, Container, Stack, Row, Col).
 * Individual components may extend or override specific themes as needed.
 */
export const layoutClassMappers = {
  size: {
    px: new PxClassMapper(),
    py: new PyClassMapper(),
    gap: new GapClassMapper(),
  },
  appearance: {
    background: bgAppearance,
    text: textAppearance,
    border: borderAppearance,
    ring: ringAppearance,
    shadow: shadowLayoutAppearance,
  },
  layout: {
    ...defaultSizedLayoutClassMappers,
    wrap: new WrapClassMapper(),
    direction: new DirectionClassMapper(),
    border: new BorderClassMapper(),
    ring: new RingClassMapper(),
    radius: new RadiusClassMapper(),
  },
};
