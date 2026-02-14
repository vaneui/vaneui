import { DisplayKey } from "../../props";
import { BaseClassMapper } from "../common";
import type { CategoryProps } from "../../props";

export class DisplayClassMapper extends BaseClassMapper implements Record<DisplayKey, string> {
  /** Inline display - element flows with text */
  inline: string = "inline";
  /** Block display - element takes full width */
  block: string = "block";
  /** Inline-block display - element flows with text but can have width/height */
  inlineBlock: string = "inline-block";
  /** Flex display - creates a flex container */
  flex: string = "flex";
  /** Inline-flex display - creates an inline flex container */
  inlineFlex: string = "inline-flex";
  /** Grid display - creates a grid container */
  grid: string = "grid";
  /** Inline-grid display - creates an inline grid container */
  inlineGrid: string = "inline-grid";
  /** Contents display - element's children behave as if they are direct children of the parent */
  contents: string = "contents";
  /** Table display - element behaves like a table */
  table: string = "table";
  /** Table-cell display - element behaves like a table cell */
  tableCell: string = "table-cell";
  /** Hidden display - element is completely removed from layout */
  hidden: string = "hidden";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.display && this[extractedKeys.display] ? this[extractedKeys.display] : ''];
  }
}