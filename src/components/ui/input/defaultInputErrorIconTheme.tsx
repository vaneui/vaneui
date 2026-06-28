import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { InputErrorIconProps } from "./InputErrorIconProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { PointerEventsClassMapper } from "../theme/layout";
import { INPUT_ERROR_ICON_CATEGORIES } from "./InputErrorIconCategories";
import type { InputErrorIconTheme } from "./InputErrorIconTheme";
import { inputErrorIconDefaults } from "./inputErrorIconDefaults";

// Decorative trailing alert icon for an error-state <Input>. Rendered as a real
// themed element (not a CSS background-image), so it goes through the theme
// system like every other VaneUI part: the SVG is swappable via `themeOverride`
// (errorIconElement), its color via the `color` mapper / `extraClasses`, and it
// scales with the input because it sizes to half the input's height (h-1/2 of
// the full-height overlay). fill="currentColor" makes it follow the color mapper.
export const defaultInputErrorIconTheme = new ComponentTheme<InputErrorIconProps, InputErrorIconTheme>(
  "span",
  "vane-input-error-icon inset-y-0 end-2.5 [&>svg]:h-1/2 [&>svg]:w-auto",
  {
    errorIconElement: () =>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 4a1 1 0 011 1v4a1 1 0 11-2 0V7a1 1 0 011-1zm0 8a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
      </svg>,
    appearance: {
      color: new SimpleConsumerClassMapper({ base: "text-red-500", alwaysOutput: true }, 'text'),
    },
    layout: {
      ...defaultLayoutClassMappers,
      pointerEvents: new PointerEventsClassMapper(),
    },
  },
  inputErrorIconDefaults,
  INPUT_ERROR_ICON_CATEGORIES,
  undefined,
  'ui'
);
