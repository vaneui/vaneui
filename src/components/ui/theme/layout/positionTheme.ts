import { PositionKey, POSITION_KEYS } from "../../props/propKeys";
import { positionClasses } from "../../classes/layoutClasses";
import { pickFirstKeyOptional } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/BaseTheme";

export class PositionTheme extends BaseTheme {
  constructor(private classes: Record<PositionKey, string> = positionClasses) {
    super();
  }

  getClasses(props: Record<string, any>): string[] {
    const key = pickFirstKeyOptional(props, POSITION_KEYS);
    return key ? [this.classes[key]] : [];
  }
}
