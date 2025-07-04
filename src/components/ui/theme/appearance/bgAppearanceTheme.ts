import { BaseTheme } from "../common/baseTheme";
import {
  BG_APPEARANCE_KEYS,
  BgAppearanceKey,
  MODE_KEYS,
  ModeKey,
} from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { backgroundAppearanceClasses } from "../../classes/appearanceClasses";

export interface BgAppearanceTheme extends Record<BgAppearanceKey, Record<ModeKey, string>> {
}

export class BgAppearanceTheme extends BaseTheme {
  constructor(initialOverrides?: Partial<Record<BgAppearanceKey, Partial<Record<ModeKey, string>>>>) {
    super();
    BG_APPEARANCE_KEYS.forEach((textKey: BgAppearanceKey) => {
      this[textKey] = {
        base: backgroundAppearanceClasses[textKey] || '',
        hover: '',
        active: '',
        ...(initialOverrides?.[textKey] || {}),
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

  static createDefaultTheme(
    src: Partial<Record<ModeKey, Partial<Record<BgAppearanceKey, string>>>> = {}
  ): BgAppearanceTheme {
    return new BgAppearanceTheme(
      Object.fromEntries(
        BG_APPEARANCE_KEYS.map(textKey => [
          textKey,
          Object.fromEntries(
            MODE_KEYS
              .map(modeKey => [modeKey, src[modeKey]?.[textKey]])
              .filter(([, value]) => value !== undefined)
          ),
        ]).filter(([, modes]) => Object.keys(modes).length > 0)
      )
    );
  }
}