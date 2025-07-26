import { HideKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

export interface HideTheme extends Record<HideKey, string> {
}

export class HideTheme extends BaseTheme {
  public static readonly defaultClasses: Record<HideKey, string> = {
    xsHide: "max-xs:hidden",
    smHide: "max-sm:hidden",
    mdHide: "max-md:hidden",
    lgHide: "max-lg:hidden",
    xlHide: "max-xl:hidden"
  };

  constructor(initialConfig?: Partial<Record<HideKey, string>>) {
    super();
    ComponentKeys.hide.forEach((key) => {
      this[key as HideKey] = initialConfig?.[key as HideKey] ?? HideTheme.defaultClasses[key as HideKey];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.hide as HideKey;
    return [key ? this[key] : ''];
  }
}
