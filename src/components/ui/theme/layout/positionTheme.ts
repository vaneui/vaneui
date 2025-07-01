import { PositionKey, POSITION_KEYS } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

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

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, POSITION_KEYS);
    return [key ? this[key] : ''];
  }
}
