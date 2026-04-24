import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

/**
 * Applies per-item vertical spacing to a List.
 *
 * Emits three Tailwind sibling-margin selectors on the root list element:
 * - `[&>li:not(:first-child)]:mt-(--gap)` — space between sibling items.
 * - `[&>li>ul]:mt-(--gap)` / `[&>li>ol]:mt-(--gap)` — space between an item's
 *   inline content and a nested list, so "Parent" text sits a `--gap` above
 *   its nested items instead of collapsing onto them.
 *
 * Uses the same `--gap` CSS variable the layout components use via
 * `GapClassMapper`, so list spacing scales with the `size` prop without
 * needing its own unit table. A plain `gap-(--gap)` utility would not
 * work here: `<ul>` is not a flex container, and turning it into one
 * would interfere with `list-style-position` rendering.
 */
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
