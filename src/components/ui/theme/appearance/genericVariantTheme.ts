import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ComponentKeys, VariantKey, } from "../../props";
import { AppearanceTheme } from "./appearanceTheme";
import { filledTextAppearanceClasses, textAppearanceClasses } from "../../classes/typographyClasses";
import {
  accentColorAppearanceClasses,
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  borderAppearanceClasses, 
  checkedBackgroundAppearanceClasses,
  filledAccentColorAppearanceClasses, 
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses,
  filledBorderAppearanceClasses, 
  filledCheckedBackgroundAppearanceClasses,
  filledHoverBackgroundAppearanceClasses,
  filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses,
  layoutBackgroundAppearanceClasses,
  layoutFilledBackgroundAppearanceClasses,
  ringAppearanceClasses,
} from "../../classes/appearanceClasses";
import { ShadowAppearanceTheme } from "./shadowAppearanceTheme";


export class GenericVariantTheme<T extends BaseTheme> extends BaseTheme implements Record<VariantKey, T> {
  filled!: T;
  outline!: T;

  private constructor(
    variantInstances: Record<VariantKey, T>,

  ) {
    super();

    ComponentKeys.variant.forEach((variantKey) => {
      this[variantKey] = variantInstances[variantKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const variantKey = extractedKeys?.variant ?? 'outline';
    const activeTheme = this[variantKey];

    if (!activeTheme) {
      return [];
    }
    return activeTheme.getClasses(extractedKeys);
  }

  // used for button, bages, chips, etc
  static createUIElementTextTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: textAppearanceClasses
      }, 'text'),
      filled: AppearanceTheme.createTheme({
        base: filledTextAppearanceClasses
      }, 'text')
    });
  }

  static createUIElementShadowTheme(): GenericVariantTheme<ShadowAppearanceTheme> {
    return new GenericVariantTheme({
      outline: ShadowAppearanceTheme.createUITheme(),
      filled: ShadowAppearanceTheme.createUITheme()
    });
  }

  static createLayoutShadowTheme(): GenericVariantTheme<ShadowAppearanceTheme> {
    return new GenericVariantTheme({
      outline: ShadowAppearanceTheme.createLayoutTheme(),
      filled: ShadowAppearanceTheme.createLayoutTheme()
    });
  }

  static createUIElementBorderTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: borderAppearanceClasses
      }, 'border'),
      filled: AppearanceTheme.createTheme({
        base: filledBorderAppearanceClasses
      }, 'border')
    });
  }

  static createUIElementRingTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: ringAppearanceClasses
      }, 'ring'),
      filled: AppearanceTheme.createTheme({
        base: filledRingAppearanceClasses
      }, 'ring')
    });
  }

  static createCheckboxBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
      }, 'bg'),
      filled: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
      }, 'bg')
    });
  }

  static createBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
        hover: hoverBackgroundAppearanceClasses,
        active: activeBackgroundAppearanceClasses
      }, 'bg'),
      filled: AppearanceTheme.createTheme({
        base: filledBackgroundAppearanceClasses,
        hover: filledHoverBackgroundAppearanceClasses,
        active: filledActiveBackgroundAppearanceClasses
      }, 'bg')
    });
  }

  static createSimpleUIElementBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
      }, 'bg'),
      filled: AppearanceTheme.createTheme({
        base: filledBackgroundAppearanceClasses,
      }, 'bg')
    });
  }

  static createAccentColorAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: accentColorAppearanceClasses
      }, 'accent'),
      filled: AppearanceTheme.createTheme({
        base: filledAccentColorAppearanceClasses
      }, 'accent')
    });
  }

  static createCheckedAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: checkedBackgroundAppearanceClasses
      }, 'bg'),
      filled: AppearanceTheme.createTheme({
        base: filledCheckedBackgroundAppearanceClasses
      }, 'bg')
    });
  }

  static createLayoutBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: layoutBackgroundAppearanceClasses
      }, 'bg'),
      filled: AppearanceTheme.createTheme({
        base: layoutFilledBackgroundAppearanceClasses
      }, 'bg')
    });
  }
}

