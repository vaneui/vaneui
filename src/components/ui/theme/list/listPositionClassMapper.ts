import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";
import { ListPositionKey } from "../../props";

/**
 * Maps the mutually-exclusive `inside` / `outside` boolean props to
 * Tailwind `list-inside` / `list-outside` utilities (controls the
 * CSS `list-style-position` property).
 *
 * Returns `[]` when neither is set so the component's base class /
 * component defaults retain full control.
 */
export class ListPositionClassMapper extends BaseClassMapper implements Record<ListPositionKey, string> {
  /** Markers rendered inside the content area (wraps with text) */
  inside: string = 'list-inside';
  /** Markers hanging outside the content area (traditional) */
  outside: string = 'list-outside';

  getClasses(extractedKeys: CategoryProps): string[] {
    const p = extractedKeys?.listPosition;
    if (p !== undefined) {
      return [this[p]];
    }
    return [];
  }
}
