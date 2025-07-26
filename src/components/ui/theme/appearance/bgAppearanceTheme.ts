import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";
import {
  APPEARANCE_KEYS,
  TRANSPARENT_KEYS,
  LINK_KEYS,
  AppearanceKey,
  TransparentKey,
  LinkKey,
  MODE_KEYS,
  ModeKey,
} from "../../props";
import { layoutBackgroundAppearanceClasses } from "../../classes/appearanceClasses";

export interface BgAppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {
}

export class BgAppearanceTheme extends BaseTheme {
  constructor() {
    super();

    // Set up appearance keys only
    APPEARANCE_KEYS.forEach(key => {
      this[key] = {
        base: layoutBackgroundAppearanceClasses[key] || '',
        hover: '',
        active: '',
      };
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    // Check for specific transparent or link styles first
    if (extractedKeys?.transparent) {
      const transparentClass = layoutBackgroundAppearanceClasses[extractedKeys.transparent as TransparentKey];
      return [transparentClass || '', '', ''];
    }
    
    if (extractedKeys?.link) {
      const linkClass = layoutBackgroundAppearanceClasses[extractedKeys.link as LinkKey];
      return [linkClass || '', '', ''];
    }
    
    // Use regular appearance
    const pickedAppearanceKey = (extractedKeys?.appearance as AppearanceKey) ?? 'default';
    const modesForAppearance = this[pickedAppearanceKey];

    if (!modesForAppearance) {
      return MODE_KEYS.map(() => '');
    }
    return MODE_KEYS.map(mode => modesForAppearance[mode] || '');
  }
}