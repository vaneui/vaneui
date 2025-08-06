import { ShapeKey, SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import {
  uiBorderRadiusShapeClasses,
  layoutBorderRadiusShapeClasses
} from "../../classes/radiusClasses";

export interface RadiusTheme extends Record<ShapeKey, string | Record<SizeKey, string>> {
}

export class RadiusTheme extends BaseTheme {

  private constructor(shapeClasses: Record<ShapeKey, string | Record<SizeKey, string>>, sizeMap?: Record<SizeKey, string>) {
    super();
    ComponentKeys.shape.forEach((key) => {
      if (key === 'rounded' && sizeMap) {
        this[key as ShapeKey] = sizeMap;
      } else {
        this[key as ShapeKey] = shapeClasses[key as ShapeKey];
      }
    });
  }

  static createUITheme(sizeMap?: Record<SizeKey, string>): RadiusTheme {
    return new RadiusTheme(uiBorderRadiusShapeClasses, sizeMap);
  }

  static createLayoutTheme(sizeMap?: Record<SizeKey, string>): RadiusTheme {
    return new RadiusTheme(layoutBorderRadiusShapeClasses, sizeMap);
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    const shape = extractedKeys?.shape ?? 'rounded';
    return [typeof this[shape] === 'string' ? this[shape] : (this[shape] as Record<SizeKey, string>)[size]];
  }
}
