import {
  BaseComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes
} from "./common/ComponentTheme";
import type { CheckboxProps } from "../checkbox";
import { themeDefaults } from "./defaults";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { SimpleConsumerTheme } from "./appearance/simpleConsumerTheme";
import { SizeTheme } from "./size/sizeTheme";
import { CHECKBOX_CATEGORIES } from "../props";
import { FontSizeTheme } from "./size/fontSizeTheme";
import { ReactElement } from "react";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { FocusVisibleTheme } from "./layout/focusVisibleTheme";
import { textConsumerClass, borderConsumerClass, ringConsumerClass, focusVisibleConsumerClass, accentConsumerClass, checkedBgConsumerClass } from "../classes/appearanceClasses";

export interface CheckboxTheme extends BaseComponentTheme {
  size: {
    size: SizeTheme;
    text: FontSizeTheme;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    focusVisible: FocusVisibleTheme;
    radius: RadiusTheme;
  };
  appearance: {
    accent: SimpleConsumerTheme;
    background: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    focusVisible: SimpleConsumerTheme;
    check: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
  };
}

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
    }
  },
  themeDefaults.checkbox?.input || {},
  CHECKBOX_CATEGORIES,
  undefined,
  'ui'
);

export interface CheckTheme extends BaseComponentTheme {
  checkElement: () => ReactElement;
  appearance: {
    color: SimpleConsumerTheme;
    focusVisible: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes & {
    focusVisible: FocusVisibleTheme;
  };
}

export const defaultCheckTheme = new ComponentTheme<CheckboxProps, CheckTheme>(
  "span",
  "invisible col-start-1 row-start-1 peer-checked:visible",
  {
    checkElement: () =>
      <svg viewBox="0 0 14 14" fill="none">
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          stroke="currentColor"
        />
      </svg>,
    appearance: {
      color: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
      focusVisible: new SimpleConsumerTheme({ base: focusVisibleConsumerClass }, 'focusVisible')
    },
    layout: {
      ...defaultLayoutsThemes,
      focusVisible: new FocusVisibleTheme()
    },
  },
  themeDefaults.checkbox?.check || {},
  CHECKBOX_CATEGORIES
);

export interface CheckboxWrapperTheme extends BaseComponentTheme {
  size: {
    height: SizeTheme;
  };
  layout: DefaultLayoutThemes & {
    focusVisible: FocusVisibleTheme;
  };
  appearance: {
    variant: SimpleConsumerTheme;
    focusVisible: SimpleConsumerTheme;
  };
}

export const defaultCheckboxWrapperTheme = new ComponentTheme<CheckboxProps, CheckboxWrapperTheme>(
  "span",
  "",
  {
    size: {
      height: new SizeTheme({
        xs: 'h-[calc(var(--lh)*var(--fs))]',
        sm: 'h-[calc(var(--lh)*var(--fs))]',
        md: 'h-[calc(var(--lh)*var(--fs))]',
        lg: 'h-[calc(var(--lh)*var(--fs))]',
        xl: 'h-[calc(var(--lh)*var(--fs))]'
      }) // Uses custom mode for calculated height
    },
    layout: {
      ...defaultLayoutsThemes,
      focusVisible: new FocusVisibleTheme()
    },
    appearance: {
      variant: new SimpleConsumerTheme({ base: '' }, 'bg'),
      focusVisible: new SimpleConsumerTheme({ base: focusVisibleConsumerClass }, 'focusVisible')
    }
  },
  themeDefaults.checkbox?.wrapper || {},
  CHECKBOX_CATEGORIES
);