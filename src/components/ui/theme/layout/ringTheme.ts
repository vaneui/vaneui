import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ModeKey } from "../../props";
import { ModeKeys } from "../../props/mode";

export class RingTheme extends BaseTheme implements Record<ModeKey, string> {
  /** Base ring styling - ring with inset positioning */
  base: string = "ring ring-inset";
  /** Ring styling on hover state */
  hover: string = "";
  /** Ring styling on active state */
  active: string = "";
  /** Ring styling on focus state */
  focus: string = "";
  /** Ring styling on focus-visible state for keyboard navigation */
  focusVisible: string = "";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.ring === 'ring'
      ? ModeKeys.mode.map(mode => this[mode] || '').filter(Boolean)
      : [];
  }
}