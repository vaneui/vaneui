import { SizeKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

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

  constructor(gapClasses: Record<SizeKey, string>, isUIComponent: boolean = false) {
    super();
    this.gapVarClass = isUIComponent ? "gap-(--ui-gap)" : "gap-(--gap)";

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

  static createForUI(): GapTheme {
    return new GapTheme({
      xs: "[--gap-unit:1]",
      sm: "[--gap-unit:1.5]",
      md: "[--gap-unit:2]",
      lg: "[--gap-unit:2.5]",
      xl: "[--gap-unit:3]",
    }, true);
  }

  static createForLayout(): GapTheme {
    return new GapTheme({
      xs: "[--gap-unit:2]",
      sm: "[--gap-unit:3]",
      md: "[--gap-unit:4]",
      lg: "[--gap-unit:5]",
      xl: "[--gap-unit:6]",
    }, false);
  }
}
