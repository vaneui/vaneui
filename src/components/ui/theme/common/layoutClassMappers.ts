import { defaultSizedLayoutClassMappers } from "./ComponentTheme";
import { PxClassMapper } from "../size/pxClassMapper";
import { PyClassMapper } from "../size/pyClassMapper";
import { GapClassMapper } from "../size/gapClassMapper";
import { WrapClassMapper } from "../layout/wrapClassMapper";
import { DirectionClassMapper } from "../layout/directionClassMapper";
import { BorderClassMapper } from "../layout/borderClassMapper";
import { RingClassMapper } from "../layout/ringClassMapper";
import { RadiusClassMapper } from "../layout/radiusClassMapper";
import { FlexClassMapper } from "../layout/flexClassMapper";
import { ShrinkClassMapper } from "../layout/shrinkClassMapper";
import { bgAppearance, textAppearance, borderAppearance, ringAppearance, shadowAppearance } from "./appearanceClassMappers";

// shared by Card, Section, Container, Stack, Row, Col; individual components may extend/override
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
    shadow: shadowAppearance,
  },
  layout: {
    ...defaultSizedLayoutClassMappers,
    wrap: new WrapClassMapper(),
    direction: new DirectionClassMapper(),
    border: new BorderClassMapper(),
    ring: new RingClassMapper(),
    radius: new RadiusClassMapper(),
    flex: new FlexClassMapper(),
    shrink: new ShrinkClassMapper(),
  },
};
