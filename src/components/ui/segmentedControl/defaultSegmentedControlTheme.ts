import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { SegmentedControlProps } from "./SegmentedControlProps";
import type { SegmentedControlTheme } from "./SegmentedControlTheme";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { MarginClassMapper, PxClassMapper, PyClassMapper } from "../theme/size";
import { RadiusClassMapper, WidthClassMapper } from "../theme/layout";
import { SEGMENTED_CONTROL_CATEGORIES } from "./SegmentedControlCategories";
import { segmentedControlDefaults } from "./segmentedControlDefaults";

// The track: a neutral surface whatever the appearance, which colors the selected segment.
// Its padding and corners follow the size (rules.css), so the control is as tall as a Button.
export const defaultSegmentedControlTheme = new ComponentTheme<SegmentedControlProps, SegmentedControlTheme>(
  "div",
  "vane-segmented-control",
  {
    size: {
      px: new PxClassMapper(),
      py: new PyClassMapper(),
      margin: new MarginClassMapper(),
    },
    appearance: {
      background: new SimpleConsumerClassMapper({ base: 'bg-(--color-bg-tertiary)', alwaysOutput: true }, 'bg'),
    },
    layout: {
      ...defaultLayoutClassMappers,
      width: new WidthClassMapper(),
      radius: new RadiusClassMapper(),
    },
  },
  segmentedControlDefaults,
  SEGMENTED_CONTROL_CATEGORIES,
  undefined,
  'ui'
);
