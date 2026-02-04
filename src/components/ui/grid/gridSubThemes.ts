import { defaultLayoutsThemes } from "../theme/common/ComponentTheme";
import type { GridTheme } from "./GridTheme";
import { GapClassMapper } from "../theme/size/gapClassMapper";
import { PxClassMapper } from "../theme/size/pxClassMapper";
import { PyClassMapper } from "../theme/size/pyClassMapper";
import { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import { BorderClassMapper } from "../theme/layout/borderClassMapper";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass } from "../classes/appearanceClasses";
import type { DeepPartial } from "../../utils/deepPartial";

/** Shared sub-themes used by all Grid components (Grid2-Grid6) */
export const gridSubThemes: DeepPartial<GridTheme> = {
  size: {
    px: new PxClassMapper(),
    py: new PyClassMapper(),
    gap: new GapClassMapper(),
  },
  appearance: {
    background: new SimpleConsumerClassMapper({ base: bgConsumerClasses.base }, 'bg'),
    text: new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text'),
    border: new SimpleConsumerClassMapper({ base: borderConsumerClass }, 'border'),
  },
  layout: {
    ...defaultLayoutsThemes,
    wrap: new WrapClassMapper(),
    flexDirection: new DirectionClassMapper(),
    radius: new RadiusClassMapper(),
    border: new BorderClassMapper(),
  },
};
