import { BaseClassMapper } from "../common";
import type { CategoryProps, TransitionKey } from "../../props";

/**
 * Transition theme for controlling animation/transition effects.
 * Default transition uses duration from CSS variable for consistency.
 */
export class TransitionClassMapper extends BaseClassMapper implements Record<TransitionKey, string> {
  /** Enable transitions - smooth state changes */
  transition: string = "transition-all duration-200";
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
