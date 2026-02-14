import { defaultSizedLayoutClassMappers, layoutClassMappers, bgAppearance, textAppearance, borderAppearance } from "../theme/common";
import type { GridTheme } from "./GridTheme";
import { WrapClassMapper, DirectionClassMapper, RadiusClassMapper, BorderClassMapper } from "../theme/layout";
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
