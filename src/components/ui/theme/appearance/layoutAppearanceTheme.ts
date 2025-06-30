import { BaseTheme } from "../common/baseTheme";
import {
  APPEARANCE_KEYS,
  AppearanceKey,
  MODE_KEYS,
  ModeKey,
} from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { textAppearanceClasses } from "../../classes/typographyClasses";

export interface LayoutAppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {}

export class LayoutAppearanceTheme extends BaseTheme {
  public static readonly defaultFullConfig: Record<AppearanceKey, Record<ModeKey, string>> =
    (() => {
      const config: Partial<Record<AppearanceKey, Record<ModeKey, string>>> = {};
      APPEARANCE_KEYS.forEach((key: AppearanceKey) => {
        config[key] = {
          base: textAppearanceClasses[key] || '',
          hover: '',
          active: '',
        };
      });
      return config as Record<AppearanceKey, Record<ModeKey, string>>;
    })();

  constructor(initialOverrides?: Partial<Record<AppearanceKey, Partial<Record<ModeKey, string>>>>) {
    super();
    APPEARANCE_KEYS.forEach((textKey: AppearanceKey) => {
      const defaultModesForKey = LayoutAppearanceTheme.defaultFullConfig[textKey];
      const overrideModesForKey = initialOverrides?.[textKey];
      this[textKey] = {
        ...defaultModesForKey,
        ...(overrideModesForKey || {}),
      };
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const pickedAppearanceKey = pickFirstTruthyKey(props, defaults, APPEARANCE_KEYS) || 'default';
    const modesForAppearance = this[pickedAppearanceKey];

    if (!modesForAppearance) {
      return MODE_KEYS.map(() => '');
    }
    return MODE_KEYS.map(mode => modesForAppearance[mode] || '');
  }

  static createDefaultStyle(
    src: Partial<Record<ModeKey, Partial<Record<AppearanceKey, string>>>> = {}
  ): LayoutAppearanceTheme {
    const initialOverridesForConstructor: Partial<Record<AppearanceKey, Partial<Record<ModeKey, string>>>> = {};

    APPEARANCE_KEYS.forEach((textKey: AppearanceKey) => {
      const modesForCurrentTextKey: Partial<Record<ModeKey, string>> = {};
      let keyHasDataInSrc = false;

      MODE_KEYS.forEach((modeKey: ModeKey) => {
        const classValue = src[modeKey]?.[textKey];
        if (classValue !== undefined) {
          modesForCurrentTextKey[modeKey] = classValue;
          keyHasDataInSrc = true;
        }
      });

      if (keyHasDataInSrc) {
        initialOverridesForConstructor[textKey] = modesForCurrentTextKey;
      }
    });
    return new LayoutAppearanceTheme(initialOverridesForConstructor);
  }
}