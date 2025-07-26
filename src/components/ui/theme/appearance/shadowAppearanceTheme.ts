import {
  SizeKey,
  ModeKey,
  AppearanceKey,
  ComponentKeys
} from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

export interface ShadowAppearanceTheme extends Record<AppearanceKey, Record<SizeKey, Record<ModeKey, string>> | null> {
}


export class ShadowAppearanceTheme extends BaseTheme {
  private static readonly defaultShadow: Record<SizeKey, Record<ModeKey, string>> = {
    xs: {base: "shadow-2xs", hover: "hover:shadow-xs", active: ""},
    sm: {base: "shadow-xs", hover: "hover:shadow-sm", active: ""},
    md: {base: "shadow-sm", hover: "hover:shadow-md", active: ""},
    lg: {base: "shadow-md", hover: "hover:shadow-lg", active: ""},
    xl: {base: "shadow-lg", hover: "hover:shadow-xl", active: ""}
  }

  constructor(initial?: Partial<Record<AppearanceKey, Record<SizeKey, Record<ModeKey, string>> | null>>) {
    super();
    ComponentKeys.appearance.forEach((key) => {
      const initialAppearance = initial?.[key as AppearanceKey];
      this[key as AppearanceKey] = initialAppearance === undefined ? ShadowAppearanceTheme.defaultShadow : null;
    })
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const appearance = (extractedKeys?.appearance as AppearanceKey) ?? 'default';
    const size = (extractedKeys?.size as SizeKey) ?? 'md';
    const key = extractedKeys?.shadow;

    if (key === undefined || key === 'noShadow') {
      return [];
    }

    return ComponentKeys.mode.map(mode => this[appearance]?.[size]?.[mode as ModeKey] ?? "");
  }

  static createTheme(
    src: Partial<Record<AppearanceKey, Record<SizeKey, Record<ModeKey, string>> | null>> = {}
  ): ShadowAppearanceTheme {
    return new ShadowAppearanceTheme(src);
  }
}

