import { BaseTheme } from "../common/baseTheme";
import { ModeTheme } from "../common/modeTheme";
import { TEXT_APPEARANCE_KEYS, TextAppearanceKey } from "../../props/propKeys";
import { pickKey } from "../../../utils/componentUtils";
import { Mode } from "../../props/mode";
import { TextAppearanceProps } from "../../props/props";

export class AppearanceTheme extends BaseTheme {
  appearance: Record<TextAppearanceKey, ModeTheme>;

  constructor(
    appearance: Record<TextAppearanceKey, ModeTheme>
  ) {
    super();
    this.appearance = appearance;
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const appearance = pickKey(props, defaults, TEXT_APPEARANCE_KEYS, 'default')!;
    const theme = this.appearance[appearance];
    return theme?.getClasses(props, defaults) ?? [];
  }

  /**
   * Creates a default style with standard AppearanceTheme configuration
   */
  static createDefaultStyle(src: Partial<Record<Mode, Partial<Record<keyof TextAppearanceProps, string>>>>): AppearanceTheme {
    return new AppearanceTheme(Object.fromEntries(
        TEXT_APPEARANCE_KEYS.map((key) => {
          const theme =
            new ModeTheme({
                base: src.base?.[key] || '',
                hover: src.hover?.[key] || '',
                active: src.active?.[key] || '',
              }
            );
          return [key, theme];
        })
      ) as Record<TextAppearanceKey, ModeTheme>
    );
  }
}
