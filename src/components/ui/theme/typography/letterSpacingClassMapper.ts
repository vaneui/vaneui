import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, LetterSpacingKey } from "../../props";

/**
 * LetterSpacingClassMapper handles letter-spacing/tracking for typography
 * components. Mirrors LineHeightClassMapper: emits the consumer class
 * `tracking-(--ls)` by default, where --ls is set per-component in rules.css.
 * When inheritSize is active (and not overridden by responsive), emits
 * `tracking-[inherit]` so letter-spacing cascades from the parent.
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

  /** Default consumer class — reads --ls set by component CSS rules. */
  defaultLetterSpacing: string = "tracking-(--ls)";
  /** Cascade letter-spacing from nearest typography ancestor. */
  inherit: string = "tracking-[inherit]";

  getClasses(extractedKeys: CategoryProps): string[] {
    const letterSpacingValue = extractedKeys?.letterSpacing;

    if (letterSpacingValue && letterSpacingValue in this) {
      return [this[letterSpacingValue as LetterSpacingKey]];
    }

    if (extractedKeys?.inheritSize === 'inheritSize' && extractedKeys?.responsive !== 'responsive') {
      return [this.inherit];
    }

    return [this.defaultLetterSpacing];
  }
}
