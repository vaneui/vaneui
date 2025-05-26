import { SizeKey, SIZE_KEYS, NO_PADDING_KEYS } from "../../props/propKeys";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";
import { pxClasses } from "../../classes/spacingClasses";

export class PxTheme implements BaseTheme {
  constructor(private classes: Record<SizeKey, string> = pxClasses) {
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const noPadding = pickKey(props, defaults, NO_PADDING_KEYS);
    if (noPadding) {
      return ['px-0'];
    }

    const size = pickKey(props, defaults, SIZE_KEYS, 'md');
    return [this.classes[size ?? 'md']];
  }
}
