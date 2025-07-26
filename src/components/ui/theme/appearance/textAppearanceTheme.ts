import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";
import { MODE_KEYS, ModeKey, APPEARANCE_KEYS, AppearanceKey, UI_ELEMENT_APPEARANCE_KEYS, UIElementAppearanceKey } from "../../props";

export interface TextAppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {
}

export interface UIElementTextAppearanceTheme extends Record<UIElementAppearanceKey, Record<ModeKey, string>> {
}

export class TextAppearanceTheme extends BaseTheme {
  private constructor(config: Record<AppearanceKey, Record<ModeKey, string>>) {
    super();
    Object.assign(this, config);
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const appearance = extractedKeys?.appearance as AppearanceKey;
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

export class UIElementTextAppearanceTheme extends BaseTheme {
  private constructor(config: Record<UIElementAppearanceKey, Record<ModeKey, string>>) {
    super();
    Object.assign(this, config);
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const appearance = extractedKeys?.appearance as UIElementAppearanceKey;
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
    src: Partial<Record<ModeKey, Partial<Record<UIElementAppearanceKey, string>>>> = {}
  ): UIElementTextAppearanceTheme {
    const finalConfig = Object.fromEntries(
      UI_ELEMENT_APPEARANCE_KEYS.map(textKey => [
        textKey,
        Object.fromEntries(
          MODE_KEYS.map(modeKey => [
            modeKey,
            src[modeKey]?.[textKey] || ''
          ])
        ),
      ])
    ) as Record<UIElementAppearanceKey, Record<ModeKey, string>>;

    return new UIElementTextAppearanceTheme(finalConfig);
  }
}