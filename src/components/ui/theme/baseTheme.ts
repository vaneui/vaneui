import { Mode } from "../props/mode";

/**
 * Base Theme class that all theme types will extend
 */
export abstract class BaseTheme {
  /**
   * Get CSS classes based on props
   * @param props Component props
   * @param mode Current mode (base, hover, active)
   * @returns CSS classes as a string
   */
  abstract getClasses(props: Record<string, any>, mode?: Mode): string;
}