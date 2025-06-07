import { SizeKey, SIZE_KEYS, PADDING_KEYS, PaddingKey } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";
import { pxClasses } from "../../classes/spacingClasses";

export interface PxTheme extends Record<PaddingKey, string | Record<SizeKey, string>> {
}

export class PxTheme extends BaseTheme {
  public static readonly defaultClasses: Record<PaddingKey, string | Record<SizeKey, string>> = {
    padding: pxClasses,
    noPadding: "px-0"
  };

  constructor(initial?: Record<PaddingKey, string | Record<SizeKey, string>>) {
    super();
    PADDING_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? PxTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickKey(props, defaults, SIZE_KEYS) || 'md';
    const key = pickKey(props, defaults, PADDING_KEYS) || 'noPadding';

    return [typeof this[key] === 'string' ? this[key] : (this[key] as Record<SizeKey, string>)[size]];
  }
}