import { PositionKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface PositionTheme extends Record<PositionKey, string> {
}

export class PositionTheme extends BaseTheme {
  constructor(initialConfig?: Partial<Record<PositionKey, string>>) {
    super();
    ComponentKeys.position.forEach((key) => {
      this[key] = initialConfig?.[key] ?? {
        relative: "relative",
        absolute: "absolute",
        fixed: "fixed",
        sticky: "sticky",
        static: "static"
      }[key];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.position;
    return [key ? this[key] : ''];
  }
}
