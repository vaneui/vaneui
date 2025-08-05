import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ComponentKeys, ModeKey, AppearanceKey } from "../../props";
import { layoutBackgroundAppearanceClasses } from "../../classes/appearanceClasses";

export interface AppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {
}

export class AppearanceTheme extends BaseTheme {
  private readonly transparentClassSource?: Record<string, string>;
  private readonly linkClassSource?: Record<string, string>;

  private constructor(
    config: Record<AppearanceKey, Record<ModeKey, string>>,
    options?: {
      transparentClassSource?: Record<string, string>;
      linkClassSource?: Record<string, string>;
    }
  ) {
    super();
    Object.assign(this, config);
    this.transparentClassSource = options?.transparentClassSource;
    this.linkClassSource = options?.linkClassSource;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    // Check for specific transparent or link styles first
    if (extractedKeys?.transparent) {
      const transparentClass = this.transparentClassSource?.[extractedKeys.transparent] || '';
      return [transparentClass];
    }
    
    if (extractedKeys?.link) {
      const linkClass = this.linkClassSource?.[extractedKeys.link] || '';
      return [linkClass];
    }
    
    // Use regular appearance
    const pickedAppearanceKey = extractedKeys?.appearance;
    if (!pickedAppearanceKey) {
      return [];
    }
    const modes = this[pickedAppearanceKey];
    if (!modes) {
      return [];
    }
    return ComponentKeys.mode.map(mode => modes[mode] || '');
  }

  static createTheme(
    src: Partial<Record<ModeKey, Partial<Record<AppearanceKey, string>>>> = {},
    options?: {
      transparentClassSource?: Record<string, string>;
      linkClassSource?: Record<string, string>;
    }
  ): AppearanceTheme {
    const finalConfig = Object.fromEntries(
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

    // Auto-detect base classes for transparent and link sources if not explicitly provided
    const baseClasses = src.base;
    const finalOptions = {
      transparentClassSource: options?.transparentClassSource || baseClasses,
      linkClassSource: options?.linkClassSource || baseClasses,
    };

    return new AppearanceTheme(finalConfig, finalOptions);
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

    return new AppearanceTheme(config, {
      transparentClassSource: layoutBackgroundAppearanceClasses,
      linkClassSource: layoutBackgroundAppearanceClasses
    });
  }
}
