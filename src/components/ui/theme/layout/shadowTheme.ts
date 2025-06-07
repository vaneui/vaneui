import { SizeKey, SIZE_KEYS, SHADOW_KEYS, ModeKey, MODE_KEYS, ShadowKey } from "../../props/keys";
import {
  shadowClasses,
  hoverShadowClasses,
  activeShadowClasses,
  noShadowModeClasses,
} from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface ShadowTheme extends Record<ShadowKey, Record<ModeKey, string | Record<SizeKey, string>>> {
}

export class ShadowTheme extends BaseTheme {
  public static readonly defaultClasses: Record<ShadowKey, Record<ModeKey, string | Record<SizeKey, string>>> = {
    shadow: {
      base: shadowClasses,
      hover: hoverShadowClasses,
      active: activeShadowClasses,
    },
    noShadow: noShadowModeClasses
  };

  constructor(initial?: Partial<Record<ShadowKey, Record<ModeKey, string | Record<SizeKey, string>>>>) {
    super();
    SHADOW_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? ShadowTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickKey(props, defaults, SIZE_KEYS) || 'md';
    const key = pickKey(props, defaults, SHADOW_KEYS);

    if (key === undefined) {
      return [];
    }

    const isModeStringMap = MODE_KEYS.every(m => typeof this[key][m] === "string");

    return MODE_KEYS.map(mode => isModeStringMap
      ? (this[key] as Record<ModeKey, string>)[mode]
      : (this[key] as Record<ModeKey, Record<SizeKey, string>>)[mode][size]);
  }
}
