import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey, APPEARANCE_KEYS, AppearanceKey } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";

export interface TextAppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {
}

export class TextAppearanceTheme extends BaseTheme {
  private constructor(config: Record<AppearanceKey, Record<ModeKey, string>>) {
    super();
    Object.assign(this, config);
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const appearance = pickFirstTruthyKey(props, defaults, APPEARANCE_KEYS);
    if (!appearance) {
      return [];
    }
    const modes = this[appearance];
    if (!modes) {
      return [];
    }
    return MODE_KEYS.map(mode => modes[mode] || '');
  }

  static createTheme(
    src: Partial<Record<ModeKey, Partial<Record<AppearanceKey, string>>>> = {}
  ): TextAppearanceTheme {
    const finalConfig = Object.fromEntries(
      APPEARANCE_KEYS.map(textKey => [
        textKey,
        Object.fromEntries(
          MODE_KEYS.map(modeKey => [
            modeKey,
            src[modeKey]?.[textKey] || ''
          ])
        ),
      ])
    ) as Record<AppearanceKey, Record<ModeKey, string>>;

    return new TextAppearanceTheme(finalConfig);
  }
}