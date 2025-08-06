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
  ringAppearanceClasses,
} from "../../classes/appearanceClasses";
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
        base: textAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: filledTextAppearanceClasses
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
        base: borderAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: filledBorderAppearanceClasses
      })
    });
  }

  static createUIElementRingTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: ringAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: filledRingAppearanceClasses
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

  static createCheckboxBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
      }),
      filled: AppearanceTheme.createTheme({
        base: backgroundAppearanceClasses,
      })
    });
  }

  static createUIElementBgAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
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
        base: backgroundAppearanceClasses,
      }),
      filled: AppearanceTheme.createTheme({
        base: filledBackgroundAppearanceClasses,
      })
    });
  }

  static createAccentColorAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: accentColorAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: filledAccentColorAppearanceClasses
      })
    });
  }

  static createCheckedAppearanceTheme(): GenericVariantTheme<AppearanceTheme> {
    return new GenericVariantTheme({
      outline: AppearanceTheme.createTheme({
        base: checkedBackgroundAppearanceClasses
      }),
      filled: AppearanceTheme.createTheme({
        base: filledCheckedBackgroundAppearanceClasses
      })
    });
  }
}

