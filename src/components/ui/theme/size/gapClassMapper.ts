import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, GapKey, ResponsiveBreakpointClassKey } from "../../props";

type FixedGapKey = Exclude<GapKey, 'gap' | 'noGap'>;

/**
 * Gap theme - applies gap using CSS variables.
 * Uses breakpoint-specific variables when responsive=true, otherwise uses simple --gap variable.
 * A fixed step (gapXs-gapXl) reads the type's own ramp (--gap-unit-xs etc., set per
 * data-vane-type in rules.css), so it stays the same at every size and every width.
 * The classes are written out in full: the stylesheet build finds them by scanning this file.
 */
export class GapClassMapper extends BaseClassMapper implements Record<ResponsiveBreakpointClassKey | FixedGapKey, string> {
  /** Base: apply gap using --gap (non-responsive) */
  base: string = "gap-(--gap)";
  /** Desktop: apply gap using --gap-desktop */
  desktop: string = "gap-(--gap-desktop)";
  /** Tablet: apply gap using --gap-tablet */
  tablet: string = "max-tablet:gap-(--gap-tablet)";
  /** Mobile: apply gap using --gap-mobile */
  mobile: string = "max-mobile:gap-(--gap-mobile)";
  /** Fixed steps, whatever the component's size */
  gapXs: string = "gap-[calc(var(--gap-unit-xs)*var(--spacing))]";
  gapSm: string = "gap-[calc(var(--gap-unit-sm)*var(--spacing))]";
  gapMd: string = "gap-[calc(var(--gap-unit-md)*var(--spacing))]";
  gapLg: string = "gap-[calc(var(--gap-unit-lg)*var(--spacing))]";
  gapXl: string = "gap-[calc(var(--gap-unit-xl)*var(--spacing))]";

  responsiveClasses(): readonly string[] {
    return [this.tablet, this.mobile];
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const gap = extractedKeys?.gap;
    // a divided grid owns its 1px gap
    if (gap === undefined || gap === 'noGap' || extractedKeys?.divided) {
      return [];
    }
    if (gap !== 'gap') {
      return [this[gap]];
    }
    // Use breakpoint-specific classes if responsive=true
    if (extractedKeys?.responsiveSizing === 'responsiveSizing') {
      return [this.desktop, this.tablet, this.mobile];
    }
    // Otherwise use simple --gap variable
    return [this.base];
  }
}
