import { BaseTheme } from "../common/baseTheme";
import {
  APPEARANCE_KEYS,
  AppearanceKey,
  MODE_KEYS,
  ModeKey,
} from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { layoutBackgroundAppearanceClasses } from "../../classes/appearanceClasses";

export interface BgAppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {
}

export class BgAppearanceTheme extends BaseTheme {
  constructor() {
    super();

    APPEARANCE_KEYS.forEach(key => {
      this[key] = {
        base: layoutBackgroundAppearanceClasses[key] || '',
        hover: '',
        active: '',
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
}