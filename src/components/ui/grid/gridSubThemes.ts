import { defaultLayoutsThemes } from "../theme/common/ComponentTheme";
import type { GridTheme } from "./GridTheme";
import { GapTheme } from "../theme/size/gapTheme";
import { PxTheme } from "../theme/size/pxTheme";
import { PyTheme } from "../theme/size/pyTheme";
import { WrapTheme } from "../theme/layout/wrapTheme";
import { DirectionTheme } from "../theme/layout/directionTheme";
import { RadiusTheme } from "../theme/layout/radiusTheme";
import { BorderTheme } from "../theme/layout/borderTheme";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass } from "../classes/appearanceClasses";
import type { DeepPartial } from "../../utils/deepPartial";

/** Shared sub-themes used by all Grid components (Grid2-Grid6) */
export const gridSubThemes: DeepPartial<GridTheme> = {
  size: {
    px: new PxTheme(),
    py: new PyTheme(),
    gap: new GapTheme(),
  },
  appearance: {
    background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
    text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
    border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
  },
  layout: {
    ...defaultLayoutsThemes,
    wrap: new WrapTheme(),
    flexDirection: new DirectionTheme(),
    radius: new RadiusTheme(),
    border: new BorderTheme(),
  },
};
