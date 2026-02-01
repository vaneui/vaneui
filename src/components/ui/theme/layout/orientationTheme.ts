import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/** Orientation keys for horizontal/vertical layout */
export type OrientationKey = 'horizontal' | 'vertical';

/**
 * OrientationTheme handles orientation styling for components like Divider.
 * Defaults to horizontal when no orientation is specified.
 */
export class OrientationTheme extends BaseTheme implements Record<OrientationKey, string> {
  /** Horizontal orientation (default) */
  horizontal: string = "h-(--bw) w-full";
  /** Vertical orientation */
  vertical: string = "w-(--bw) h-full";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const orientationValue = extractedKeys?.orientation;

    if (orientationValue && orientationValue in this) {
      classes.push(this[orientationValue as OrientationKey]);
    }
    // Note: Default to horizontal is handled by themeDefaults

    return classes;
  }
}
