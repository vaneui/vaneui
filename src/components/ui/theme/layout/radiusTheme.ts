import { ShapeKey, SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { borderRadiusShapeClasses } from "../../classes/radiusClasses";

export interface RadiusTheme extends Record<ShapeKey, string | Record<SizeKey, string>> {
}

export class RadiusTheme extends BaseTheme {
  public static readonly defaultClasses: Record<ShapeKey, string | Record<SizeKey, string>> = borderRadiusShapeClasses;

  constructor(sizeMap?: Record<SizeKey, string>) {
    // If a simple size map is provided, convert it to the expected format
    const initial = sizeMap ? { rounded: sizeMap } : undefined;
    super();
    ComponentKeys.shape.forEach((key) => {
      if (key === 'rounded' && initial?.rounded) {
        this[key as ShapeKey] = initial.rounded;
      } else {
        this[key as ShapeKey] = borderRadiusShapeClasses[key as ShapeKey];
      }
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    const shape = extractedKeys?.shape ?? 'rounded';
    return [typeof this[shape] === 'string' ? this[shape] : (this[shape] as Record<SizeKey, string>)[size]];
  }
}
