import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ResponsiveBreakpointClassKey } from "../../props";

/**
 * Font size theme - applies text size using CSS variables.
 * Uses breakpoint-specific variables when responsive=true, otherwise uses simple --fs variable.
 * When inheritSize flag is active (and not overridden by responsive), emits
 * `text-(length:--fs-em)` which resolves to `calc(var(--fs-ratio, 1) * 1em)` —
 * so the element scales relative to its nearest typography ancestor. Default
 * --fs-ratio is 1 (same as parent); inline components like Code / Kbd override
 * it (e.g. 0.875) to render proportionally smaller inside whatever surrounds
 * them — body text, Title, SectionTitle, PageTitle.
 */
export class FontSizeClassMapper extends BaseClassMapper implements Record<ResponsiveBreakpointClassKey, string> {
  /** Base: apply font size using --fs (non-responsive) */
  base: string = "text-(length:--fs)";
  /** Desktop: apply font size using --fs-desktop */
  desktop: string = "text-(length:--fs-desktop)";
  /** Tablet: apply font size using --fs-tablet */
  tablet: string = "max-tablet:text-(length:--fs-tablet)";
  /** Mobile: apply font size using --fs-mobile */
  mobile: string = "max-mobile:text-(length:--fs-mobile)";
  /** Inherit: scale font-size relative to parent via --fs-ratio (default 1 = same as parent). */
  inherit: string = "text-(length:--fs-em)";

  getClasses(extractedKeys: CategoryProps): string[] {
    // Responsive overrides inheritSize: responsive components have deliberate
    // viewport-scaled size intent that should not be collapsed to inherited size.
    if (extractedKeys?.responsive === 'responsive') {
      return [this.desktop, this.tablet, this.mobile];
    }
    // inheritSize flag: cascade font-size from parent (decoupled from appearance)
    if (extractedKeys?.inheritSize === 'inheritSize') {
      return [this.inherit];
    }
    // Otherwise use simple --fs variable
    return [this.base];
  }
}
