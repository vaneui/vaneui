import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

/**
 * Applies per-item vertical spacing to a List by emitting a Tailwind
 * sibling-margin selector on direct `<li>` children.
 *
 * Uses the same `--gap` CSS variable the layout components use via
 * `GapClassMapper`, so list spacing scales with the `size` prop without
 * needing its own unit table. A plain `gap-(--gap)` utility would not
 * work here: `<ul>` is not a flex container, and turning it into one
 * would interfere with `list-style-position` rendering.
 */
export class ListGapClassMapper extends BaseClassMapper {
  /** Sibling margin using the shared --gap CSS variable */
  base: string = '[&>li:not(:first-child)]:mt-(--gap)';

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      return [this.base];
    }
    return [];
  }
}
