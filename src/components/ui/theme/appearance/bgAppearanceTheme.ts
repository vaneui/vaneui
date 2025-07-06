import { BaseTheme } from "../common/baseTheme";
import {
  BG_APPEARANCE_KEYS,
  BgAppearanceKey,
  MODE_KEYS,
  ModeKey,
} from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { layoutBackgroundAppearanceClasses } from "../../classes/appearanceClasses";

export interface BgAppearanceTheme extends Record<BgAppearanceKey, Record<ModeKey, string>> {
}

export class BgAppearanceTheme extends BaseTheme {
  constructor() {
    super();

    BG_APPEARANCE_KEYS.forEach(key => {
      this[key] = {
        base: layoutBackgroundAppearanceClasses[key] || '',
        hover: '',
        active: '',
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
}