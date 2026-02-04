import { CategoryProps } from "../../props";

/**
 * Base class for all property-specific class mappers.
 * ClassMappers transform component props into CSS class strings.
 */
export abstract class BaseClassMapper {
  /**
   * Get CSS classes based on extracted keys
   * @param extractedKeys Pre-extracted keys from props and defaults
   * @returns CSS classes as an array of strings
   */
  abstract getClasses(extractedKeys: CategoryProps): string[];
}
