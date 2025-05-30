import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey, TEXT_APPEARANCE_KEYS, TextAppearanceKey } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";

export class TextAppearanceTheme extends BaseTheme {
  appearance: Record<TextAppearanceKey, Record<ModeKey, string>>;

  constructor(
    appearance: Record<TextAppearanceKey, Record<ModeKey, string>>
  ) {
    super();
    this.appearance = appearance;
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const appearance = pickKey(props, defaults, TEXT_APPEARANCE_KEYS, 'default')!;
    const theme = this.appearance[appearance];
    return MODE_KEYS.map(mode => theme[mode] || '');
  }

  static createDefaultStyle(src: Partial<Record<ModeKey, Partial<Record<TextAppearanceKey, string>>>>): TextAppearanceTheme {
    return new TextAppearanceTheme(Object.fromEntries(
        TEXT_APPEARANCE_KEYS.map((key) => {
          return [key, {
            base: src.base?.[key] || '',
            hover: src.hover?.[key] || '',
            active: src.active?.[key] || '',
          }];
        })
      ) as Record<TextAppearanceKey, Record<ModeKey, string>>
    );
  }
}
