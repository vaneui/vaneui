import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { ProgressFillProps } from "./ProgressFillProps";
import type { ProgressFillTheme } from "./ProgressFillTheme";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { HeightClassMapper, RadiusClassMapper, TransitionClassMapper, WidthClassMapper } from "../theme/layout";
import { bgConsumerClasses } from "../classes/appearanceClasses";
import { PROGRESS_FILL_CATEGORIES } from "./ProgressFillCategories";
import { progressFillDefaults } from "./progressFillDefaults";

// a full-width bar slid back by the unfilled share (--progress is the 0..1 ratio set on the track), from the end in RTL
const slideClasses = "-translate-x-[calc(100%_-_var(--progress,0)_*_100%)] rtl:translate-x-[calc(100%_-_var(--progress,0)_*_100%)]";

export const defaultProgressFillTheme = new ComponentTheme<ProgressFillProps, ProgressFillTheme>(
  "div",
  `vane-progress-fill ${slideClasses}`,
  {
    appearance: {
      background: new SimpleConsumerClassMapper({ base: bgConsumerClasses.base, alwaysOutput: true }, 'bg'),
    },
    layout: {
      ...defaultLayoutClassMappers,
      width: new WidthClassMapper(),
      height: new HeightClassMapper(),
      radius: new RadiusClassMapper(),
      transition: new TransitionClassMapper(),
    },
  },
  progressFillDefaults,
  PROGRESS_FILL_CATEGORIES,
  undefined,
  'ui'
);
