import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ComponentKeys, ModeKey, AppearanceKey, TransparentKey, LinkKey } from "../../props";
import { textAppearanceClasses } from "../../classes/typographyClasses";

export interface TextAppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {
}

export class TextAppearanceTheme extends BaseTheme {
  private constructor(config: Record<AppearanceKey, Record<ModeKey, string>>) {
    super();
    Object.assign(this, config);
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    // Check for specific transparent or link styles first
    if (extractedKeys?.transparent) {
      const transparentClass = textAppearanceClasses[extractedKeys.transparent];
      return [transparentClass || ''];
    }
    
    if (extractedKeys?.link) {
      const linkClass = textAppearanceClasses[extractedKeys.link];
      return [linkClass || ''];
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
    src: Partial<Record<ModeKey, Partial<Record<AppearanceKey, string>>>> = {}
  ): TextAppearanceTheme {
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

    return new TextAppearanceTheme(finalConfig);
  }
}
