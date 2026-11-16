import { CategoryProps } from "../../props";

const NO_CLASSES: readonly string[] = [];

export abstract class BaseClassMapper {
  abstract getClasses(extractedKeys: CategoryProps): string[];

  /**
   * The classes of this mapper that only repeat its value below a breakpoint
   * (`max-tablet:py-(--py-tablet)` next to `py-(--py-desktop)`). They are one value to the
   * user, so a `className` that overrides the value takes them out as well. None by default.
   */
  responsiveClasses(): readonly string[] {
    return NO_CLASSES;
  }
}
