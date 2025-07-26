import {
  FlexDirectionKey,
  FLEX_DIRECTION_KEYS,
  DIRECTION_REVERSE_KEYS,
} from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

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

  getClasses(extractedKeys: BasePropsStructure): string[] {
    let direction = (extractedKeys?.flexDirection as FlexDirectionKey) ?? 'column';
    const reverse = extractedKeys?.reverse;

    if (reverse === 'reverse') {
      switch (direction) {
        case "column": direction = "columnReverse"; break;
        case "row": direction = "rowReverse"; break;
        default: break;
      }
    }

    return direction ? [this[direction]] : [];
  }
}
