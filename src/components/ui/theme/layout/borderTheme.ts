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

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, BORDER_KEYS) as BorderKey | undefined;
    if (!key || !this[key]) {
      return MODE_KEYS.map(() => '');
    }

    return MODE_KEYS.map(mode => this[key][mode] || '');
  }
}
