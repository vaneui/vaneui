import {
  BaseComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes
} from "./common/ComponentTheme";
import { CheckboxProps } from "../props";
import { themeDefaults } from "./defaults";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { SizeTheme } from "./size/sizeTheme";
import { CHECKBOX_CATEGORIES } from "../props";
import { textSizeClasses } from "../classes/typographyClasses";
import { ReactElement } from "react";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { FocusVisibleTheme } from "./layout/focusVisibleTheme";

export interface CheckboxTheme extends BaseComponentTheme {
  size: {
    size: SizeTheme;
    text: SizeTheme;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    focusVisible: FocusVisibleTheme;
    radius: RadiusTheme;
  };
  appearance: {
    accent: GenericVariantTheme<AppearanceTheme>;
    background: GenericVariantTheme<AppearanceTheme>;
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
    focusVisible: GenericVariantTheme<AppearanceTheme>;
    check: GenericVariantTheme<AppearanceTheme>;
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
  };
}

export const defaultCheckboxTheme = new ComponentTheme<CheckboxProps, CheckboxTheme>(
  "input",
  "peer col-start-1 row-start-1 cursor-pointer appearance-none ring-transparent",
  {
    size: {
      size: new SizeTheme({
        xs: 'h-3 w-3',
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-4.5 w-4.5',
        xl: 'h-5 w-5'
      }),
      text: new SizeTheme(textSizeClasses)
    },
    layout: {
      ...defaultLayoutsThemes,
      border: new BorderTheme(),
      ring: new RingTheme(),
      focusVisible: new FocusVisibleTheme(),
      radius: RadiusTheme.createCheckboxTheme(),
    },
    appearance: {
      accent: GenericVariantTheme.createAccentColorAppearanceTheme(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      background: GenericVariantTheme.createCheckboxBgAppearanceTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      focusVisible: GenericVariantTheme.createUIElementFocusVisibleTheme(),
      check: GenericVariantTheme.createCheckedAppearanceTheme(),
      shadow: GenericVariantTheme.createUIElementShadowTheme(),
    }
  },
  themeDefaults.checkbox?.input || {},
  CHECKBOX_CATEGORIES
);

export interface CheckTheme extends BaseComponentTheme {
  checkElement: () => ReactElement;
  appearance: {
    color: GenericVariantTheme<AppearanceTheme>;
    focusVisible: GenericVariantTheme<AppearanceTheme>;
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
      color: GenericVariantTheme.createUIElementTextThemeIgnoreTransparent(),
      focusVisible: GenericVariantTheme.createUIElementFocusVisibleTheme()
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
    variant: GenericVariantTheme<AppearanceTheme>;
    focusVisible: GenericVariantTheme<AppearanceTheme>;
  };
}

export const defaultCheckboxWrapperTheme = new ComponentTheme<CheckboxProps, CheckboxWrapperTheme>(
  "span",
  "",
  {
    size: {
      height: new SizeTheme({
        xs: 'h-4',
        sm: 'h-5', 
        md: 'h-6',
        lg: 'h-7',
        xl: 'h-7'
      })
    },
    layout: {
      ...defaultLayoutsThemes,
      focusVisible: new FocusVisibleTheme()
    },
    appearance: {
      variant: GenericVariantTheme.createSimpleUIElementBgAppearanceTheme(),
      focusVisible: GenericVariantTheme.createUIElementFocusVisibleTheme()
    }
  },
  themeDefaults.checkbox?.wrapper || {},
  CHECKBOX_CATEGORIES
);