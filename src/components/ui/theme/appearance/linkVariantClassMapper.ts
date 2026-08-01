import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

// Link with no explicit appearance uses cascading --link-text (surface-appropriate); explicit appearance uses --app-text.
export class LinkVariantClassMapper extends BaseClassMapper {
  linkClass: string = "text-(--link-text)";
  standardClass: string = "text-(--app-text)";

  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.appearance ? this.standardClass : this.linkClass];
  }
}
