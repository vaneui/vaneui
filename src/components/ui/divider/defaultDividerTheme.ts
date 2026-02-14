import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { DividerProps } from "./DividerProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { PyClassMapper } from "../theme/size";
import { OrientationClassMapper, WidthClassMapper, HeightClassMapper } from "../theme/layout";
import { DIVIDER_CATEGORIES } from "./DividerCategories";
import type { DividerTheme } from "./DividerTheme";
import { dividerDefaults } from "./dividerDefaults";

export const defaultDividerTheme = new ComponentTheme<DividerProps, DividerTheme>(
  "div",
  "vane-divider",
  {
    size: {
      py: new PyClassMapper(), // Uses layout spacing by default
    },
    appearance: {
      // CSS-based approach: uses --border-color variable for divider background
      background: new SimpleConsumerClassMapper({ base: 'bg-(--border-color)' }, 'bg'),
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
