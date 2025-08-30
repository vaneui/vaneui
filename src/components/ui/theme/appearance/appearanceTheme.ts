import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ComponentKeys, ModeKey, AppearanceKey } from "../../props";
import { layoutBackgroundAppearanceClasses } from "../../classes/appearanceClasses";

export interface AppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {
}

export class AppearanceTheme extends BaseTheme {
  private readonly transparentClasses?: Record<string, string>;

  private constructor(
    config: Record<AppearanceKey, Record<ModeKey, string>>,
    transparentClasses?: Record<string, string>
  ) {
    super();
    Object.assign(this, config);
    this.transparentClasses = transparentClasses;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    // Check for specific transparent styles first
    if (extractedKeys?.transparent) {
      const transparentClass = this.transparentClasses?.[extractedKeys.transparent] || '';
      return [transparentClass];
    }

    // Use appearance (now includes link as an appearance option)
    const pickedAppearanceKey = extractedKeys?.appearance;
    if (pickedAppearanceKey) {
      const modes = this[pickedAppearanceKey];
      if (modes) {
        return ComponentKeys.mode.map(mode => modes[mode] || '');
      }
    }

    return [];
  }

  static createTheme(
    src: Partial<Record<ModeKey, Partial<Record<AppearanceKey, string>>>> = {},
  ): AppearanceTheme {
    const config = Object.fromEntries(
      ComponentKeys.appearance.map(textKey => [
        textKey,
        Object.fromEntries(
          ComponentKeys.mode.map(modeKey => [
            modeKey,
            src[modeKey]?.[textKey] || ''
          ])
        ),
      ])
    ) as Record<AppearanceKey, Record<ModeKey, string>>;

    return new AppearanceTheme(config, src.base);
  }

  static createLayoutBgTheme(): AppearanceTheme {
    // Creates a theme for layout backgrounds, replacing BgAppearanceTheme
    const config = Object.fromEntries(
      ComponentKeys.appearance.map(key => [
        key,
        {
          base: layoutBackgroundAppearanceClasses[key] || '',
          hover: '',
          active: '',
        }
      ])
    ) as Record<AppearanceKey, Record<ModeKey, string>>;

    return new AppearanceTheme(config, layoutBackgroundAppearanceClasses);
  }
}
