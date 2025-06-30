import {
  FlexDirectionKey,
  FLEX_DIRECTION_KEYS,
  DIRECTION_REVERSE_KEYS,
} from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface DirectionTheme extends Record<FlexDirectionKey, string> {
}

export class DirectionTheme extends BaseTheme {
  public static readonly defaultClasses: Record<FlexDirectionKey, string> = {
    row: "flex-row",
    column: "flex-col",
    rowReverse: "flex-row-reverse",
    columnReverse: "flex-col-reverse",
  };

  constructor(initial?: Partial<Record<FlexDirectionKey, string>>) {
    super();
    FLEX_DIRECTION_KEYS.forEach((key: FlexDirectionKey) => {
      this[key] = initial?.[key] || DirectionTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    let direction = pickFirstTruthyKey(props, defaults, FLEX_DIRECTION_KEYS) || 'column';
    const reverse = pickFirstTruthyKey(props, defaults, DIRECTION_REVERSE_KEYS);

    if (reverse) {
      switch (direction) {
        case "column": direction = "columnReverse"; break;
        case "row": direction = "rowReverse"; break;
        default: break;
      }
    }

    return direction ? [this[direction]] : [];
  }
}
