import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { SegmentedControlItemProps } from "./SegmentedControlItemProps";
import type { SegmentedControlItemTheme } from "./SegmentedControlTheme";
import { DisabledVisualClassMapper } from "../theme/appearance";
import { FontSizeClassMapper, GapClassMapper, LineHeightClassMapper, PxClassMapper, PyClassMapper } from "../theme/size";
import { CursorClassMapper, RadiusClassMapper, TransitionClassMapper, WhitespaceClassMapper } from "../theme/layout";
import { FontFamilyClassMapper, FontStyleClassMapper, FontWeightClassMapper, TextDecorationClassMapper, TextTransformClassMapper } from "../theme/typography";
import { SEGMENTED_CONTROL_ITEM_CATEGORIES } from "./SegmentedControlCategories";
import { segmentedControlItemDefaults } from "./segmentedControlItemDefaults";

// A segment: a <label> around a radio that covers it unseen. The checked segment takes the
// surface and text color of its appearance and variant; the others show muted text on the
// track. Colors, the focus ring and the lines between segments are in rules.css. It grows
// with the track when the control is full width.
export const defaultSegmentedControlItemTheme = new ComponentTheme<SegmentedControlItemProps, SegmentedControlItemTheme>(
  "label",
  "vane-segmented-control-item grow min-h-(--min-h) [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    size: {
      px: new PxClassMapper(),
      py: new PyClassMapper(),
      gap: new GapClassMapper(),
      text: new FontSizeClassMapper(),
      lineHeight: new LineHeightClassMapper(),
    },
    appearance: {
      // the radio is natively disabled, so the segment keeps pointer events and shows the cursor
      disabled: new DisabledVisualClassMapper(),
    },
    layout: {
      ...defaultLayoutClassMappers,
      radius: new RadiusClassMapper(),
      cursor: new CursorClassMapper(),
      transition: new TransitionClassMapper(),
      whitespace: new WhitespaceClassMapper(),
    },
    typography: {
      fontFamily: new FontFamilyClassMapper(),
      fontWeight: new FontWeightClassMapper(),
      fontStyle: new FontStyleClassMapper(),
      textDecoration: new TextDecorationClassMapper(),
      textTransform: new TextTransformClassMapper(),
    },
  },
  segmentedControlItemDefaults,
  SEGMENTED_CONTROL_ITEM_CATEGORIES,
  undefined,
  'ui'
);
