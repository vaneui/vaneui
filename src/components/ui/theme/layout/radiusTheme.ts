import { SHAPE_KEYS, SIZE_KEYS, SizeKey } from "../../props/keys";
import { roundedClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class RadiusTheme extends BaseTheme {
  constructor(private classes: Partial<Record<SizeKey, string>> = roundedClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickKey(props, defaults, SIZE_KEYS, 'md');
    const shape = pickKey(props, defaults, SHAPE_KEYS, 'rounded');
    switch (shape) {
      case 'rounded':
        return [this.classes[size ?? 'md'] || ''];
      case 'sharp':
        return ['rounded-none']
      case 'pill':
        return ['rounded-full']
      default:
        return [];
    }
  }
}
