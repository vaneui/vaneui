import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";
import { BorderKey, BORDER_KEYS } from "../../props";

export class BorderClassMapper extends BaseClassMapper implements Record<BorderKey, string> {
  /** Show border - adds appearance-based border styling */
  border: string = "border-[length:var(--bw)]";
  /** Show top border */
  borderT: string = "border-t-[length:var(--bw)]";
  /** Show bottom border */
  borderB: string = "border-b-[length:var(--bw)]";
  /** Show left border */
  borderL: string = "border-l-[length:var(--bw)]";
  /** Show right border */
  borderR: string = "border-r-[length:var(--bw)]";
  /** Show horizontal borders (left and right) */
  borderX: string = "border-x-[length:var(--bw)]";
  /** Show vertical borders (top and bottom) */
  borderY: string = "border-y-[length:var(--bw)]";
  /** Show inline-start border (left in LTR, right in RTL) */
  borderStart: string = "border-s-[length:var(--bw)]";
  /** Show inline-end border (right in LTR, left in RTL) */
  borderEnd: string = "border-e-[length:var(--bw)]";

  getClasses(extractedKeys: CategoryProps): string[] {
    // Composable: extractedKeys.border may hold several space-joined side keys (or "noBorder", which emits nothing).
    const value = extractedKeys?.border;
    if (!value) return [];

    const classes: string[] = [];
    for (const key of value.split(' ')) {
      if (key !== 'noBorder' && BORDER_KEYS.includes(key as BorderKey)) {
        classes.push(this[key as BorderKey]);
      }
    }
    return classes;
  }
}
