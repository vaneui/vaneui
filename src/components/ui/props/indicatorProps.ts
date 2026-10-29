/**
 * Indicator props: a line that marks the active item, drawn with inset shadows (no layout shift)
 */

export interface IndicatorProps {
  /** 1px rail on the start edge that turns into a 2px accent mark when active or selected */
  indicatorStart?: boolean;
  /** 1px accent bar on the bottom edge while active, for tab bars */
  indicatorBottom?: boolean;
}
