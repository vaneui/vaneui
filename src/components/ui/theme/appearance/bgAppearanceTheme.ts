import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import {
  ComponentKeys,
  AppearanceKey,
  TransparentKey,
  LinkKey,
  ModeKey,
} from "../../props";
import { layoutBackgroundAppearanceClasses } from "../../classes/appearanceClasses";

export interface BgAppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {
}

export class BgAppearanceTheme extends BaseTheme {
  constructor() {
    super();

    // Set up appearance keys only
    ComponentKeys.appearance.forEach(key => {
      this[key] = {
        base: layoutBackgroundAppearanceClasses[key as keyof typeof layoutBackgroundAppearanceClasses] || '',
        hover: '',
        active: '',
      };
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    // Check for specific transparent or link styles first
    if (extractedKeys?.transparent) {
      const transparentClass = layoutBackgroundAppearanceClasses[extractedKeys.transparent];
      return [transparentClass || '', '', ''];
    }
    
    if (extractedKeys?.link) {
      const linkClass = layoutBackgroundAppearanceClasses[extractedKeys.link];
      return [linkClass || '', '', ''];
    }
    
    // Use regular appearance
    const pickedAppearanceKey = extractedKeys?.appearance ?? 'default';
    const modesForAppearance = this[pickedAppearanceKey];

    if (!modesForAppearance) {
      return ComponentKeys.mode.map(() => '');
    }
    return ComponentKeys.mode.map(mode => modesForAppearance[mode] || '');
  }
}