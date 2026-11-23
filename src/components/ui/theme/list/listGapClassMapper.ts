import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, GapKey } from "../../props";

type FixedGapKey = Exclude<GapKey, 'gap' | 'noGap'>;

/* Per-item List spacing via sibling-margin selectors reading --gap, so it scales with size. A plain gap utility can't: <ul> isn't a flex container, and making it one breaks list-style-position.
   A fixed step (gapXs-gapXl) reads the ramp step instead. The classes are written out in full for the stylesheet scan. */
export class ListGapClassMapper extends BaseClassMapper implements Record<FixedGapKey, string> {
  /** Sibling margin + nested-list margin using the shared --gap CSS variable */
  base: string = '[&>li:not(:first-child)]:mt-(--gap) [&>li>ul]:mt-(--gap) [&>li>ol]:mt-(--gap)';
  gapXs: string = '[&>li:not(:first-child)]:mt-[calc(var(--gap-unit-xs)*var(--spacing))] [&>li>ul]:mt-[calc(var(--gap-unit-xs)*var(--spacing))] [&>li>ol]:mt-[calc(var(--gap-unit-xs)*var(--spacing))]';
  gapSm: string = '[&>li:not(:first-child)]:mt-[calc(var(--gap-unit-sm)*var(--spacing))] [&>li>ul]:mt-[calc(var(--gap-unit-sm)*var(--spacing))] [&>li>ol]:mt-[calc(var(--gap-unit-sm)*var(--spacing))]';
  gapMd: string = '[&>li:not(:first-child)]:mt-[calc(var(--gap-unit-md)*var(--spacing))] [&>li>ul]:mt-[calc(var(--gap-unit-md)*var(--spacing))] [&>li>ol]:mt-[calc(var(--gap-unit-md)*var(--spacing))]';
  gapLg: string = '[&>li:not(:first-child)]:mt-[calc(var(--gap-unit-lg)*var(--spacing))] [&>li>ul]:mt-[calc(var(--gap-unit-lg)*var(--spacing))] [&>li>ol]:mt-[calc(var(--gap-unit-lg)*var(--spacing))]';
  gapXl: string = '[&>li:not(:first-child)]:mt-[calc(var(--gap-unit-xl)*var(--spacing))] [&>li>ul]:mt-[calc(var(--gap-unit-xl)*var(--spacing))] [&>li>ol]:mt-[calc(var(--gap-unit-xl)*var(--spacing))]';

  getClasses(extractedKeys: CategoryProps): string[] {
    const gap = extractedKeys?.gap;
    if (gap === 'gap') {
      return [this.base];
    }
    if (gap !== undefined && gap !== 'noGap') {
      return [this[gap]];
    }
    return [];
  }
}
