import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey, TEXT_APPEARANCE_KEYS, TextAppearanceKey } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { textAppearanceClasses } from "../../classes/typographyClasses";

export interface TextAppearanceTheme extends Record<TextAppearanceKey, Record<ModeKey, string>> {}

export class TextAppearanceTheme extends BaseTheme {
  public static readonly defaultFullConfig: Record<TextAppearanceKey, Record<ModeKey, string>> =
    (() => {
      const config: Partial<Record<TextAppearanceKey, Record<ModeKey, string>>> = {};
      TEXT_APPEARANCE_KEYS.forEach((key: TextAppearanceKey) => {
        config[key] = {
          base: textAppearanceClasses[key] || '',
          hover: '',
          active: '',
        };
      });
      return config as Record<TextAppearanceKey, Record<ModeKey, string>>;
    })();

  constructor(initialOverrides?: Partial<Record<TextAppearanceKey, Partial<Record<ModeKey, string>>>>) {
    super();
    TEXT_APPEARANCE_KEYS.forEach((textKey: TextAppearanceKey) => {
      const defaultModesForKey = TextAppearanceTheme.defaultFullConfig[textKey];
      const overrideModesForKey = initialOverrides?.[textKey];
      this[textKey] = {
        ...defaultModesForKey,
        ...(overrideModesForKey || {}),
      };
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const pickedAppearanceKey = pickKey(props, defaults, TEXT_APPEARANCE_KEYS, 'default') as TextAppearanceKey;
    const modesForAppearance = this[pickedAppearanceKey];

    if (!modesForAppearance) {
      return MODE_KEYS.map(() => '');
    }
    return MODE_KEYS.map(mode => modesForAppearance[mode] || '');
  }


  static createDefaultStyle(
    src: Partial<Record<ModeKey, Partial<Record<TextAppearanceKey, string>>>> = {}
  ): TextAppearanceTheme {
    const initialOverridesForConstructor: Partial<Record<TextAppearanceKey, Partial<Record<ModeKey, string>>>> = {};

    TEXT_APPEARANCE_KEYS.forEach((textKey: TextAppearanceKey) => {
      const modesForCurrentTextKey: Partial<Record<ModeKey, string>> = {};
      let keyHasDataInSrc = false;

      MODE_KEYS.forEach((modeKey: ModeKey) => {
        const classValue = src[modeKey]?.[textKey];
        if (classValue !== undefined) {
          modesForCurrentTextKey[modeKey] = classValue;
          keyHasDataInSrc = true;
        }
      });

      if (keyHasDataInSrc) {
        initialOverridesForConstructor[textKey] = modesForCurrentTextKey;
      }
    });
    return new TextAppearanceTheme(initialOverridesForConstructor);
  }
}