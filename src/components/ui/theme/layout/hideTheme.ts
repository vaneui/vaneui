import { HideKey, HIDE_KEYS } from "../../props/keys";
import { hideClasses } from "../../classes/layoutClasses";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface HideTheme extends Record<HideKey, string> {}

export class HideTheme extends BaseTheme {
  public static readonly defaultClasses: Record<HideKey, string> = hideClasses;

  constructor(initialConfig?: Partial<Record<HideKey, string>>) {
    super();
    HIDE_KEYS.forEach((key) => {
      this[key] = initialConfig?.[key] ?? HideTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, HIDE_KEYS);
    return [key ? this[key] : ''];
  }
}
