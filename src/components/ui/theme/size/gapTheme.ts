import { SizeKey, GapKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

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

  constructor(sizeMap?: Record<SizeKey, string>) {
    // If a simple size map is provided, convert it to the expected format
    const initial = sizeMap ? { gap: sizeMap } : undefined;
    super();
    ComponentKeys.gap.forEach((key) => {
      if (key === 'gap' && initial?.gap) {
        this[key as GapKey] = initial.gap;
      } else {
        this[key as GapKey] = GapTheme.defaultClasses[key as GapKey];
      }
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    const key = extractedKeys?.gap ?? 'noGap';

    return [typeof this[key] === 'string' ? this[key] : (this[key] as Record<SizeKey, string>)[size]];
  }
}
