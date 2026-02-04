import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { CheckboxProps } from "./CheckboxProps";
import { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import { BorderClassMapper } from "../theme/layout/borderClassMapper";
import { RingClassMapper } from "../theme/layout/ringClassMapper";
import { CursorClassMapper } from "../theme/layout/cursorClassMapper";
import { TransitionClassMapper } from "../theme/layout/transitionClassMapper";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import { SizeClassMapper } from "../theme/size/sizeClassMapper";
import { FontSizeClassMapper } from "../theme/size/fontSizeClassMapper";
import { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import { StatusClassMapper } from "../theme/appearance/statusClassMapper";
import {
  borderConsumerClass,
  ringConsumerClass,
  focusVisibleConsumerClass,
  accentConsumerClass,
  checkedBgConsumerClass
} from "../classes/appearanceClasses";
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
      ...defaultLayoutsThemes,
      border: new BorderClassMapper(),
      ring: new RingClassMapper(),
      focusVisible: new FocusVisibleClassMapper(),
      cursor: new CursorClassMapper(),
      transition: new TransitionClassMapper(),
      radius: new RadiusClassMapper(),
    },
    appearance: {
      accent: new SimpleConsumerClassMapper({ base: accentConsumerClass }, 'accent'),
      border: new SimpleConsumerClassMapper({ base: borderConsumerClass }, 'border'),
      background: new SimpleConsumerClassMapper({ base: 'bg-white' }, 'bg'),
      ring: new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring'),
      focusVisible: new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass }, 'focusVisible'),
      check: new SimpleConsumerClassMapper({ base: checkedBgConsumerClass }, 'bg'),
      shadow: ShadowAppearanceClassMapper.createUITheme(),
      status: new StatusClassMapper(),
    }
  },
  checkboxInputDefaults,
  CHECKBOX_CATEGORIES,
  undefined,
  'ui'
);
