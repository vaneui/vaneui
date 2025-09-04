import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ModeKey, BorderKey, ComponentKeys } from "../../props";

export interface BorderTheme extends Record<ModeKey, string> {}

export class BorderTheme extends BaseTheme {
  constructor(initial?: Partial<Record<ModeKey, string>>) {
    super();
    ComponentKeys.mode.forEach((key) => {
      this[key] = initial?.[key] ?? {
        base: "border",
        hover: "",
        active: "",
      }[key];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const border = extractedKeys?.border;

    // If noBorder is true, return empty array (no border classes)
    if (border === 'noBorder') {
      return [];
    }

    // Only apply border classes if border is explicitly true
    if (border === 'border') {
      return ComponentKeys.mode.map(mode => this[mode] || '').filter(Boolean);
    }

    return [];
  }
}
