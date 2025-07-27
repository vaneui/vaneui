import { ShapeKey, SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

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
    ComponentKeys.shape.forEach((key) => {
      this[key as ShapeKey] = initial?.[key as ShapeKey] ?? RadiusTheme.defaultClasses[key as ShapeKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = (extractedKeys?.size as SizeKey) ?? 'md';
    const shape = (extractedKeys?.shape as ShapeKey) ?? 'rounded';
    return [typeof this[shape] === 'string' ? this[shape] : (this[shape] as Record<SizeKey, string>)[size]];
  }
}
