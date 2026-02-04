import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, LetterSpacingKey } from "../../props";

/**
 * LetterSpacingClassMapper handles letter-spacing/tracking for typography components.
 */
export class LetterSpacingClassMapper extends BaseClassMapper implements Record<LetterSpacingKey, string> {
  /** Tighter letter spacing (-0.05em) */
  trackingTighter: string = "tracking-tighter";
  /** Tight letter spacing (-0.025em) */
  trackingTight: string = "tracking-tight";
  /** Normal letter spacing (0) */
  trackingNormal: string = "tracking-normal";
  /** Wide letter spacing (0.025em) */
  trackingWide: string = "tracking-wide";
  /** Wider letter spacing (0.05em) */
  trackingWider: string = "tracking-wider";
  /** Widest letter spacing (0.1em) */
  trackingWidest: string = "tracking-widest";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const letterSpacingValue = extractedKeys?.letterSpacing;

    if (letterSpacingValue && letterSpacingValue in this) {
      classes.push(this[letterSpacingValue as LetterSpacingKey]);
    }

    return classes;
  }
}
