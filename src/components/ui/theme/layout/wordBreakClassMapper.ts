import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, WordBreakKey } from "../../props";

/** Word break theme for controlling how text breaks to prevent overflow. */
export class WordBreakClassMapper extends BaseClassMapper implements Record<WordBreakKey, string> {
  breakNormal: string = "break-normal";
  breakWords: string = "break-words";
  breakAll: string = "break-all";
  breakKeep: string = "break-keep";

  getClasses(extractedKeys: CategoryProps): string[] {
    const wordBreak = extractedKeys?.wordBreak;
    return wordBreak ? [this[wordBreak]] : [];
  }
}
