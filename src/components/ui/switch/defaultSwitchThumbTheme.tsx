import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { SwitchThumbProps } from "./SwitchThumbProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { RadiusClassMapper, TransitionClassMapper, JustifySelfClassMapper, PointerEventsClassMapper } from "../theme/layout";
import { SWITCH_THUMB_CATEGORIES } from "./SwitchThumbCategories";
import type { SwitchThumbTheme } from "./SwitchThumbTheme";
import { switchThumbDefaults } from "./switchThumbDefaults";

// unchecked knob reads against the form field; checked it takes the "text on this fill" color
const thumbColorClasses = "bg-(--color-border-form) peer-checked:bg-(--text-color)";

export const defaultSwitchThumbTheme = new ComponentTheme<SwitchThumbProps, SwitchThumbTheme>(
  "span",
  "vane-switch-thumb col-start-1 row-start-1 peer-checked:translate-x-(--switch-travel)",
  {
    layout: {
      ...defaultLayoutClassMappers,
      radius: new RadiusClassMapper(),
      transition: new TransitionClassMapper(),
      justifySelf: new JustifySelfClassMapper(),
      pointerEvents: new PointerEventsClassMapper(),
    },
    appearance: {
      background: new SimpleConsumerClassMapper({ base: thumbColorClasses, alwaysOutput: true }, 'bg'),
    },
  },
  switchThumbDefaults,
  SWITCH_THUMB_CATEGORIES,
  undefined,
  'ui'
);
