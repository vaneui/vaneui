import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ModeKey } from "../../props";
import { ModeKeys } from "../../props/mode";

export class FocusVisibleTheme extends BaseTheme implements Record<ModeKey, string> {
  base: string = "";
  hover: string = "";
  active: string = "";
  focus: string = "";
  focusVisible: string = "focus-visible:outline-2 focus-visible:outline-offset-2";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.focusVisible === 'focusVisible'
      ? ModeKeys.mode.map(mode => this[mode] || '').filter(Boolean)
      : [];
  }
}