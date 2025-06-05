import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey, BORDER_KEYS, SizeKey, BorderKey, SIZE_KEYS } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { SizeTheme } from "../size/sizeTheme";

export interface BorderTheme extends Record<BorderKey, Record<ModeKey, string>> {}

export class BorderTheme extends BaseTheme {
  public static readonly defaultClasses: Record<BorderKey, Record<ModeKey, string>> = {
    border: {
      base: "border",
      hover: "hover:border",
      active: "active:border",
    },
    noBorder: {
      base: "border-none",
      hover: "hover:border-none",
      active: "active:border-none",
    },
  };

  constructor(initial?: Partial<Record<BorderKey, Record<ModeKey, string>>>) {
    super();
    BORDER_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? BorderTheme.defaultClasses[key];
    });
    BORDER_KEYS.forEach((key: BorderKey) => {
      const defaultModesForKey = BorderTheme.defaultClasses[key];
      const overrideModesForKey = initial?.[key];

      this[key] = {
        ...defaultModesForKey,
        ...(overrideModesForKey || {}),
      };
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, BORDER_KEYS) as BorderKey | undefined;
    if (!key) {
      return MODE_KEYS.map(() => '');
    }

    const modesForPickedKey = this[key];

    if (!modesForPickedKey)
      return MODE_KEYS.map(() => '');

    return MODE_KEYS.map(mode => modesForPickedKey[mode] || '');
  }
}
