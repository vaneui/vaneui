import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

// `link` appearance uses cascading --link-text (lets <Link> in <Card filled> pick up surface-appropriate color).
// Explicit appearance overrides use --app-text directly because Link has no data-variant to drive --text-color.
export class LinkVariantClassMapper extends BaseClassMapper {
  linkClass: string = "text-(--link-text)";
  standardClass: string = "text-(--app-text)";

  getClasses(extractedKeys: CategoryProps): string[] {
    const appearance = extractedKeys?.appearance ?? 'link';
    return [appearance === 'link' ? this.linkClass : this.standardClass];
  }
}
