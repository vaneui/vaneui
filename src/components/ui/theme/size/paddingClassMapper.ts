import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

/**
 * Base padding theme - simplified to only output consumer classes.
 * CSS variable values are now set via CSS rules in vars.css using
 * semantic classes and data attributes.
 */
export class PaddingClassMapper extends BaseClassMapper {
  constructor() {
    super();
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      return [];
    }
    return [];
  }
}
