import { SizeKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { layoutGapClasses, uiGapClasses } from "../../classes/layoutClasses";

export class GapTheme extends BaseTheme implements Record<SizeKey, string> {
  /** Extra-small gap */
  xs: string;
  /** Small gap */
  sm: string;
  /** Medium gap */
  md: string;
  /** Large gap */
  lg: string;
  /** Extra-large gap */
  xl: string;

  private readonly gapVarClass: string;

  constructor(isUIComponent = false) {
    super();
    this.gapVarClass = isUIComponent ? "gap-(--ui-gap)" : "gap-(--gap)";
    
    const gapClasses = isUIComponent ? uiGapClasses : layoutGapClasses;
    this.xs = gapClasses.xs;
    this.sm = gapClasses.sm;
    this.md = gapClasses.md;
    this.lg = gapClasses.lg;
    this.xl = gapClasses.xl;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      const gapClass = this[extractedKeys?.size ?? 'md'];
      return gapClass ? [gapClass, this.gapVarClass] : [];
    }
    return [];
  }
}
