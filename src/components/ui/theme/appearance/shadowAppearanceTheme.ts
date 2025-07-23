import {
  SizeKey,
  SIZE_KEYS,
  SHADOW_KEYS,
  ModeKey,
  MODE_KEYS,
  BG_APPEARANCE_KEYS,
  BgAppearanceKey
} from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface ShadowAppearanceTheme extends Record<BgAppearanceKey, Record<SizeKey, Record<ModeKey, string>> | null> {
}

export class ShadowAppearanceTheme extends BaseTheme {
  private static readonly defaultShadow: Record<SizeKey, Record<ModeKey, string>> = {
    xs: {base: "shadow-2xs", hover: "hover:shadow-xs", active: ""},
    sm: {base: "shadow-xs", hover: "hover:shadow-sm", active: ""},
    md: {base: "shadow-sm", hover: "hover:shadow-md", active: ""},
    lg: {base: "shadow-md", hover: "hover:shadow-lg", active: ""},
    xl: {base: "shadow-lg", hover: "hover:shadow-xl", active: ""}
  }

  constructor(initial?: Partial<Record<BgAppearanceKey, Record<SizeKey, Record<ModeKey, string>> | null>>) {
    super();
    BG_APPEARANCE_KEYS.forEach((key) => {
      const initialAppearance = initial?.[key];
      this[key] = initialAppearance === undefined ? ShadowAppearanceTheme.defaultShadow : null;
    })
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const appearance = pickFirstTruthyKey(props, defaults, BG_APPEARANCE_KEYS) || 'default';
    const size = pickFirstTruthyKey(props, defaults, SIZE_KEYS) || 'md';
    const key = pickFirstTruthyKey(props, defaults, SHADOW_KEYS);

    if (key === undefined || key === 'noShadow') {
      return [];
    }

    return MODE_KEYS.map(mode => this[appearance]?.[size]?.[mode] ?? "");
  }

  static createTheme(
    src: Partial<Record<BgAppearanceKey, Record<SizeKey, Record<ModeKey, string>> | null>> = {}
  ): ShadowAppearanceTheme {
    return new ShadowAppearanceTheme(src);
  }
}
