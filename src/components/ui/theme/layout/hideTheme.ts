import { HideKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface HideTheme extends Record<HideKey, string> {
}

export class HideTheme extends BaseTheme {
  constructor(initialConfig?: Partial<Record<HideKey, string>>) {
    super();
    ComponentKeys.hide.forEach((key) => {
      this[key] = initialConfig?.[key] ?? {
        xsHide: "max-xs:hidden",
        smHide: "max-sm:hidden",
        mdHide: "max-md:hidden",
        lgHide: "max-lg:hidden",
        xlHide: "max-xl:hidden"
      }[key];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.hide;
    return [key ? this[key] : ''];
  }
}
