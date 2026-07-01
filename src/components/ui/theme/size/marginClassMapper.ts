import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, MarginKey } from "../../props";

/**
 * Margin theme — external spacing driven by the size-aware `--margin` token
 * (which defaults to `--gap`), so margins scale with the component's size prop
 * like gap/padding, and can be overridden independently of the gap.
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
    const key = extractedKeys?.margin;
    if (key === 'margin') return [this.margin];
    if (key === 'marginX') return [this.marginX];
    if (key === 'marginY') return [this.marginY];
    if (key === 'marginT') return [this.marginT];
    if (key === 'marginB') return [this.marginB];
    if (key === 'noMargin') return [this.noMargin];
    return [];
  }
}
