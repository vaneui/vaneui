import {
  SizeKey,
  ModeKey,
  AppearanceKey,
  ComponentKeys
} from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class ShadowAppearanceTheme extends BaseTheme implements Record<AppearanceKey, Record<SizeKey, Record<ModeKey, string>> | null> {
  default!: Record<SizeKey, Record<ModeKey, string>> | null;
  accent!: Record<SizeKey, Record<ModeKey, string>> | null;
  primary!: Record<SizeKey, Record<ModeKey, string>> | null;
  secondary!: Record<SizeKey, Record<ModeKey, string>> | null;
  tertiary!: Record<SizeKey, Record<ModeKey, string>> | null;
  success!: Record<SizeKey, Record<ModeKey, string>> | null;
  danger!: Record<SizeKey, Record<ModeKey, string>> | null;
  warning!: Record<SizeKey, Record<ModeKey, string>> | null;
  info!: Record<SizeKey, Record<ModeKey, string>> | null;
  link!: Record<SizeKey, Record<ModeKey, string>> | null;

  private static readonly defaultShadow: Record<SizeKey, Record<ModeKey, string>> = {
    xs: {base: "shadow-2xs", hover: "hover:shadow-xs", active: ""},
    sm: {base: "shadow-xs", hover: "hover:shadow-sm", active: ""},
    md: {base: "shadow-sm", hover: "hover:shadow-md", active: ""},
    lg: {base: "shadow-md", hover: "hover:shadow-lg", active: ""},
    xl: {base: "shadow-lg", hover: "hover:shadow-xl", active: ""}
  }

  private static readonly layoutShadow: Record<SizeKey, Record<ModeKey, string>> = {
    xs: {base: "shadow-2xs", hover: "", active: ""},
    sm: {base: "shadow-xs", hover: "", active: ""},
    md: {base: "shadow-sm", hover: "", active: ""},
    lg: {base: "shadow-md", hover: "", active: ""},
    xl: {base: "shadow-lg", hover: "", active: ""}
  }

  constructor(initial?: Partial<Record<AppearanceKey, Record<SizeKey, Record<ModeKey, string>> | null>>) {
    super();
    ComponentKeys.appearance.forEach((key) => {
      const initialAppearance = initial?.[key];
      this[key] = initialAppearance === undefined ? ShadowAppearanceTheme.defaultShadow : null;
    })
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const appearance = extractedKeys?.appearance ?? 'default';
    const size = extractedKeys?.size ?? 'md';
    const shadow = extractedKeys?.shadow;

    if (shadow === undefined || shadow === 'noShadow') {
      return [];
    }

    return ComponentKeys.mode.map(mode => this[appearance]?.[size]?.[mode] ?? "");
  }

  static createTheme(
    src: Partial<Record<AppearanceKey, Record<SizeKey, Record<ModeKey, string>> | null>> = {}
  ): ShadowAppearanceTheme {
    return new ShadowAppearanceTheme(src);
  }

  static createLayoutTheme(
    src: Partial<Record<AppearanceKey, Record<SizeKey, Record<ModeKey, string>> | null>> = {}
  ): ShadowAppearanceTheme {
    const theme = new ShadowAppearanceTheme(src);
    ComponentKeys.appearance.forEach((key) => {
      if (theme[key] === ShadowAppearanceTheme.defaultShadow) {
        theme[key] = ShadowAppearanceTheme.layoutShadow;
      }
    });
    return theme;
  }
}

