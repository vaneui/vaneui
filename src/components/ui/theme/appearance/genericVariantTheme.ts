import { BaseTheme } from "../common/baseTheme";
import { VARIANT_KEYS, VariantKey, } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
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
import { ShadowAppearanceTheme } from "./shadowAppearanceTheme";


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

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const variantKey = pickFirstTruthyKey(props, defaults, VARIANT_KEYS) || 'outline';
    const activeTextAppearanceTheme = this[variantKey];

    if (!activeTextAppearanceTheme) {
      return [];
    }
    return activeTextAppearanceTheme.getClasses(props, defaults);
  }

  // used for button, bages, chips, etc
  static createUIElementTextTheme(): GenericVariantTheme<TextAppearanceTheme> {
    //transparent UI elements have a default text color
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({
        base: {...textAppearanceClasses, transparent: textAppearanceClasses.default}
      }),
      filled: TextAppearanceTheme.createTheme({
        base: {...filledTextAppearanceClasses, transparent: textAppearanceClasses.default}
      })
    });
  }

  static createUIElementShadowTheme(): GenericVariantTheme<ShadowAppearanceTheme> {
    //transparent UI elements won't have a shadow
    return new GenericVariantTheme({
      outline: ShadowAppearanceTheme.createTheme({transparent: undefined, link: undefined}),
      filled: ShadowAppearanceTheme.createTheme({transparent: undefined, link: undefined})
    });
  }

  static createBorderAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({base: borderAppearanceClasses}),
      filled: TextAppearanceTheme.createTheme({base: filledBorderAppearanceClasses})
    });
  }

  static createRingAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createTheme({base: ringAppearanceClasses}),
      filled: TextAppearanceTheme.createTheme({base: filledRingAppearanceClasses})
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
}

