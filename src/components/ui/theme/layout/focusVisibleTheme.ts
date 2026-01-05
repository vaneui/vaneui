import { BaseTheme } from "../common/baseTheme";
import { CategoryProps, ModeKeys } from "../../props";
import { ModeKey } from "../../props";

export class FocusVisibleTheme extends BaseTheme implements Record<ModeKey, string> {
  /** Base focus-visible styling */
  base: string = "";
  /** Focus-visible styling on hover state */
  hover: string = "";
  /** Focus-visible styling on active state */
  active: string = "";
  /** Focus-visible styling on focus state */
  focus: string = "";
  /** Focus-visible styling for keyboard navigation - outline on focus */
  focusVisible: string = "focus-visible:outline-2 focus-visible:outline-offset-2";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.focusVisible === 'focusVisible'
      ? ModeKeys.mode.map(mode => this[mode] || '').filter(Boolean)
      : [];
  }
}