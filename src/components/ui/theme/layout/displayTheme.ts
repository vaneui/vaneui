import { DisplayKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class DisplayTheme extends BaseTheme implements Record<DisplayKey, string> {
  inline: string = "inline";
  block: string = "block";
  inlineBlock: string = "inline-block";
  flex: string = "flex";
  inlineFlex: string = "inline-flex";
  grid: string = "grid";
  inlineGrid: string = "inline-grid";
  contents: string = "contents";
  table: string = "table";
  tableCell: string = "table-cell";
  hidden: string = "hidden";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.display && this[extractedKeys.display] ? this[extractedKeys.display] : ''];
  }
}