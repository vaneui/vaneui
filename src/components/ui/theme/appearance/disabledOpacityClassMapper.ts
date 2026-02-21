import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, DisabledKey } from "../../props";

/**
 * DisabledOpacityClassMapper applies only opacity for disabled state.
 * Used on wrapper/container elements so the entire control appears dimmed.
 */
export class DisabledOpacityClassMapper extends BaseClassMapper implements Record<DisabledKey, string> {
  /** Disabled state - reduced opacity only */
  disabled: string = "opacity-50";

  getClasses(extractedKeys: CategoryProps): string[] {
    const value = extractedKeys?.disabled;

    if (value && value in this) {
      return [this[value as DisabledKey]];
    }

    return [];
  }
}
