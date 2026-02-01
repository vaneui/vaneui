import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/** Letter spacing keys for text tracking */
export type LetterSpacingKey = 'trackingTighter' | 'trackingTight' | 'trackingNormal' | 'trackingWide' | 'trackingWider' | 'trackingWidest';

/**
 * LetterSpacingTheme handles letter-spacing/tracking for typography components.
 */
export class LetterSpacingTheme extends BaseTheme implements Record<LetterSpacingKey, string> {
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
