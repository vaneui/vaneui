import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey, TEXT_APPEARANCE_KEYS, TextAppearanceKey } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";

export interface TextAppearanceTheme extends Record<TextAppearanceKey, Record<ModeKey, string>> {
}

export class TextAppearanceTheme extends BaseTheme {
  private constructor(config: Record<TextAppearanceKey, Record<ModeKey, string>>) {
    super();
    Object.assign(this, config);
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const appearance = pickFirstTruthyKey(props, defaults, TEXT_APPEARANCE_KEYS);
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
    src: Partial<Record<ModeKey, Partial<Record<TextAppearanceKey, string>>>> = {}
  ): TextAppearanceTheme {
    const finalConfig = Object.fromEntries(
      TEXT_APPEARANCE_KEYS.map(textKey => [
        textKey,
        Object.fromEntries(
          MODE_KEYS.map(modeKey => [
            modeKey,
            src[modeKey]?.[textKey] || ''
          ])
        ),
      ])
    ) as Record<TextAppearanceKey, Record<ModeKey, string>>;

    return new TextAppearanceTheme(finalConfig);
  }
}