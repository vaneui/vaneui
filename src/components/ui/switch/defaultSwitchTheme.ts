import { defaultSizedLayoutClassMappers } from "../theme/common/ComponentTheme";
import { ComponentTheme, borderAppearance, ringAppearance, focusVisibleAppearance, checkedBgAppearance, shadowAppearance } from "../theme/common";
import type { SwitchProps } from "./SwitchProps";
import { RadiusClassMapper, BorderClassMapper, RingClassMapper, CursorClassMapper, TransitionClassMapper, FocusVisibleClassMapper } from "../theme/layout";
import { SimpleConsumerClassMapper, StatusClassMapper, DisabledInteractiveClassMapper } from "../theme/appearance";
import { SizeClassMapper } from "../theme/size";
import { SWITCH_CATEGORIES } from "./SwitchCategories";
import type { SwitchTheme } from "./SwitchTheme";
import { switchInputDefaults } from "./switchInputDefaults";

// track box is uniform across sizes — the geometry itself scales via --switch-w / --size (rules.css)
const trackBox = "w-(--switch-w) h-(--size)";

export const defaultSwitchTheme = new ComponentTheme<SwitchProps, SwitchTheme>(
  "input",
  "vane-switch peer col-start-1 row-start-1 appearance-none ring-transparent",
  {
    size: {
      track: new SizeClassMapper({ xs: trackBox, sm: trackBox, md: trackBox, lg: trackBox, xl: trackBox })
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
      background: new SimpleConsumerClassMapper({ base: 'bg-(--color-bg-form)' }, 'bg'),
      border: borderAppearance,
      ring: ringAppearance,
      focusVisible: focusVisibleAppearance,
      checked: checkedBgAppearance,
      shadow: shadowAppearance,
      status: new StatusClassMapper(),
      disabled: new DisabledInteractiveClassMapper(),
    }
  },
  switchInputDefaults,
  SWITCH_CATEGORIES,
  undefined,
  'ui'
);
