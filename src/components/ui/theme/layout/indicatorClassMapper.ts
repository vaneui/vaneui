import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, IndicatorKey } from "../../props";

/** NavLink indicator as shadows: a start rail (2px accent when active), or a bottom bar. */
export class IndicatorClassMapper extends BaseClassMapper implements Record<IndicatorKey, string> {
  indicatorStart: string = "inset-shadow-[calc(var(--indicator-dir,1)*1px)_0_var(--divider-color)] data-active:inset-shadow-[calc(var(--indicator-dir,1)*2px)_0_var(--color-focus-accent)] aria-selected:inset-shadow-[calc(var(--indicator-dir,1)*2px)_0_var(--color-focus-accent)]";
  indicatorBottom: string = "data-active:inset-shadow-[0_-1px_var(--color-focus-accent)] data-active:shadow-[0_1px_var(--color-focus-accent)]";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.indicator ? [this[extractedKeys.indicator]] : [];
  }
}
