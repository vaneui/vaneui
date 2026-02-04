import { defaultLayoutsThemes } from "./ComponentTheme";
import { PxTheme } from "../size/pxTheme";
import { PyTheme } from "../size/pyTheme";
import { GapTheme } from "../size/gapTheme";
import { WrapTheme } from "../layout/wrapTheme";
import { DirectionTheme } from "../layout/directionTheme";
import { BorderTheme } from "../layout/borderTheme";
import { RingTheme } from "../layout/ringTheme";
import { RadiusTheme } from "../layout/radiusTheme";
import { SimpleConsumerTheme } from "../appearance/simpleConsumerTheme";
import { ShadowAppearanceTheme } from "../appearance/shadowAppearanceTheme";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass } from "../../classes/appearanceClasses";

/**
 * Shared sub-themes used by layout components (Card, Section, Container, Stack, Row, Col).
 * Individual components may extend or override specific themes as needed.
 */
export const layoutSubThemes = {
  size: {
    px: new PxTheme(),
    py: new PyTheme(),
    gap: new GapTheme(),
  },
  appearance: {
    background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
    text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
    border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
    ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
    shadow: ShadowAppearanceTheme.createLayoutTheme(),
  },
  layout: {
    ...defaultLayoutsThemes,
    wrap: new WrapTheme(),
    direction: new DirectionTheme(),
    border: new BorderTheme(),
    ring: new RingTheme(),
    radius: new RadiusTheme(),
  },
};
