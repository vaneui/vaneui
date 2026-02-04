import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { CheckboxProps } from "./CheckboxProps";
import { RadiusTheme } from "../theme/layout/radiusTheme";
import { BorderTheme } from "../theme/layout/borderTheme";
import { RingTheme } from "../theme/layout/ringTheme";
import { CursorTheme } from "../theme/layout/cursorTheme";
import { TransitionTheme } from "../theme/layout/transitionTheme";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { SizeTheme } from "../theme/size/sizeTheme";
import { FontSizeTheme } from "../theme/size/fontSizeTheme";
import { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import { FocusVisibleTheme } from "../theme/layout/focusVisibleTheme";
import { StatusTheme } from "../theme/appearance/statusTheme";
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
      size: new SizeTheme(),
      text: new FontSizeTheme()
    },
    layout: {
      ...defaultLayoutsThemes,
      border: new BorderTheme(),
      ring: new RingTheme(),
      focusVisible: new FocusVisibleTheme(),
      cursor: new CursorTheme(),
      transition: new TransitionTheme(),
      radius: new RadiusTheme(),
    },
    appearance: {
      accent: new SimpleConsumerTheme({ base: accentConsumerClass }, 'accent'),
      border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
      background: new SimpleConsumerTheme({ base: 'bg-white' }, 'bg'),
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
      focusVisible: new SimpleConsumerTheme({ base: focusVisibleConsumerClass }, 'focusVisible'),
      check: new SimpleConsumerTheme({ base: checkedBgConsumerClass }, 'bg'),
      shadow: ShadowAppearanceTheme.createUITheme(),
      status: new StatusTheme(),
    }
  },
  checkboxInputDefaults,
  CHECKBOX_CATEGORIES,
  undefined,
  'ui'
);
