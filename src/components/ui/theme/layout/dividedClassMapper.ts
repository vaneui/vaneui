import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, DividedKey } from "../../props";

/** Divided grid: each cell's outline fills a 1px gap; the line color resolves on the grid.
 *  A valid Input's wrapper span generates no box (display: contents), so a cell that is an Input
 *  takes the line on its <input>; :where() keeps that selector at the weight of `*:`.
 *  The classes are written out in full: the stylesheet build finds them by scanning this file. */
export class DividedClassMapper extends BaseClassMapper implements Record<DividedKey, string> {
  divided: string = "gap-px [--divided-color:var(--divider-color)] *:outline *:outline-(--divided-color) [&>:where(.vane-input-wrapper.contents)>*]:outline [&>:where(.vane-input-wrapper.contents)>*]:outline-(--divided-color)";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.divided ? [this[extractedKeys.divided]] : [];
  }
}
