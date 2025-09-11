import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ModeKey, ComponentKeys } from "../../props";

export class FocusVisibleTheme extends BaseTheme implements Record<ModeKey, string> {
  base: string = "";
  hover: string = "";
  active: string = "";
  focus: string = "";
  focusVisible: string = "focus-visible:outline-2 focus-visible:outline-offset-4";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.focusVisible === 'focusVisible'
      ? ComponentKeys.mode.map(mode => this[mode] || '').filter(Boolean)
      : [];
  }
}