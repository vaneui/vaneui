import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";
import {
  APPEARANCE_KEYS,
  AppearanceKey,
  MODE_KEYS,
  ModeKey,
} from "../../props";
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

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const pickedAppearanceKey = (extractedKeys?.appearance as AppearanceKey) ?? 'default';
    const modesForAppearance = this[pickedAppearanceKey];

    if (!modesForAppearance) {
      return MODE_KEYS.map(() => '');
    }
    return MODE_KEYS.map(mode => modesForAppearance[mode] || '');
  }
}