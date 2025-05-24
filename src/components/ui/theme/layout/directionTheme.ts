import { DirectionKey, DIRECTION_KEYS,  DIRECTION_REVERSE_KEYS } from "../../props/propKeys";
import { directionClasses } from "../../classes/layoutClasses";
import { pickFirstKeyOptional } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class DirectionTheme extends BaseTheme {
  constructor(private classes: Record<DirectionKey, string> = directionClasses) {
    super();
  }

  getClasses(props: Record<string, any>): string[] {
    const reverse = pickFirstKeyOptional(props, DIRECTION_REVERSE_KEYS);
    const direction = pickFirstKeyOptional(props, DIRECTION_KEYS) ?? 'column';

    if (reverse) {
      return direction === 'row' 
        ? ['flex-row-reverse'] 
        : direction === 'column' 
          ? ['flex-col-reverse'] 
          : [];
    }

    return direction ? [this.classes[direction]] : [];
  }
}
