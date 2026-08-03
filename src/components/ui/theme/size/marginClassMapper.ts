import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, MarginKey } from "../../props";

/**
 * Margin theme — external spacing driven by the size-aware `--margin` token
 * (which defaults to `--gap`), so margins scale with the component's size prop.
 * Composable: several side toggles apply together; noMargin resets to 0.
 */
export class MarginClassMapper extends BaseClassMapper implements Record<MarginKey, string> {
  /** All sides */
  margin: string = "m-(--margin)";
  /** Horizontal (inline) only */
  marginX: string = "mx-(--margin)";
  /** Vertical (block) only */
  marginY: string = "my-(--margin)";
  /** Top only */
  marginT: string = "mt-(--margin)";
  /** Bottom only */
  marginB: string = "mb-(--margin)";
  /** Reset to 0 */
  noMargin: string = "m-0";

  getClasses(extractedKeys: CategoryProps): string[] {
    // Composable: extractedKeys.margin may hold several space-joined side keys (or "noMargin").
    const value = extractedKeys?.margin;
    if (!value) return [];
    return value.split(' ').map(k => this[k as MarginKey]).filter(Boolean);
  }
}
