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


export interface GenericVariantTheme<T extends BaseTheme> extends Record<VariantKey, T> {
}

export class GenericVariantTheme<T extends BaseTheme> extends BaseTheme {

  constructor(
    variantInstances: Record<VariantKey, T>
  ) {
    super();

    VARIANT_KEYS.forEach((variantKey: VariantKey) => {
      this[variantKey] = variantInstances[variantKey];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const activeVariantKey = pickFirstTruthyKey(props, defaults, VARIANT_KEYS) || 'outline';
    const activeTextAppearanceTheme = this[activeVariantKey];

    if (!activeTextAppearanceTheme) {
      return [];
    }
    return activeTextAppearanceTheme.getClasses(props, defaults);
  }

  static createTextAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createDefaultTheme({base: textAppearanceClasses}),
      filled: TextAppearanceTheme.createDefaultTheme({base: filledTextAppearanceClasses})
    });
  }

  static createBorderAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createDefaultTheme({base: borderAppearanceClasses}),
      filled: TextAppearanceTheme.createDefaultTheme({base: filledBorderAppearanceClasses})
    });
  }

  static createRingAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createDefaultTheme({base: ringAppearanceClasses}),
      filled: TextAppearanceTheme.createDefaultTheme({base: filledRingAppearanceClasses})
    });
  }

  static createBgAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createDefaultTheme({
        base: backgroundAppearanceClasses,
        hover: hoverBackgroundAppearanceClasses,
        active: activeBackgroundAppearanceClasses
      }),
      filled: TextAppearanceTheme.createDefaultTheme({
        base: filledBackgroundAppearanceClasses,
        hover: filledHoverBackgroundAppearanceClasses,
        active: filledActiveBackgroundAppearanceClasses
      })
    });
  }

  static createSimpleBgAppearanceTheme(): GenericVariantTheme<TextAppearanceTheme> {
    return new GenericVariantTheme({
      outline: TextAppearanceTheme.createDefaultTheme({
        base: backgroundAppearanceClasses,
      }),
      filled: TextAppearanceTheme.createDefaultTheme({
        base: filledBackgroundAppearanceClasses,
      })
    });
  }
}

