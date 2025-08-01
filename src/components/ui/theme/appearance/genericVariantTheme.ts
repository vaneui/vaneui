import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ComponentKeys, VariantKey, } from "../../props";
import { TextAppearanceTheme } from "./textAppearanceTheme";
import { filledTextAppearanceClasses, textAppearanceClasses } from "../../classes/typographyClasses";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  borderAppearanceClasses, filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses,
  filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses,
  filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses,
  ringAppearanceClasses
} from "../../classes/appearanceClasses";
import { AppearanceKey } from "../../props";
import { ShadowAppearanceTheme } from "./shadowAppearanceTheme";


export interface GenericVariantTheme<T extends BaseTheme> extends Record<VariantKey, T> {
}

export class GenericVariantTheme<T extends BaseTheme> extends BaseTheme {

  private constructor(
    variantInstances: Record<VariantKey, T>
  ) {
    super();

    ComponentKeys.variant.forEach((variantKey) => {
      this[variantKey as VariantKey] = variantInstances[variantKey as VariantKey];
    });
  }

  // Helper function to filter appearance classes to only include UI element keys
  private static filterToUIElementKeys<T extends Record<string, any>>(
    classes: T
  ): Record<AppearanceKey, T[keyof T]> {
    const result = {} as Record<AppearanceKey, T[keyof T]>;
    ComponentKeys.appearance.forEach(key => {
      if (key in classes) {
        result[key as AppearanceKey] = classes[key];
      }
    });
    return result;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const variantKey = extractedKeys?.variant ?? 'outline';
    const activeTextAppearanceTheme = this[variantKey];

    if (!activeTextAppearanceTheme) {
      return [];
    }
    return activeTextAppearanceTheme.getClasses(extractedKeys);
  }

  // used for button, bages, chips, etc
  static createUIElementTextTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(textAppearanceClasses)
      }),
      filled: TextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledTextAppearanceClasses)
      })
    });
  }

  static createUIElementShadowTheme(): GenericVariantTheme<ShadowAppearanceTheme> {
    return new GenericVariantTheme({
      outline: ShadowAppearanceTheme.createTheme({}),
      filled: ShadowAppearanceTheme.createTheme({})
    });
  }

  static createBorderAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({base: borderAppearanceClasses}),
      filled: TextAppearanceTheme.createTheme({base: filledBorderAppearanceClasses})
    });
  }

  static createUIElementBorderTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(borderAppearanceClasses)
      }),
      filled: TextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledBorderAppearanceClasses)
      })
    });
  }

  static createRingAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({base: ringAppearanceClasses}),
      filled: TextAppearanceTheme.createTheme({base: filledRingAppearanceClasses})
    });
  }

  static createUIElementRingTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(ringAppearanceClasses)
      }),
      filled: TextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledRingAppearanceClasses)
      })
    });
  }

  static createBgAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
        hover: hoverBackgroundAppearanceClasses,
        active: activeBackgroundAppearanceClasses
      }),
      filled: TextAppearanceTheme.createTheme({
        base: filledBackgroundAppearanceClasses,
        hover: filledHoverBackgroundAppearanceClasses,
        active: filledActiveBackgroundAppearanceClasses
      })
    });
  }

  static createUIElementBgAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(backgroundAppearanceClasses),
        hover: this.filterToUIElementKeys(hoverBackgroundAppearanceClasses),
        active: this.filterToUIElementKeys(activeBackgroundAppearanceClasses)
      }),
      filled: TextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledBackgroundAppearanceClasses),
        hover: this.filterToUIElementKeys(filledHoverBackgroundAppearanceClasses),
        active: this.filterToUIElementKeys(filledActiveBackgroundAppearanceClasses)
      })
    });
  }

  static createSimpleBgAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
      }),
      filled: TextAppearanceTheme.createTheme({
        base: filledBackgroundAppearanceClasses,
      })
    });
  }

  static createSimpleUIElementBgAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(backgroundAppearanceClasses),
      }),
      filled: TextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledBackgroundAppearanceClasses),
      })
    });
  }
}

