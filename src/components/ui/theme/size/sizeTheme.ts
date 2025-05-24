import { BaseTheme } from "../common/baseTheme";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickFirstKey, pickFirstKeyOptional, makeSizeVariant } from "../../../utils/componentUtils";

export class SizeTheme extends BaseTheme {
  constructor(private classes: Partial<Record<SizeKey, string>> = {}) {
    super();
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    // First look for an explicit value in the real props
    const explicitSize = pickFirstKeyOptional(props, SIZE_KEYS);

    // If none was found, check defaults
    const size = explicitSize || pickFirstKey(defaults, SIZE_KEYS, 'md');

    return [this.classes[size] || ''];
  }
}
