import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, DotKey } from "../../props";

/**
 * Status dot drawn before a Badge's text, in the text color. It is a flex item,
 * so the Badge's gap spaces it from the text. With no text, the Badge itself
 * becomes the dot: an outline or ghost dot takes the text color, a filled one
 * keeps its fill.
 */
export class DotClassMapper extends BaseClassMapper implements Record<DotKey, string> {
  /** Leading dot, half the text size. `vane-badge-dot` keeps a dot-only Badge a dot in a skeleton. */
  dot: string = "vane-badge-dot before:content-[''] before:size-[0.5em] before:shrink-0 before:rounded-full before:bg-current empty:size-[0.625em] empty:p-0 empty:ring-0 empty:before:hidden empty:not-data-[variant=filled]:bg-current";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.dot ? [this.dot] : [];
  }
}
