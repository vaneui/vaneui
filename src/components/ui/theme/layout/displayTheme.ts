import { DisplayKey, DISPLAY_KEYS } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface DisplayTheme extends Record<DisplayKey, string> {}

export class DisplayTheme extends BaseTheme {
  public static readonly defaultClasses: Record<DisplayKey, string> = {
    inline: "inline",
    block: "block",
    inlineBlock: "inline-block",
    flex: "flex",
    inlineFlex: "inline-flex",
    grid: "grid",
    inlineGrid: "inline-grid",
    contents: "contents",
    table: "table",
    tableCell: "table-cell",
    hidden: "hidden"
  };

  constructor(initialConfig?: Partial<Record<DisplayKey, string>>) {
    super();
    DISPLAY_KEYS.forEach((key) => {
      this[key] = initialConfig?.[key] ?? DisplayTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, DISPLAY_KEYS);
    return [key && this[key] ? this[key] : ''];
  }
}