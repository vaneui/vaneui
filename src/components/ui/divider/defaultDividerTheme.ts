import {
  ComponentTheme,
  defaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { DividerProps } from "./DividerProps";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import { PyClassMapper } from "../theme/size/pyClassMapper";
import { OrientationClassMapper } from "../theme/layout/orientationClassMapper";
import { WidthClassMapper } from "../theme/layout/widthClassMapper";
import { HeightClassMapper } from "../theme/layout/heightClassMapper";
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
      width: new WidthClassMapper(),
      height: new HeightClassMapper(),
    },
  },
  dividerDefaults,
  DIVIDER_CATEGORIES,
  undefined,
  'layout'
);
