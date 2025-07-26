import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";
import { ModeKey, BorderKey, ComponentKeys } from "../../props";

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
    ComponentKeys.border.forEach((key) => {
      this[key as BorderKey] = {
        ...BorderTheme.defaultClasses[key as BorderKey],
        ...(initial?.[key as BorderKey] || {}),
      };
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.border as BorderKey;
    if (!key || !this[key]) {
      return ComponentKeys.mode.map(() => '');
    }

    return ComponentKeys.mode.map(mode => this[key][mode as ModeKey] || '');
  }
}
