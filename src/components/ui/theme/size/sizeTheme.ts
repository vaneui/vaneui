import { BaseTheme } from "../common/baseTheme";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickFirstKey, makeSizeVariant } from "../../../utils/componentUtils";

export class SizeTheme extends BaseTheme {
  constructor(private classes: Partial<Record<SizeKey, string>> = {}) {
    super();
  }

  getClasses(props: Record<string, any>): string[] {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    return [this.classes[size] || ''];
  }
}