/**
 * Base Theme class that all theme types will extend
 */
export abstract class BaseTheme {
  /**
   * Get CSS classes based on props
   * @param props Component props (only the real props the user passed)
   * @param defaults Component-level defaults
   * @returns CSS classes as an array of strings
   */
  abstract getClasses(
    props: Record<string, boolean>,
    defaults: Record<string, boolean>
  ): string[];
}
