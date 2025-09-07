import { PositionKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class PositionTheme extends BaseTheme implements Record<PositionKey, string> {
  relative: string = "relative";
  absolute: string = "absolute";
  fixed: string = "fixed";
  sticky: string = "sticky";
  static: string = "static";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.position ? this[extractedKeys.position] : ''];
  }
}
