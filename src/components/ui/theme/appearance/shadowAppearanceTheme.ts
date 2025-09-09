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

  private static readonly defaultUIShadow: Record<SizeKey, Record<ModeKey, string>> = {
    xs: {base: "shadow-2xs", hover: "hover:shadow-xs", active: ""},
    sm: {base: "shadow-xs", hover: "hover:shadow-sm", active: ""},
    md: {base: "shadow-sm", hover: "hover:shadow-md", active: ""},
    lg: {base: "shadow-md", hover: "hover:shadow-lg", active: ""},
    xl: {base: "shadow-lg", hover: "hover:shadow-xl", active: ""}
  }

  private static readonly defaultLayoutShadow: Record<SizeKey, Record<ModeKey, string>> = {
    xs: {base: "shadow-2xs", hover: "", active: ""},
    sm: {base: "shadow-xs", hover: "", active: ""},
    md: {base: "shadow-sm", hover: "", active: ""},
    lg: {base: "shadow-md", hover: "", active: ""},
    xl: {base: "shadow-lg", hover: "", active: ""}
  }

  constructor(initial: Record<SizeKey, Record<ModeKey, string>>) {
    super();
    ComponentKeys.appearance.forEach((key) => {
      this[key] = initial;
    })
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const appearance = extractedKeys?.appearance ?? 'default';
    const size = extractedKeys?.size ?? 'md';
    const shadow = extractedKeys?.shadow;

    return shadow === undefined || shadow === 'noShadow'
      ? []
      : ComponentKeys.mode.map(mode => this[appearance]?.[size]?.[mode] ?? "");
  }

  static createUITheme(): ShadowAppearanceTheme {
    return new ShadowAppearanceTheme(ShadowAppearanceTheme.defaultUIShadow);
  }

  static createLayoutTheme(): ShadowAppearanceTheme {
    return new ShadowAppearanceTheme(ShadowAppearanceTheme.defaultLayoutShadow);
  }
}

