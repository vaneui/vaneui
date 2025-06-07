import { SizeKey, SIZE_KEYS, PADDING_KEYS, PaddingKey } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";
import { pyClasses } from "../../classes/spacingClasses";

export interface PyTheme extends Record<PaddingKey, string | Record<SizeKey, string>> {
}

export class PyTheme extends BaseTheme {
  public static readonly defaultClasses: Record<PaddingKey, string | Record<SizeKey, string>> = {
    padding: pyClasses,
    noPadding: "py-0"
  };

  constructor(initial?: Partial<Record<PaddingKey, string | Record<SizeKey, string>>>) {
    super();
    PADDING_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? PyTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickKey(props, defaults, SIZE_KEYS) || 'md';
    const key = pickKey(props, defaults, PADDING_KEYS) || 'noPadding';

    return [typeof this[key] === 'string' ? this[key] : (this[key] as Record<SizeKey, string>)[size]];
  }
}
