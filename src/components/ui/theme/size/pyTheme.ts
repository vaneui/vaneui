import { SizeKey, SIZE_KEYS, NO_PADDING_KEYS } from "../../props/propKeys";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";
import { pyClasses } from "../../classes/spacingClasses";

export class PyTheme extends BaseTheme {
  constructor(private classes: Record<SizeKey, string> = pyClasses) {
    super();
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const noPadding = pickKey(props, defaults, NO_PADDING_KEYS);
    if (noPadding) {
      return ['py-0'];
    }

    const size = pickKey(props, defaults, SIZE_KEYS);
    return [this.classes[size ?? 'md']];
  }
}
