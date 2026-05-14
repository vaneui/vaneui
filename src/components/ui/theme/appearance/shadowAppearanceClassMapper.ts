import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

// --shadow-base is set per data-vane-type + data-size in vars.css (UI compact, Layout deeper)
export class ShadowAppearanceClassMapper extends BaseClassMapper {
  private static readonly shadowClasses: string[] = [
    "shadow-(--shadow-base)"
  ];

  getClasses(extractedKeys: CategoryProps): string[] {
    const shadow = extractedKeys?.shadow;
    return shadow === undefined || shadow === 'noShadow'
      ? []
      : ShadowAppearanceClassMapper.shadowClasses;
  }
}
