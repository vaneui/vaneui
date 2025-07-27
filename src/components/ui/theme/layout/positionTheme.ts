import { PositionKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface PositionTheme extends Record<PositionKey, string> {
}

export class PositionTheme extends BaseTheme {
  public static readonly defaultClasses: Record<PositionKey, string> = {
    relative: "relative",
    absolute: "absolute",
    fixed: "fixed",
    sticky: "sticky",
    static: "static"
  };

  constructor(initialConfig?: Partial<Record<PositionKey, string>>) {
    super();
    ComponentKeys.position.forEach((key) => {
      this[key as PositionKey] = initialConfig?.[key as PositionKey] ?? PositionTheme.defaultClasses[key as PositionKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.position;
    return [key ? this[key] : ''];
  }
}
