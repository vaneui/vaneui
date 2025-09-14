import { PositionKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class PositionTheme extends BaseTheme implements Record<PositionKey, string> {
  /** Relative positioning - positioned relative to its normal position */
  relative: string = "relative";
  /** Absolute positioning - positioned relative to its closest positioned ancestor */
  absolute: string = "absolute";
  /** Fixed positioning - positioned relative to the viewport */
  fixed: string = "fixed";
  /** Sticky positioning - toggles between relative and fixed based on scroll position */
  sticky: string = "sticky";
  /** Static positioning - default positioning, not affected by top/left/right/bottom */
  static: string = "static";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.position ? this[extractedKeys.position] : ''];
  }
}
