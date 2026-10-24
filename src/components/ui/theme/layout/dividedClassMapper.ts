import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, DividedKey } from "../../props";

/** Divided grid: each cell's outline fills a 1px gap; the line color resolves on the grid. */
export class DividedClassMapper extends BaseClassMapper implements Record<DividedKey, string> {
  divided: string = "gap-px [--divided-color:var(--divider-color)] *:outline *:outline-(--divided-color)";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.divided ? [this[extractedKeys.divided]] : [];
  }
}
