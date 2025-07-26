import { PositionKey, POSITION_KEYS } from "../../props/keys";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

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
    POSITION_KEYS.forEach((key) => {
      this[key] = initialConfig?.[key] ?? PositionTheme.defaultClasses[key];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.position as PositionKey;
    return [key ? this[key] : ''];
  }
}
