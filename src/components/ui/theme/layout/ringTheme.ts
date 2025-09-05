import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ModeKey, ComponentKeys } from "../../props";

export class RingTheme extends BaseTheme implements Record<ModeKey, string> {
  base: string = "ring ring-inset";
  hover: string = "";
  active: string = "";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.ring === 'ring'
      ? ComponentKeys.mode.map(mode => this[mode] || '').filter(Boolean)
      : [];
  }
}