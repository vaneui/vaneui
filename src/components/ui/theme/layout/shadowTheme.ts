import { SizeKey, SIZE_KEYS, SHADOW_KEYS, ModeKey, MODE_KEYS, ShadowKey } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface ShadowTheme extends Record<ShadowKey, Record<ModeKey, string | Record<SizeKey, string>>> {
}

export class ShadowTheme extends BaseTheme {
  public static readonly defaultClasses: Record<ShadowKey, Record<ModeKey, string | Record<SizeKey, string>>> = {
    shadow: {
      base: {
        xs: "shadow-2xs",
        sm: "shadow-xs",
        md: "shadow-sm",
        lg: "shadow-md",
        xl: "shadow-lg"
      },
      hover: {
        xs: "hover:shadow-xs",
        sm: "hover:shadow-sm",
        md: "hover:shadow-md",
        lg: "hover:shadow-lg",
        xl: "hover:shadow-xl"
      },
      active: {
        xs: "active:shadow-xs",
        sm: "active:shadow-sm",
        md: "active:shadow-md",
        lg: "active:shadow-lg",
        xl: "active:shadow-xl"
      },
    },
    noShadow: {
      base: "shadow-none",
      hover: "hover:shadow-none",
      active: "active:shadow-none",
    }
  };

  constructor(initial?: Partial<Record<ShadowKey, Record<ModeKey, string | Record<SizeKey, string>>>>) {
    super();
    SHADOW_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? ShadowTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickFirstTruthyKey(props, defaults, SIZE_KEYS) || 'md';
    const key = pickFirstTruthyKey(props, defaults, SHADOW_KEYS);

    if (key === undefined) {
      return [];
    }

    const isModeStringMap = MODE_KEYS.every(m => typeof this[key][m] === "string");

    return MODE_KEYS.map(mode => isModeStringMap
      ? (this[key] as Record<ModeKey, string>)[mode]
      : (this[key] as Record<ModeKey, Record<SizeKey, string>>)[mode][size]);
  }
}
