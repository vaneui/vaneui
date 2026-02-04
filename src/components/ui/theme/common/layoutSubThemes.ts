import { defaultLayoutsThemes } from "./ComponentTheme";
import { PxClassMapper } from "../size/pxClassMapper";
import { PyClassMapper } from "../size/pyClassMapper";
import { GapClassMapper } from "../size/gapClassMapper";
import { WrapClassMapper } from "../layout/wrapClassMapper";
import { DirectionClassMapper } from "../layout/directionClassMapper";
import { BorderClassMapper } from "../layout/borderClassMapper";
import { RingClassMapper } from "../layout/ringClassMapper";
import { RadiusClassMapper } from "../layout/radiusClassMapper";
import { SimpleConsumerClassMapper } from "../appearance/simpleConsumerClassMapper";
import { ShadowAppearanceClassMapper } from "../appearance/shadowAppearanceClassMapper";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass } from "../../classes/appearanceClasses";

/**
 * Shared sub-themes used by layout components (Card, Section, Container, Stack, Row, Col).
 * Individual components may extend or override specific themes as needed.
 */
export const layoutSubThemes = {
  size: {
    px: new PxClassMapper(),
    py: new PyClassMapper(),
    gap: new GapClassMapper(),
  },
  appearance: {
    background: new SimpleConsumerClassMapper({ base: bgConsumerClasses.base }, 'bg'),
    text: new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text'),
    border: new SimpleConsumerClassMapper({ base: borderConsumerClass }, 'border'),
    ring: new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring'),
    shadow: ShadowAppearanceClassMapper.createLayoutTheme(),
  },
  layout: {
    ...defaultLayoutsThemes,
    wrap: new WrapClassMapper(),
    direction: new DirectionClassMapper(),
    border: new BorderClassMapper(),
    ring: new RingClassMapper(),
    radius: new RadiusClassMapper(),
  },
};
