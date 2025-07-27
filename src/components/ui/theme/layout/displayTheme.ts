import { DisplayKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

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
    ComponentKeys.display.forEach((key) => {
      this[key as DisplayKey] = initialConfig?.[key as DisplayKey] ?? DisplayTheme.defaultClasses[key as DisplayKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.display as DisplayKey;
    return [key && this[key] ? this[key] : ''];
  }
}