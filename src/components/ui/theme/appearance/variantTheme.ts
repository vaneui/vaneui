import { BaseTheme } from "../common/baseTheme";
import {
  VARIANT_KEYS,
  VariantKey,
  ModeKey,
  TextAppearanceKey
} from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { TextAppearanceTheme } from "./textAppearanceTheme";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses, borderAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses, filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses, filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses, ringAppearanceClasses
} from "../../classes/appearanceClasses";
import { filledTextAppearanceClasses, textAppearanceClasses } from "../../classes/typographyClasses";

export interface VariantTheme extends Record<VariantKey, TextAppearanceTheme> {}

export class VariantTheme extends BaseTheme {
  public static readonly defaultInstances: Record<VariantKey, TextAppearanceTheme> =
    Object.fromEntries(
      VARIANT_KEYS.map(variantKey => [
        variantKey,
        new TextAppearanceTheme()
      ])
    ) as Record<VariantKey, TextAppearanceTheme>;

  constructor(
    variantInstances: Record<VariantKey, TextAppearanceTheme> = VariantTheme.defaultInstances
  ) {
    super();
    VARIANT_KEYS.forEach((variantKey: VariantKey) => {
      this[variantKey] = variantInstances[variantKey] || VariantTheme.defaultInstances[variantKey];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const activeVariantKey = pickKey(props, defaults, VARIANT_KEYS, 'outline') as VariantKey;
    const activeTextAppearanceTheme = this[activeVariantKey];

    if (!activeTextAppearanceTheme) {
      return [];
    }
    return activeTextAppearanceTheme.getClasses(props, defaults);
  }

  public cloneWithOverrides(
    overrides: Partial<Record<VariantKey, Partial<Record<TextAppearanceKey, Partial<Record<ModeKey, string>>>>>>
  ): VariantTheme {
    const newVariantInstancesMap: Partial<Record<VariantKey, TextAppearanceTheme>> = {};

    VARIANT_KEYS.forEach((variantKey: VariantKey) => {
      const currentTATInstance = this[variantKey];
      const overrideConfigForThisTAT = overrides?.[variantKey];

      if (overrideConfigForThisTAT && Object.keys(overrideConfigForThisTAT).length > 0) {
        newVariantInstancesMap[variantKey] = currentTATInstance.cloneWithOverrides(overrideConfigForThisTAT);
      } else {
        newVariantInstancesMap[variantKey] = currentTATInstance;
      }
    });

    const finalInstancesForConstructor = {
      ...VariantTheme.defaultInstances,
      ...newVariantInstancesMap
    } as Record<VariantKey, TextAppearanceTheme>;

    return new VariantTheme(finalInstancesForConstructor);
  }

  static createDefault(
    initialInstances?: Partial<Record<VariantKey, TextAppearanceTheme>>
  ): VariantTheme {
    const fullInitialInstances = {
      ...VariantTheme.defaultInstances,
      ...(initialInstances || {})
    };
    return new VariantTheme(fullInitialInstances);
  }

  static createDefaultBackground(): VariantTheme {
    return this.createDefault({
      outline: TextAppearanceTheme.createDefaultStyle({
        base: backgroundAppearanceClasses,
        hover: hoverBackgroundAppearanceClasses,
        active: activeBackgroundAppearanceClasses
      }),
      filled: TextAppearanceTheme.createDefaultStyle({
        base: filledBackgroundAppearanceClasses,
        hover: filledHoverBackgroundAppearanceClasses,
        active: filledActiveBackgroundAppearanceClasses
      })
    });
  }

  static createDefaultText(): VariantTheme {
    return this.createDefault({
      outline: TextAppearanceTheme.createDefaultStyle({base: textAppearanceClasses}),
      filled: TextAppearanceTheme.createDefaultStyle({base: filledTextAppearanceClasses})
    });
  }

  static createDefaultBorder(): VariantTheme {
    return this.createDefault({
      outline: TextAppearanceTheme.createDefaultStyle({base: borderAppearanceClasses}),
      filled: TextAppearanceTheme.createDefaultStyle({base: filledBorderAppearanceClasses})
    });
  }

  static createDefaultRing(): VariantTheme {
    return this.createDefault({
      outline: TextAppearanceTheme.createDefaultStyle({base: ringAppearanceClasses}),
      filled: TextAppearanceTheme.createDefaultStyle({base: filledRingAppearanceClasses})
    });
  }
}