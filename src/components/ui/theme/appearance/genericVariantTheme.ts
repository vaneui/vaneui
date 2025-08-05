import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ComponentKeys, VariantKey, } from "../../props";
import { AppearanceTheme } from "./appearanceTheme";
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
  static createUIElementTextTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(textAppearanceClasses)
      }, {
        transparentClassSource: textAppearanceClasses,
        linkClassSource: textAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledTextAppearanceClasses)
      }, {
        transparentClassSource: filledTextAppearanceClasses,
        linkClassSource: filledTextAppearanceClasses
      })
    });
  }

  static createUIElementShadowTheme(): GenericVariantTheme<ShadowAppearanceTheme> {
    return new GenericVariantTheme({
      outline: ShadowAppearanceTheme.createTheme({}),
      filled: ShadowAppearanceTheme.createTheme({})
    });
  }

  static createBorderAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({base: borderAppearanceClasses}),
      filled: AppearanceTheme.createTheme({base: filledBorderAppearanceClasses})
    });
  }

  static createUIElementBorderTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(borderAppearanceClasses)
      }, {
        transparentClassSource: borderAppearanceClasses,
        linkClassSource: borderAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledBorderAppearanceClasses)
      }, {
        transparentClassSource: filledBorderAppearanceClasses,
        linkClassSource: filledBorderAppearanceClasses
      })
    });
  }

  static createRingAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({base: ringAppearanceClasses}),
      filled: AppearanceTheme.createTheme({base: filledRingAppearanceClasses})
    });
  }

  static createUIElementRingTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(ringAppearanceClasses)
      }, {
        transparentClassSource: ringAppearanceClasses,
        linkClassSource: ringAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledRingAppearanceClasses)
      }, {
        transparentClassSource: filledRingAppearanceClasses,
        linkClassSource: filledRingAppearanceClasses
      })
    });
  }

  static createBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
        hover: hoverBackgroundAppearanceClasses,
        active: activeBackgroundAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: filledBackgroundAppearanceClasses,
        hover: filledHoverBackgroundAppearanceClasses,
        active: filledActiveBackgroundAppearanceClasses
      })
    });
  }

  static createUIElementBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(backgroundAppearanceClasses),
        hover: this.filterToUIElementKeys(hoverBackgroundAppearanceClasses),
        active: this.filterToUIElementKeys(activeBackgroundAppearanceClasses)
      }, {
        transparentClassSource: backgroundAppearanceClasses,
        linkClassSource: backgroundAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledBackgroundAppearanceClasses),
        hover: this.filterToUIElementKeys(filledHoverBackgroundAppearanceClasses),
        active: this.filterToUIElementKeys(filledActiveBackgroundAppearanceClasses)
      }, {
        transparentClassSource: filledBackgroundAppearanceClasses,
        linkClassSource: filledBackgroundAppearanceClasses
      })
    });
  }

  static createSimpleBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
      }),
      filled: AppearanceTheme.createTheme({
        base: filledBackgroundAppearanceClasses,
      })
    });
  }

  static createSimpleUIElementBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(backgroundAppearanceClasses),
      }, {
        transparentClassSource: backgroundAppearanceClasses,
        linkClassSource: backgroundAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledBackgroundAppearanceClasses),
      }, {
        transparentClassSource: filledBackgroundAppearanceClasses,
        linkClassSource: filledBackgroundAppearanceClasses
      })
    });
  }
}

