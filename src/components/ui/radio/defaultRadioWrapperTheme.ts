import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { RadioProps } from "./RadioProps";
import { SimpleConsumerClassMapper, DisabledOpacityClassMapper } from "../theme/appearance";
import { FocusVisibleClassMapper, AlignSelfClassMapper } from "../theme/layout";
import { SizeClassMapper } from "../theme/size";
import { focusVisibleConsumerClass } from "../classes/appearanceClasses";
import { RADIO_CATEGORIES } from "./RadioCategories";
import type { RadioWrapperTheme } from "./RadioWrapperTheme";
import { radioWrapperDefaults } from "./radioWrapperDefaults";

export const defaultRadioWrapperTheme = new ComponentTheme<RadioProps, RadioWrapperTheme>(
  "span",
  "",
  {
    size: {
      height: new SizeClassMapper({
        xs: 'h-[calc(var(--lh)*var(--fs))]',
        sm: 'h-[calc(var(--lh)*var(--fs))]',
        md: 'h-[calc(var(--lh)*var(--fs))]',
        lg: 'h-[calc(var(--lh)*var(--fs))]',
        xl: 'h-[calc(var(--lh)*var(--fs))]'
      }) // Uses custom mode for calculated height
    },
    layout: {
      ...defaultLayoutClassMappers,
      focusVisible: new FocusVisibleClassMapper(),
      alignSelf: new AlignSelfClassMapper()
    },
    appearance: {
      variant: new SimpleConsumerClassMapper({ base: '' }, 'bg'),
      focusVisible: new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass }, 'focusVisible'),
      disabled: new DisabledOpacityClassMapper(),
    }
  },
  radioWrapperDefaults,
  RADIO_CATEGORIES,
  undefined,
  'ui'
);
