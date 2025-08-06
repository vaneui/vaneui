import {
  BaseComponentTheme,
  ComponentTheme,
  defaultLayoutTheme,
  DefaultLayoutThemes
} from "./common/ComponentTheme";
import { CheckboxProps } from "../props/props";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { SizeTheme } from "./size/sizeTheme";
import { CHECKBOX_CATEGORIES } from "../props";
import { textSizeClasses } from "../classes/typographyClasses";

export interface CheckboxTheme extends BaseComponentTheme {
  size: {
    size: SizeTheme;
    text: SizeTheme;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
  appearance: {
    accent: GenericVariantTheme<AppearanceTheme>;
    background: GenericVariantTheme<AppearanceTheme>;
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
    check: GenericVariantTheme<AppearanceTheme>;
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
      ...defaultLayoutTheme,
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: RadiusTheme.createUITheme({
        xs: 'rounded-(--ui-border-radius-xs)',
        sm: 'rounded-(--ui-border-radius-xs)',
        md: 'rounded-(--ui-border-radius-sm)',
        lg: 'rounded-(--ui-border-radius-sm)',
        xl: 'rounded-(--ui-border-radius-md)'}),
    },
    appearance: {
      accent: GenericVariantTheme.createAccentColorAppearanceTheme(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      background: GenericVariantTheme.createCheckboxBgAppearanceTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      check: GenericVariantTheme.createCheckedAppearanceTheme()
    }
  },
  {
    md: true,
    default: true,
    border: true,
    rounded: true,
    noRing: true,
    filled: true,
  },
  CHECKBOX_CATEGORIES
);