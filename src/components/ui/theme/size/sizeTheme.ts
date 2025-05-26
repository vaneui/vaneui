import { BaseTheme } from "../common/baseTheme";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickKey } from "../../../utils/componentUtils";

export class SizeTheme implements BaseTheme {
  constructor(private classes: Partial<Record<SizeKey, string>> = {}) {
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const size = pickKey(props, defaults, SIZE_KEYS);
    return [this.classes[size ?? 'md'] || ''];
  }
}
