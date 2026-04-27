import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, TransitionKey } from "../../props";

/**
 * Transition theme for controlling animation/transition effects.
 * Default transition reads duration and easing from --transition-duration
 * and --transition-timing CSS vars (defined in tokens.css), so consumers
 * can retune them globally with a single :root override.
 */
export class TransitionClassMapper extends BaseClassMapper implements Record<TransitionKey, string> {
  /** Enable transitions - smooth state changes */
  transition: string = "transition-all duration-(--transition-duration) ease-(--transition-timing)";
  /** Disable transitions - instant state changes (useful for reduced-motion) */
  noTransition: string = "transition-none";

  getClasses(extractedKeys: CategoryProps): string[] {
    const transition = extractedKeys?.transition;
    if (transition === 'noTransition') {
      return [this.noTransition];
    }
    return transition === 'transition' ? [this.transition] : [];
  }
}
