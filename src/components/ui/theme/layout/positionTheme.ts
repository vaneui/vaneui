import { PositionKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class PositionTheme extends BaseTheme implements Record<PositionKey, string> {
  relative: string = "relative";
  absolute: string = "absolute";
  fixed: string = "fixed";
  sticky: string = "sticky";
  static: string = "static";

  constructor(initialConfig?: Partial<Record<PositionKey, string>>) {
    super();
    if (initialConfig) {
      ComponentKeys.position.forEach((key) => {
        if (initialConfig[key] !== undefined) {
          this[key] = initialConfig[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.position;
    return [key ? this[key] : ''];
  }
}
