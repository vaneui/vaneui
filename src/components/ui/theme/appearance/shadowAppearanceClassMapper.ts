import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ShadowKey } from "../../props";

// --shadow-base is set per data-vane-type + data-size in vars.css (UI compact, Layout deeper)
export class ShadowAppearanceClassMapper extends BaseClassMapper implements Record<Exclude<ShadowKey, 'noShadow'>, string> {
  shadow: string = "shadow-(--shadow-base)";
  // a fixed size keeps the component's ramp (UI or Layout) but not its size
  shadowXs: string = "data-[vane-type=ui]:shadow-(--shadow-ui-xs) data-[vane-type=layout]:shadow-(--shadow-layout-xs)";
  shadowSm: string = "data-[vane-type=ui]:shadow-(--shadow-ui-sm) data-[vane-type=layout]:shadow-(--shadow-layout-sm)";
  shadowMd: string = "data-[vane-type=ui]:shadow-(--shadow-ui-md) data-[vane-type=layout]:shadow-(--shadow-layout-md)";
  shadowLg: string = "data-[vane-type=ui]:shadow-(--shadow-ui-lg) data-[vane-type=layout]:shadow-(--shadow-layout-lg)";
  shadowXl: string = "data-[vane-type=ui]:shadow-(--shadow-ui-xl) data-[vane-type=layout]:shadow-(--shadow-layout-xl)";

  getClasses(extractedKeys: CategoryProps): string[] {
    const shadow = extractedKeys?.shadow;
    return shadow === undefined || shadow === 'noShadow' ? [] : [this[shadow]];
  }
}
