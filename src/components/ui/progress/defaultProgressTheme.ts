import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { ProgressProps } from "./ProgressProps";
import type { ProgressTheme } from "./ProgressTheme";
import { FlexClassMapper, RadiusClassMapper, WidthClassMapper } from "../theme/layout";
import { MarginClassMapper } from "../theme/size";
import { PROGRESS_CATEGORIES } from "./ProgressCategories";
import { progressDefaults } from "./progressDefaults";

export const defaultProgressTheme = new ComponentTheme<ProgressProps, ProgressTheme>(
  "div",
  "vane-progress",
  {
    size: {
      margin: new MarginClassMapper(),
    },
    layout: {
      ...defaultLayoutClassMappers,
      width: new WidthClassMapper(),
      flex: new FlexClassMapper(),
      radius: new RadiusClassMapper(),
    },
  },
  progressDefaults,
  PROGRESS_CATEGORIES,
  undefined,
  'ui'
);
