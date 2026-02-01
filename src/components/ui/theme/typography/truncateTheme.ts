import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/** Truncate keys for text overflow control */
export type TruncateKey = 'truncate' | 'lineClamp2' | 'lineClamp3' | 'lineClamp4' | 'lineClamp5' | 'noTruncate';

export class TruncateTheme extends BaseTheme implements Record<TruncateKey, string> {
  /** Single line truncation with ellipsis */
  truncate: string = "truncate";
  /** Truncate at 2 lines */
  lineClamp2: string = "line-clamp-2";
  /** Truncate at 3 lines */
  lineClamp3: string = "line-clamp-3";
  /** Truncate at 4 lines */
  lineClamp4: string = "line-clamp-4";
  /** Truncate at 5 lines */
  lineClamp5: string = "line-clamp-5";
  /** No truncation (remove truncate) */
  noTruncate: string = "line-clamp-none";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const truncateValue = extractedKeys?.truncate;

    if (truncateValue && truncateValue in this) {
      classes.push(this[truncateValue as TruncateKey]);
    }

    return classes;
  }
}
