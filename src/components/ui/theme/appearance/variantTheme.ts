import { BaseTheme } from "../common/baseTheme";
import { 
  VARIANT_KEYS,
  VariantKey,
  TEXT_APPEARANCE_KEYS,
} from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { AppearanceTheme } from "./appearanceTheme";

export class VariantTheme extends BaseTheme {
  variants: Record<VariantKey, AppearanceTheme>;

  constructor(
    variants: Record<VariantKey, AppearanceTheme>
  ) {
    super();
    this.variants = variants;
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const style = pickKey(props, defaults, VARIANT_KEYS, 'outline')!;
    const appearance = pickKey(props, defaults, TEXT_APPEARANCE_KEYS, 'default')!;
    const theme = this.variants[style].appearance[appearance];
    return theme?.getClasses(props, defaults) ?? [];
  }

  /**
   * Creates a default set of variant-based appearance themes
   */
  static createDefault(src: Partial<Record<VariantKey, AppearanceTheme>>): VariantTheme {
    const variants = Object.fromEntries(
      VARIANT_KEYS.map((vk) => {
        return [vk, src[vk]];
      })
    ) as Record<VariantKey, AppearanceTheme>;
    return new VariantTheme(variants);
  }
}
