import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ModeKey, ComponentKeys } from "../../props";

export class RingTheme extends BaseTheme implements Record<ModeKey, string> {
  base: string = "ring ring-inset";
  hover: string = "hover:ring hover:ring-inset";
  active: string = "active:ring active:ring-inset";

  constructor(initial?: Partial<Record<ModeKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.mode.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const ring = extractedKeys?.ring;

    // Only apply ring classes if ring is explicitly true
    if (ring === 'ring') {
      return ComponentKeys.mode.map(mode => this[mode] || '').filter(Boolean);
    }

    return [];
  }
}