import { SizeKey, SIZE_KEYS, GAP_KEYS, GapKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

export interface GapTheme extends Record<GapKey, string | Record<SizeKey, string>> {
}

export class GapTheme extends BaseTheme {
  public static readonly defaultClasses: Record<GapKey, string | Record<SizeKey, string>> = {
    gap: {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
      xl: 'gap-6',
    },
    noGap: "gap-0"
  };

  constructor(initial?: Partial<Record<GapKey, string | Record<SizeKey, string>>>) {
    super();
    GAP_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? GapTheme.defaultClasses[key];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const size = (extractedKeys?.size as SizeKey) ?? 'md';
    const key = (extractedKeys?.gap as GapKey) ?? 'noGap';

    return [typeof this[key] === 'string' ? this[key] : (this[key] as Record<SizeKey, string>)[size]];
  }
}
