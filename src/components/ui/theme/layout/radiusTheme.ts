import { SHAPE_KEYS, ShapeKey, SIZE_KEYS, SizeKey } from "../../props/keys";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

export interface RadiusTheme extends Record<ShapeKey, string | Record<SizeKey, string>> {
}

export class RadiusTheme extends BaseTheme {
  public static readonly defaultClasses: Record<ShapeKey, string | Record<SizeKey, string>> = {
    pill: "rounded-full",
    sharp: "rounded-none",
    rounded: {
      xs: "rounded-sm",
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      xl: "rounded-2xl",
    }
  };

  constructor(initial?: Partial<Record<ShapeKey, string | Record<SizeKey, string>>>) {
    super();
    SHAPE_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? RadiusTheme.defaultClasses[key];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const size = (extractedKeys?.size as SizeKey) ?? 'md';
    const shape = (extractedKeys?.shape as ShapeKey) ?? 'rounded';
    return [typeof this[shape] === 'string' ? this[shape] : (this[shape] as Record<SizeKey, string>)[size]];
  }
}
