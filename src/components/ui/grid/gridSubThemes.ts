import { defaultSizedLayoutClassMappers } from "../theme/common/ComponentTheme";
import type { GridTheme } from "./GridTheme";
import { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import { BorderClassMapper } from "../theme/layout/borderClassMapper";
import { layoutClassMappers } from "../theme/common/layoutClassMappers";
import { bgAppearance, textAppearance, borderAppearance } from "../theme/common/appearanceClassMappers";
import type { DeepPartial } from "../../utils/deepPartial";

/** Shared sub-themes used by all Grid components (Grid2-Grid6) */
export const gridSubThemes: DeepPartial<GridTheme> = {
  size: layoutClassMappers.size,
  appearance: {
    background: bgAppearance,
    text: textAppearance,
    border: borderAppearance,
  },
  layout: {
    ...defaultSizedLayoutClassMappers,
    wrap: new WrapClassMapper(),
    flexDirection: new DirectionClassMapper(),
    radius: new RadiusClassMapper(),
    border: new BorderClassMapper(),
  },
};
