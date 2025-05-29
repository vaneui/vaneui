import { PositionKey, POSITION_KEYS } from "../../props/propKeys";
import { positionClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class PositionTheme extends BaseTheme {
  constructor(private classes: Record<PositionKey, string> = positionClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, POSITION_KEYS);
    return [key ? this.classes[key] : ''];
  }
}
