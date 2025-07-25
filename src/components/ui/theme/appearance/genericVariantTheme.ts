import { BaseTheme } from "../common/baseTheme";
import { VARIANT_KEYS, VariantKey, } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { TextAppearanceTheme, UIElementTextAppearanceTheme } from "./textAppearanceTheme";
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
import { UI_ELEMENT_APPEARANCE_KEYS, UIElementAppearanceKey } from "../../props";
import { ShadowAppearanceTheme } from "./shadowAppearanceTheme";
import { UIElementShadowAppearanceTheme } from "./uiElementShadowAppearanceTheme";


export interface GenericVariantTheme<T extends BaseTheme> extends Record<VariantKey, T> {
}

export class GenericVariantTheme<T extends BaseTheme> extends BaseTheme {

  private constructor(
    variantInstances: Record<VariantKey, T>
  ) {
    super();

    VARIANT_KEYS.forEach((variantKey: VariantKey) => {
      this[variantKey] = variantInstances[variantKey];
    });
  }

  // Helper function to filter appearance classes to only include UI element keys
  private static filterToUIElementKeys<T extends Record<string, any>>(
    classes: T
  ): Record<UIElementAppearanceKey, T[keyof T]> {
    const result = {} as Record<UIElementAppearanceKey, T[keyof T]>;
    UI_ELEMENT_APPEARANCE_KEYS.forEach(key => {
      if (key in classes) {
        result[key] = classes[key];
      }
    });
    return result;
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const variantKey = pickFirstTruthyKey(props, defaults, VARIANT_KEYS) || 'outline';
    const activeTextAppearanceTheme = this[variantKey];

    if (!activeTextAppearanceTheme) {
      return [];
    }
    return activeTextAppearanceTheme.getClasses(props, defaults);
  }

  // used for button, bages, chips, etc
  static createUIElementTextTheme(): GenericVariantTheme<UIElementTextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: UIElementTextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(textAppearanceClasses)
      }),
      filled: UIElementTextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledTextAppearanceClasses)
      })
    });
  }

  static createUIElementShadowTheme(): GenericVariantTheme<UIElementShadowAppearanceTheme> {
    return new GenericVariantTheme({
      outline: UIElementShadowAppearanceTheme.createTheme({}),
      filled: UIElementShadowAppearanceTheme.createTheme({})
    });
  }

  static createBorderAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({base: borderAppearanceClasses}),
      filled: TextAppearanceTheme.createTheme({base: filledBorderAppearanceClasses})
    });
  }

  static createUIElementBorderTheme(): GenericVariantTheme<UIElementTextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: UIElementTextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(borderAppearanceClasses)
      }),
      filled: UIElementTextAppearanceTheme.createTheme({
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

  static createUIElementRingTheme(): GenericVariantTheme<UIElementTextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: UIElementTextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(ringAppearanceClasses)
      }),
      filled: UIElementTextAppearanceTheme.createTheme({
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

  static createUIElementBgAppearanceTheme(): GenericVariantTheme<UIElementTextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: UIElementTextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(backgroundAppearanceClasses),
        hover: this.filterToUIElementKeys(hoverBackgroundAppearanceClasses),
        active: this.filterToUIElementKeys(activeBackgroundAppearanceClasses)
      }),
      filled: UIElementTextAppearanceTheme.createTheme({
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

  static createSimpleUIElementBgAppearanceTheme(): GenericVariantTheme<UIElementTextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: UIElementTextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(backgroundAppearanceClasses),
      }),
      filled: UIElementTextAppearanceTheme.createTheme({
        base: this.filterToUIElementKeys(filledBackgroundAppearanceClasses),
      })
    });
  }
}

