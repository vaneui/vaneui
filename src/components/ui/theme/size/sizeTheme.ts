import { BaseTheme } from "../common/baseTheme";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickKey, makeSizeVariant } from "../../../utils/componentUtils";

export class SizeTheme extends BaseTheme {
  constructor(private classes: Partial<Record<SizeKey, string>> = {}) {
    super();
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const size = pickKey(props, defaults, SIZE_KEYS);
    return [this.classes[size ?? 'md'] || ''];
  }
}
