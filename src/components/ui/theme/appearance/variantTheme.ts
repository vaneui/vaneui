import { BaseTheme } from "../common/baseTheme";
import {
  VARIANT_KEYS,
  VariantKey,
  TEXT_APPEARANCE_KEYS, MODE_KEYS,
} from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { TextAppearanceTheme } from "./textAppearanceTheme";

export class VariantTheme extends BaseTheme {
  variants: Record<VariantKey, TextAppearanceTheme>;

  constructor(
    variants: Record<VariantKey, TextAppearanceTheme>
  ) {
    super();
    this.variants = variants;
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const style = pickKey(props, defaults, VARIANT_KEYS, 'outline')!;
    const appearance = pickKey(props, defaults, TEXT_APPEARANCE_KEYS, 'default')!;
    const theme = this.variants[style].appearance[appearance];
    return MODE_KEYS.map(mode => theme[mode] || '');
  }

  /**
   * Creates a default set of variant-based appearance themes
   */
  static createDefault(src: Partial<Record<VariantKey, TextAppearanceTheme>>): VariantTheme {
    const variants = Object.fromEntries(
      VARIANT_KEYS.map((vk) => {
        return [vk, src[vk]];
      })
    ) as Record<VariantKey, TextAppearanceTheme>;
    return new VariantTheme(variants);
  }
}
