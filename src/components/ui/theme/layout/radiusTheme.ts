import { SHAPE_KEYS, ShapeKey, SIZE_KEYS, SizeKey } from "../../props/keys";
import { roundedClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface RadiusTheme extends Record<ShapeKey, string | Record<SizeKey, string>> {
}

export class RadiusTheme extends BaseTheme {
  public static readonly defaultClasses: Record<ShapeKey, string | Record<SizeKey, string>> = {
    pill: "rounded-full",
    sharp: "rounded-none",
    rounded: roundedClasses
  };

  constructor(initial?: Partial<Record<ShapeKey, string | Record<SizeKey, string>>>) {
    super();
    SHAPE_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? RadiusTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickKey(props, defaults, SIZE_KEYS) || 'md';
    const shape = pickKey(props, defaults, SHAPE_KEYS) || 'rounded';
    return [typeof this[shape] === 'string' ? this[shape] : (this[shape] as Record<SizeKey, string>)[size]];
  }
}
