import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { DividerProps } from "./DividerProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { PyClassMapper, PxClassMapper } from "../theme/size";
import { OrientationClassMapper, WidthClassMapper, HeightClassMapper } from "../theme/layout";
import { dividerBgConsumerClass } from "../classes/appearanceClasses";
import { DIVIDER_CATEGORIES } from "./DividerCategories";
import type { DividerTheme } from "./DividerTheme";
import { dividerDefaults } from "./dividerDefaults";

export const defaultDividerTheme = new ComponentTheme<DividerProps, DividerTheme>(
  "div",
  "vane-divider box-content bg-clip-content",
  {
    size: {
      py: new PyClassMapper(),
      px: new PxClassMapper(),
    },
    appearance: {
      // Uses --divider-color variable (separate from --border-color for filled variant visibility)
      background: new SimpleConsumerClassMapper({ base: dividerBgConsumerClass }, 'bg'),
    },
    layout: {
      ...defaultLayoutClassMappers,
      orientation: new OrientationClassMapper(),
      // width/height must come AFTER orientation so twMerge resolves correctly
      // (orientation generates w-full/h-full, width/height props should override)
      width: new WidthClassMapper(),
      height: new HeightClassMapper(),
    },
  },
  dividerDefaults,
  DIVIDER_CATEGORIES,
  undefined,
  'layout'
);
