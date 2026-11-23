import type { CategoryProps, SkeletonKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";

/**
 * Loading placeholder. The look lives in rules.css, keyed on the `data-skeleton` attribute that
 * ComponentTheme sets (with `aria-busy`; ThemedComponent adds `inert`), because a container in
 * the skeleton state turns the components inside it into placeholders too. The class here only
 * stops text selection on the placeholder.
 */
export class SkeletonClassMapper extends BaseClassMapper implements Record<SkeletonKey, string> {
  /** No text selection while the content is a placeholder */
  skeleton: string = "select-none";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.skeleton ? [this.skeleton] : [];
  }
}
