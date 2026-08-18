import { defaultSizedLayoutClassMappers } from "../theme/common/ComponentTheme";
import { ComponentTheme, accentAppearance, borderAppearance, ringAppearance, focusVisibleAppearance, checkedBgAppearance, shadowAppearance } from "../theme/common";
import type { RadioProps } from "./RadioProps";
import { RadiusClassMapper, BorderClassMapper, RingClassMapper, CursorClassMapper, TransitionClassMapper, FocusVisibleClassMapper } from "../theme/layout";
import { SimpleConsumerClassMapper, StatusClassMapper, DisabledInteractiveClassMapper } from "../theme/appearance";
import { SizeClassMapper, FontSizeClassMapper } from "../theme/size";
import { RADIO_CATEGORIES } from "./RadioCategories";
import type { RadioTheme } from "./RadioTheme";
import { radioInputDefaults } from "./radioInputDefaults";

export const defaultRadioTheme = new ComponentTheme<RadioProps, RadioTheme>(
  "input",
  "vane-radio peer col-start-1 row-start-1 appearance-none ring-transparent size-(--size)",
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
      background: new SimpleConsumerClassMapper({ base: 'bg-(--color-bg-form)' }, 'bg'),
      ring: ringAppearance,
      focusVisible: focusVisibleAppearance,
      // shared with Checkbox; its `indeterminate:` variant is inert on a radio
      dot: checkedBgAppearance,
      shadow: shadowAppearance,
      status: new StatusClassMapper(),
      disabled: new DisabledInteractiveClassMapper(),
    }
  },
  radioInputDefaults,
  RADIO_CATEGORIES,
  undefined,
  'ui'
);
