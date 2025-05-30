import { BaseTheme } from "../common/baseTheme";
import {
  APPEARANCE_KEYS,
  AppearanceKey,
  MODE_KEYS,
  ModeKey,
  TextAppearanceKey
} from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";

export class LayoutAppearanceTheme extends BaseTheme {
  appearance: Record<AppearanceKey, Record<ModeKey, string>>;

  constructor(
    appearance: Record<AppearanceKey, Record<ModeKey, string>>
  ) {
    super();
    this.appearance = appearance;
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const appearance = pickKey(props, defaults, APPEARANCE_KEYS, 'default')!;
    const theme = this.appearance[appearance];
    return MODE_KEYS.map(mode => theme[mode] || '');
  }

  static createDefaultStyle(src: Partial<Record<ModeKey, Partial<Record<TextAppearanceKey, string>>>>): LayoutAppearanceTheme {
    return new LayoutAppearanceTheme(Object.fromEntries(
      APPEARANCE_KEYS.map((key) => {
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
