import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, StrongBorderKey } from "../../props";

/** Strong border: points the border at the appearance's focus color (the 600 step in light mode). */
export class StrongBorderClassMapper extends BaseClassMapper implements Record<StrongBorderKey, string> {
  strongBorder: string = "[--border-color:var(--focus-color)]";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.strongBorder ? [this[extractedKeys.strongBorder]] : [];
  }
}
