import { SizeKey, SIZE_KEYS, NO_PADDING_KEYS } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";
import { pxClasses } from "../../classes/spacingClasses";

export interface PxTheme extends Record<SizeKey, string> {}

export class PxTheme extends BaseTheme {
  public static readonly defaultClasses: Record<SizeKey, string> = pxClasses;

  constructor(initialConfig?: Partial<Record<SizeKey, string>>) {
    super();
    SIZE_KEYS.forEach((key) => {
      this[key] = initialConfig?.[key] ?? PxTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const noPadding = pickKey(props, defaults, NO_PADDING_KEYS);
    if (noPadding) {
      return ['px-0'];
    }

    const size = pickKey(props, defaults, SIZE_KEYS, 'md');
    return [this[size ?? 'md']];
  }
}
