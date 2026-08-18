import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { SwitchProps } from "./SwitchProps";
import { SimpleConsumerClassMapper, DisabledOpacityClassMapper } from "../theme/appearance";
import { FocusVisibleClassMapper, AlignSelfClassMapper } from "../theme/layout";
import { SizeClassMapper } from "../theme/size";
import { focusVisibleConsumerClass } from "../classes/appearanceClasses";
import { SWITCH_CATEGORIES } from "./SwitchCategories";
import type { SwitchWrapperTheme } from "./SwitchWrapperTheme";
import { switchWrapperDefaults } from "./switchWrapperDefaults";

// wrapper is one text line tall so the track centers on the label's first row
const lineBox = "h-[calc(var(--lh)*var(--fs))]";

export const defaultSwitchWrapperTheme = new ComponentTheme<SwitchProps, SwitchWrapperTheme>(
  "span",
  "vane-switch-wrapper",
  {
    size: {
      height: new SizeClassMapper({ xs: lineBox, sm: lineBox, md: lineBox, lg: lineBox, xl: lineBox })
    },
    layout: {
      ...defaultLayoutClassMappers,
      focusVisible: new FocusVisibleClassMapper(),
      alignSelf: new AlignSelfClassMapper()
    },
    appearance: {
      focusVisible: new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass }, 'focusVisible'),
      disabled: new DisabledOpacityClassMapper(),
    }
  },
  switchWrapperDefaults,
  SWITCH_CATEGORIES,
  undefined,
  'ui'
);
