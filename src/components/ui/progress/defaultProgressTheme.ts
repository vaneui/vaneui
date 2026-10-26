import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { ProgressProps } from "./ProgressProps";
import type { ProgressTheme } from "./ProgressTheme";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { FlexClassMapper, OverflowClassMapper, RadiusClassMapper, TransitionClassMapper, WidthClassMapper } from "../theme/layout";
import { MarginClassMapper } from "../theme/size";
import { PROGRESS_CATEGORIES } from "./ProgressCategories";
import { progressDefaults } from "./progressDefaults";

export const defaultProgressTheme = new ComponentTheme<ProgressProps, ProgressTheme>(
  "div",
  "vane-progress h-(--size)",
  {
    size: {
      margin: new MarginClassMapper(),
    },
    appearance: {
      // a neutral track whatever the appearance; the fill carries the color
      background: new SimpleConsumerClassMapper({ base: 'bg-(--color-border-primary)', alwaysOutput: true }, 'bg'),
    },
    layout: {
      ...defaultLayoutClassMappers,
      width: new WidthClassMapper(),
      flex: new FlexClassMapper(),
      radius: new RadiusClassMapper(),
      overflow: new OverflowClassMapper(),
      transition: new TransitionClassMapper(),
    },
  },
  progressDefaults,
  PROGRESS_CATEGORIES,
  undefined,
  'ui'
);
