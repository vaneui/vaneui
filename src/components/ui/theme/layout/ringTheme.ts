import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ModeKey, RingKey, ComponentKeys } from "../../props";

export interface RingTheme extends Record<ModeKey, string> {
}

export class RingTheme extends BaseTheme {
  public readonly defaultClasses: Record<ModeKey, string> = {
    base: "ring ring-inset",
    hover: "hover:ring hover:ring-inset",
    active: "active:ring active:ring-inset",
  };

  constructor(initial?: Partial<Record<ModeKey, string>>) {
    super();
    ComponentKeys.mode.forEach((key) => {
      this[key as ModeKey] = initial?.[key as ModeKey] ?? this.defaultClasses[key as ModeKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const ring = extractedKeys?.ring;

    // If noRing is true, return empty array (no ring classes)
    if (ring === 'noRing') {
      return [];
    }

    // Only apply ring classes if ring is explicitly true
    if (ring === 'ring') {
      return ComponentKeys.mode.map(mode => this[mode as ModeKey] || '').filter(Boolean);
    }

    return [];
  }
}