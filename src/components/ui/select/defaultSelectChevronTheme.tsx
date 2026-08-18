import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { SelectChevronProps } from "./SelectChevronProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { FontSizeClassMapper } from "../theme/size";
import { PointerEventsClassMapper } from "../theme/layout";
import { SELECT_CHEVRON_CATEGORIES } from "./SelectChevronCategories";
import type { SelectChevronTheme } from "./SelectChevronTheme";
import { selectChevronDefaults } from "./selectChevronDefaults";

// Decorative dropdown indicator: a themed element, so chevronElement is swappable via themeOverride.
export const defaultSelectChevronTheme = new ComponentTheme<SelectChevronProps, SelectChevronTheme>(
  "span",
  "vane-select-chevron inset-y-0 end-(--gap) [&>svg]:h-1/2 [&>svg]:w-auto",
  {
    chevronElement: () =>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>,
    size: {
      text: new FontSizeClassMapper(),
    },
    appearance: {
      color: new SimpleConsumerClassMapper({ base: "text-(--color-text-secondary)", alwaysOutput: true }, 'text'),
    },
    layout: {
      ...defaultLayoutClassMappers,
      pointerEvents: new PointerEventsClassMapper(),
    },
  },
  selectChevronDefaults,
  SELECT_CHEVRON_CATEGORIES,
  undefined,
  'ui'
);
