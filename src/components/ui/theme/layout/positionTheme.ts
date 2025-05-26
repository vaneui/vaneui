import { PositionKey, POSITION_KEYS } from "../../props/propKeys";
import { positionClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class PositionTheme implements BaseTheme {
  constructor(private classes: Record<PositionKey, string> = positionClasses) {
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const key = pickKey(props, defaults, POSITION_KEYS);
    return [key ? this.classes[key] : ''];
  }
}
