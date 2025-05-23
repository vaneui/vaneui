/**
 * Base Theme class that all theme types will extend
 */
export abstract class BaseTheme {
  /**
   * Get CSS classes based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  abstract getClasses(props: Record<string, any>): string[];
}
