import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ModeKey } from "../../props";
import { ModeKeys } from "../../props/mode";

export class RingTheme extends BaseTheme implements Record<ModeKey, string> {
  base: string = "ring ring-inset";
  hover: string = "";
  active: string = "";
  focus: string = "";
  focusVisible: string = "";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.ring === 'ring'
      ? ModeKeys.mode.map(mode => this[mode] || '').filter(Boolean)
      : [];
  }
}