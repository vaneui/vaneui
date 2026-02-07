import {
  ComponentTheme,
  defaultLayoutClassMappers,
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
import { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import { WidthClassMapper } from "../theme/layout/widthClassMapper";
import { HeightClassMapper } from "../theme/layout/heightClassMapper";
import { StatusClassMapper } from "../theme/appearance/statusClassMapper";
import { accentAppearance, borderAppearance, ringAppearance, focusVisibleAppearance, checkedBgAppearance, shadowUIAppearance } from "../theme/common/appearanceClassMappers";
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
      ...defaultLayoutClassMappers,
      border: new BorderClassMapper(),
      ring: new RingClassMapper(),
      focusVisible: new FocusVisibleClassMapper(),
      cursor: new CursorClassMapper(),
      transition: new TransitionClassMapper(),
      radius: new RadiusClassMapper(),
      width: new WidthClassMapper(),
      height: new HeightClassMapper(),
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
    }
  },
  checkboxInputDefaults,
  CHECKBOX_CATEGORIES,
  undefined,
  'ui'
);
