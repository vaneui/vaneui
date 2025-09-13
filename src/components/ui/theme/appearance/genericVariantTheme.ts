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
  focusVisibleOutlineAppearanceClasses,
  filledFocusVisibleOutlineAppearanceClasses,
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
    return this[variantKey].getClasses(extractedKeys);
  }

  // used for button, badges, chips, etc - UI elements where transparent affects background
  static createUIElementTextTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: textAppearanceClasses
      }, 'text', true), // Layout/UI components: text themes should ignore transparent
      filled: AppearanceTheme.createTheme({
        base: filledTextAppearanceClasses
      }, 'text', true)
    });
  }

  // used for typography components where transparent affects text color
  static createTypographyTextTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: textAppearanceClasses
      }, 'text', false), // Typography components: text themes should respect transparent
      filled: AppearanceTheme.createTheme({
        base: filledTextAppearanceClasses
      }, 'text', false)
    });
  }

  // used for typography components where transparent should NOT affect background
  static createTypographyBgTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
        hover: hoverBackgroundAppearanceClasses,
        active: activeBackgroundAppearanceClasses
      }, 'bg', true), // Typography components: bg themes should ignore transparent
      filled: AppearanceTheme.createTheme({
        base: filledBackgroundAppearanceClasses,
        hover: filledHoverBackgroundAppearanceClasses,
        active: filledActiveBackgroundAppearanceClasses
      }, 'bg', true)
    });
  }

  // used for typography components where transparent should NOT affect border
  static createTypographyBorderTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: borderAppearanceClasses
      }, 'border', true), // Typography components: border themes should ignore transparent
      filled: AppearanceTheme.createTheme({
        base: filledBorderAppearanceClasses
      }, 'border', true)
    });
  }

  // used for layout/UI components where transparent should NOT affect text
  static createUIElementTextThemeIgnoreTransparent(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: textAppearanceClasses
      }, 'text', true), // Layout/UI components: text themes should ignore transparent
      filled: AppearanceTheme.createTheme({
        base: filledTextAppearanceClasses
      }, 'text', true)
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
      }, 'border', true), // Layout/UI components: border themes should ignore transparent
      filled: AppearanceTheme.createTheme({
        base: filledBorderAppearanceClasses
      }, 'border', true)
    });
  }

  static createUIElementRingTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: ringAppearanceClasses
      }, 'ring', true), // Layout/UI components: ring themes should ignore transparent
      filled: AppearanceTheme.createTheme({
        base: filledRingAppearanceClasses
      }, 'ring', true)
    });
  }

  static createCheckboxBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
      }, 'bg', false), // Layout/UI components: bg themes should respect transparent
      filled: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
      }, 'bg', false)
    });
  }

  static createBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
        hover: hoverBackgroundAppearanceClasses,
        active: activeBackgroundAppearanceClasses
      }, 'bg', false), // Layout/UI components: bg themes should respect transparent
      filled: AppearanceTheme.createTheme({
        base: filledBackgroundAppearanceClasses,
        hover: filledHoverBackgroundAppearanceClasses,
        active: filledActiveBackgroundAppearanceClasses
      }, 'bg', false)
    });
  }

  static createSimpleUIElementBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
      }, 'bg', false), // Layout/UI components: bg themes should respect transparent
      filled: AppearanceTheme.createTheme({
        base: filledBackgroundAppearanceClasses,
      }, 'bg', false)
    });
  }

  static createAccentColorAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: accentColorAppearanceClasses
      }, 'accent', true), // Layout/UI components: accent themes should ignore transparent
      filled: AppearanceTheme.createTheme({
        base: filledAccentColorAppearanceClasses
      }, 'accent', true)
    });
  }

  static createCheckedAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: checkedBackgroundAppearanceClasses
      }, 'bg', false), // Layout/UI components: bg themes should respect transparent
      filled: AppearanceTheme.createTheme({
        base: filledCheckedBackgroundAppearanceClasses
      }, 'bg', false)
    });
  }

  static createLayoutBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: layoutBackgroundAppearanceClasses
      }, 'bg', false), // Layout components: bg themes should respect transparent
      filled: AppearanceTheme.createTheme({
        base: layoutFilledBackgroundAppearanceClasses
      }, 'bg', false)
    });
  }

  static createUIElementFocusVisibleTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        focusVisible: focusVisibleOutlineAppearanceClasses
      }, 'focusVisible', true), // UI components: focusVisible themes should ignore transparent
      filled: AppearanceTheme.createTheme({
        focusVisible: filledFocusVisibleOutlineAppearanceClasses
      }, 'focusVisible', true)
    });
  }
}

