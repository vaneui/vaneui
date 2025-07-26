import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";
import { MODE_KEYS, ModeKey, BORDER_KEYS, BorderKey } from "../../props";

export interface BorderTheme extends Record<BorderKey, Record<ModeKey, string>> {}

export class BorderTheme extends BaseTheme {
  public static readonly defaultClasses: Record<BorderKey, Record<ModeKey, string>> = {
    border: {
      base: "border",
      hover: "hover:border",
      active: "active:border",
    },
    noBorder: {
      base: "",
      hover: "",
      active: "",
    },
    //noBorder: {
    //  base: "border-none",
    //  hover: "hover:border-none",
    //  active: "active:border-none",
    //},
  };

  constructor(initial?: Partial<Record<BorderKey, Record<ModeKey, string>>>) {
    super();
    BORDER_KEYS.forEach((key: BorderKey) => {
      this[key] = {
        ...BorderTheme.defaultClasses[key],
        ...(initial?.[key] || {}),
      };
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.border as BorderKey;
    if (!key || !this[key]) {
      return MODE_KEYS.map(() => '');
    }

    return MODE_KEYS.map(mode => this[key][mode] || '');
  }
}
