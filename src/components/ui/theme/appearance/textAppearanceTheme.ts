import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";
import { ComponentKeys, ModeKey, AppearanceKey, TransparentKey, LinkKey } from "../../props";
import { textAppearanceClasses } from "../../classes/typographyClasses";

export interface TextAppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {
}

export interface UIElementTextAppearanceTheme extends Record<AppearanceKey, Record<ModeKey, string>> {
}

export class TextAppearanceTheme extends BaseTheme {
  private constructor(config: Record<AppearanceKey, Record<ModeKey, string>>) {
    super();
    Object.assign(this, config);
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    // Check for specific transparent or link styles first
    if (extractedKeys?.transparent) {
      const transparentClass = textAppearanceClasses[extractedKeys.transparent as TransparentKey];
      return [transparentClass || ''];
    }
    
    if (extractedKeys?.link) {
      const linkClass = textAppearanceClasses[extractedKeys.link as LinkKey];
      return [linkClass || ''];
    }
    
    // Use regular appearance
    const pickedAppearanceKey = (extractedKeys?.appearance as AppearanceKey) ?? 'default';
    if (!pickedAppearanceKey) {
      return [];
    }
    const modes = this[pickedAppearanceKey];
    if (!modes) {
      return [];
    }
    return (ComponentKeys.mode as readonly ModeKey[]).map(mode => modes[mode] || '');
  }

  static createTheme(
    src: Partial<Record<ModeKey, Partial<Record<AppearanceKey, string>>>> = {}
  ): TextAppearanceTheme {
    const finalConfig = Object.fromEntries(
      (ComponentKeys.appearance as readonly AppearanceKey[]).map(textKey => [
        textKey,
        Object.fromEntries(
          (ComponentKeys.mode as readonly ModeKey[]).map(modeKey => [
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
    return (ComponentKeys.mode as readonly ModeKey[]).map(mode => modes[mode] || '');
  }

  static createTheme(
    src: Partial<Record<ModeKey, Partial<Record<AppearanceKey, string>>>> = {}
  ): UIElementTextAppearanceTheme {
    const finalConfig = Object.fromEntries(
      (ComponentKeys.appearance as readonly AppearanceKey[]).map(textKey => [
        textKey,
        Object.fromEntries(
          (ComponentKeys.mode as readonly ModeKey[]).map(modeKey => [
            modeKey,
            src[modeKey]?.[textKey] || ''
          ])
        ),
      ])
    ) as Record<AppearanceKey, Record<ModeKey, string>>;

    return new UIElementTextAppearanceTheme(finalConfig);
  }
}