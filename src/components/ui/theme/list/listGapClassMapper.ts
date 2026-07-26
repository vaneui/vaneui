import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

/* Per-item List spacing via sibling-margin selectors reading --gap, so it scales with size. A plain gap utility can't: <ul> isn't a flex container, and making it one breaks list-style-position. */
export class ListGapClassMapper extends BaseClassMapper {
  /** Sibling margin + nested-list margin using the shared --gap CSS variable */
  base: string = '[&>li:not(:first-child)]:mt-(--gap) [&>li>ul]:mt-(--gap) [&>li>ol]:mt-(--gap)';

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      return [this.base];
    }
    return [];
  }
}
