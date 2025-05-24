import { SHAPE_KEYS, SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { roundedClasses } from "../../classes/layoutClasses";
import { pickFirstKey, pickFirstKeyOptional } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class RadiusTheme extends BaseTheme {
  constructor(private classes: Partial<Record<SizeKey, string>> = roundedClasses) {
    super();
  }

  getClasses(props: Record<string, any>): string[] {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const shape = pickFirstKeyOptional(props, SHAPE_KEYS, 'rounded');
    switch (shape) {
      case 'rounded':
        return [this.classes[size] ?? ''];
      case 'sharp':
        return ['rounded-none']
      case 'pill':
        return ['rounded-full']
      default:
        return [];
    }
  }
}
