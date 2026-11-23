import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { InputSectionProps } from "./InputSectionProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { FontSizeClassMapper, GapClassMapper } from "../theme/size";
import { PointerEventsClassMapper, WhitespaceClassMapper } from "../theme/layout";
import { INPUT_SECTION_CATEGORIES } from "./InputSectionCategories";
import type { InputSectionTheme } from "./InputSectionTheme";
import { inputSectionDefaults } from "./inputSectionDefaults";

// The startSection / endSection slot of Input and Select: an icon, a unit or prefix, or a
// small button, overlaid on the field's edge. It takes the field's resolved size and the
// field's size ramp (rules.css), so its inset and text size track the field. The field
// reserves the measured width of the section (see the unlayered block in rules.css).
// Clicks on the section fall through to the field; a button or link inside it stays clickable.
export const defaultInputSectionTheme = new ComponentTheme<InputSectionProps, InputSectionTheme>(
  "span",
  "vane-input-section inset-y-0 data-[side=start]:start-0 data-[side=start]:ps-[calc(var(--px)*2/3)] data-[side=end]:end-0 data-[side=end]:pe-[calc(var(--px)*2/3)]",
  {
    size: {
      text: new FontSizeClassMapper(),
      gap: new GapClassMapper(),
    },
    appearance: {
      color: new SimpleConsumerClassMapper({ base: "text-(--color-text-secondary)", alwaysOutput: true }, 'text'),
    },
    layout: {
      ...defaultLayoutClassMappers,
      pointerEvents: new PointerEventsClassMapper(),
      whitespace: new WhitespaceClassMapper(),
    },
  },
  inputSectionDefaults,
  INPUT_SECTION_CATEGORIES,
  undefined,
  'ui'
);
