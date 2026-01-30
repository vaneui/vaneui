import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Whitespace theme for controlling text wrapping behavior.
 */
export class WhitespaceTheme extends BaseTheme {
  /** No wrap - text stays on single line */
  whitespaceNowrap: string = "whitespace-nowrap";
  /** Normal wrapping - default browser behavior */
  whitespaceNormal: string = "whitespace-normal";
  /** Preserve whitespace and line breaks */
  whitespacePre: string = "whitespace-pre";
  /** Preserve whitespace, wrap text */
  whitespacePreWrap: string = "whitespace-pre-wrap";
  /** Preserve line breaks, collapse spaces, wrap text */
  whitespacePreLine: string = "whitespace-pre-line";
  /** Break words to prevent overflow */
  whitespaceBreakSpaces: string = "whitespace-break-spaces";

  getClasses(extractedKeys: CategoryProps): string[] {
    const whitespace = extractedKeys?.whitespace;
    return whitespace ? [this[whitespace]] : [];
  }
}
