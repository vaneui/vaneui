import { BaseTheme } from "../common/baseTheme";
import {
  BG_APPEARANCE_KEYS,
  BgAppearanceKey,
  MODE_KEYS,
  ModeKey,
} from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { backgroundAppearanceClasses } from "../../classes/appearanceClasses";

export interface LayoutAppearanceTheme extends Record<BgAppearanceKey, Record<ModeKey, string>> {
}

export class LayoutAppearanceTheme extends BaseTheme {
  public static readonly defaultFullConfig: Record<BgAppearanceKey, Record<ModeKey, string>> =
    (() => {
      const config: Partial<Record<BgAppearanceKey, Record<ModeKey, string>>> = {};
      BG_APPEARANCE_KEYS.forEach((key: BgAppearanceKey) => {
        config[key] = {
          base: backgroundAppearanceClasses[key] || '',
          hover: '',
          active: '',
        };
      });
      return config as Record<BgAppearanceKey, Record<ModeKey, string>>;
    })();

  constructor(initialOverrides?: Partial<Record<BgAppearanceKey, Partial<Record<ModeKey, string>>>>) {
    super();
    BG_APPEARANCE_KEYS.forEach((textKey: BgAppearanceKey) => {
      const defaultModesForKey = LayoutAppearanceTheme.defaultFullConfig[textKey];
      const overrideModesForKey = initialOverrides?.[textKey];
      this[textKey] = {
        ...defaultModesForKey,
        ...(overrideModesForKey || {}),
      };
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const pickedAppearanceKey = pickFirstTruthyKey(props, defaults, BG_APPEARANCE_KEYS) || 'default';
    const modesForAppearance = this[pickedAppearanceKey];

    if (!modesForAppearance) {
      return MODE_KEYS.map(() => '');
    }
    return MODE_KEYS.map(mode => modesForAppearance[mode] || '');
  }

  static createDefaultStyle(
    src: Partial<Record<ModeKey, Partial<Record<BgAppearanceKey, string>>>> = {}
  ): LayoutAppearanceTheme {
    const initialOverridesForConstructor: Partial<Record<BgAppearanceKey, Partial<Record<ModeKey, string>>>> = {};

    BG_APPEARANCE_KEYS.forEach((textKey: BgAppearanceKey) => {
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