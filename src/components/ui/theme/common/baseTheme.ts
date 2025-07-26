import type { BasePropsStructure } from '../../props';

/**
 * Base Theme class that all theme types will extend
 */
export abstract class BaseTheme {
  /**
   * Get CSS classes based on extracted keys
   * @param extractedKeys Pre-extracted keys from props and defaults
   * @returns CSS classes as an array of strings
   */
  abstract getClasses(extractedKeys: BasePropsStructure): string[];
}
