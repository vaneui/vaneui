import { ShapeKey, SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import {
  uiBorderRadiusShapeClasses,
  layoutBorderRadiusShapeClasses
} from "../../classes/radiusClasses";

export type RadiusType = 'ui' | 'layout';

export interface RadiusTheme extends Record<ShapeKey, string | Record<SizeKey, string>> {
}

export class RadiusTheme extends BaseTheme {

  constructor(sizeMap?: Record<SizeKey, string>, radiusType: RadiusType = 'layout') {
    // If a simple size map is provided, convert it to the expected format
    const initial = sizeMap ? {rounded: sizeMap} : undefined;
    const shapeClasses = radiusType === 'ui' ? uiBorderRadiusShapeClasses : layoutBorderRadiusShapeClasses;

    super();
    ComponentKeys.shape.forEach((key) => {
      if (key === 'rounded' && initial?.rounded) {
        this[key as ShapeKey] = initial.rounded;
      } else {
        this[key as ShapeKey] = shapeClasses[key as ShapeKey];
      }
    });
  }

  static createUITheme(sizeMap?: Record<SizeKey, string>): RadiusTheme {
    return new RadiusTheme(sizeMap, 'ui');
  }

  static createLayoutTheme(sizeMap?: Record<SizeKey, string>): RadiusTheme {
    return new RadiusTheme(sizeMap, 'layout');
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    const shape = extractedKeys?.shape ?? 'rounded';
    return [typeof this[shape] === 'string' ? this[shape] : (this[shape] as Record<SizeKey, string>)[size]];
  }
}
