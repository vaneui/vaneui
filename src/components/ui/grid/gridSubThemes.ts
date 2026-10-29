import { defaultSizedLayoutClassMappers, layoutClassMappers, bgAppearance, textAppearance, borderAppearance } from "../theme/common";
import type { GridTheme } from "./GridTheme";
import { WrapClassMapper, DirectionClassMapper, RadiusClassMapper, BorderClassMapper, FlexClassMapper, ShrinkClassMapper, PointerEventsClassMapper, WhitespaceClassMapper, DividedClassMapper } from "../theme/layout";
import { StrongBorderClassMapper } from "../theme/appearance";
import type { DeepPartial } from "../../utils/deepPartial";

/** Shared sub-themes used by all Grid components (Grid2-Grid6) */
export const gridSubThemes: DeepPartial<GridTheme> = {
  size: layoutClassMappers.size,
  appearance: {
    background: bgAppearance,
    text: textAppearance,
    border: borderAppearance,
    strongBorder: new StrongBorderClassMapper(),
  },
  layout: {
    ...defaultSizedLayoutClassMappers,
    wrap: new WrapClassMapper(),
    flexDirection: new DirectionClassMapper(),
    radius: new RadiusClassMapper(),
    border: new BorderClassMapper(),
    flex: new FlexClassMapper(),
    shrink: new ShrinkClassMapper(),
    pointerEvents: new PointerEventsClassMapper(),
    whitespace: new WhitespaceClassMapper(),
    divided: new DividedClassMapper(),
  },
};
