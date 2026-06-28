import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, MarginKey } from "../../props";

/**
 * Margin theme — external spacing driven by the size-aware --gap value, so
 * margins scale with the component's size prop (like gap/padding).
 */
export class MarginClassMapper extends BaseClassMapper implements Record<MarginKey, string> {
  /** All sides */
  margin: string = "m-(--gap)";
  /** Horizontal (inline) only */
  marginX: string = "mx-(--gap)";
  /** Vertical (block) only */
  marginY: string = "my-(--gap)";
  /** Reset to 0 */
  noMargin: string = "m-0";

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.margin;
    if (key === 'margin') return [this.margin];
    if (key === 'marginX') return [this.marginX];
    if (key === 'marginY') return [this.marginY];
    if (key === 'noMargin') return [this.noMargin];
    return [];
  }
}
