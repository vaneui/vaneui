import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, SrOnlyKey } from "../../props";

/**
 * Visually hidden content that screen readers still read. The class is a rule in rules.css,
 * unlayered, so a width, padding or margin utility on the same element (Text is w-fit)
 * cannot bring the content back into view.
 */
export class SrOnlyClassMapper extends BaseClassMapper implements Record<SrOnlyKey, string> {
  /** Hide visually, keep in the accessibility tree */
  srOnly: string = "vane-sr-only";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.srOnly ? [this.srOnly] : [];
  }
}
