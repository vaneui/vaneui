import { DirectionKey, DIRECTION_KEYS,  DIRECTION_REVERSE_KEYS } from "../../props/propKeys";
import { directionClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class DirectionTheme implements BaseTheme {
  constructor(private classes: Record<DirectionKey, string> = directionClasses) {
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const reverse = pickKey(props, defaults, DIRECTION_REVERSE_KEYS);
    const direction = pickKey(props, defaults, DIRECTION_KEYS, 'column');

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
