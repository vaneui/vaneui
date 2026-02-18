import { defaultSizedLayoutClassMappers } from "../theme/common/ComponentTheme";
import { ComponentTheme, accentAppearance, borderAppearance, ringAppearance, focusVisibleAppearance, checkedBgAppearance, shadowUIAppearance } from "../theme/common";
import type { CheckboxProps } from "./CheckboxProps";
import { RadiusClassMapper, BorderClassMapper, RingClassMapper, CursorClassMapper, TransitionClassMapper, FocusVisibleClassMapper } from "../theme/layout";
import { SimpleConsumerClassMapper, StatusClassMapper, DisabledClassMapper } from "../theme/appearance";
import { SizeClassMapper, FontSizeClassMapper } from "../theme/size";
import { CHECKBOX_CATEGORIES } from "./CheckboxCategories";
import type { CheckboxTheme } from "./CheckboxTheme";
import { checkboxInputDefaults } from "./checkboxInputDefaults";

export const defaultCheckboxTheme = new ComponentTheme<CheckboxProps, CheckboxTheme>(
  "input",
  "vane-checkbox peer col-start-1 row-start-1 cursor-pointer appearance-none ring-transparent size-(--size)",
  {
    size: {
      size: new SizeClassMapper(),
      text: new FontSizeClassMapper()
    },
    layout: {
      ...defaultSizedLayoutClassMappers,
      border: new BorderClassMapper(),
      ring: new RingClassMapper(),
      focusVisible: new FocusVisibleClassMapper(),
      cursor: new CursorClassMapper(),
      transition: new TransitionClassMapper(),
      radius: new RadiusClassMapper(),
    },
    appearance: {
      accent: accentAppearance,
      border: borderAppearance,
      background: new SimpleConsumerClassMapper({ base: 'bg-white' }, 'bg'),
      ring: ringAppearance,
      focusVisible: focusVisibleAppearance,
      check: checkedBgAppearance,
      shadow: shadowUIAppearance,
      status: new StatusClassMapper(),
      disabled: new DisabledClassMapper(),
    }
  },
  checkboxInputDefaults,
  CHECKBOX_CATEGORIES,
  undefined,
  'ui'
);
