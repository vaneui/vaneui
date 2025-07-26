import { JustifyKey, JUSTIFY_KEYS } from "../../props/keys";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

export interface JustifyTheme extends Record<JustifyKey, string> {}

export class JustifyTheme extends BaseTheme {
  public static readonly defaultClasses: Record<JustifyKey, string> = {
    justifyStart: "justify-start",
    justifyEnd: "justify-end",
    justifyCenter: "justify-center",
    justifyBetween: "justify-between",
    justifyAround: "justify-around",
    justifyEvenly: "justify-evenly",
    justifyStretch: "justify-stretch",
    justifyBaseline: "justify-baseline",
  };

  constructor(initialConfig?: Partial<Record<JustifyKey, string>>) {
    super();
    JUSTIFY_KEYS.forEach((key) => {
      this[key] = initialConfig?.[key] ?? JustifyTheme.defaultClasses[key];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.justify as JustifyKey;
    return [key ? this[key] : ''];
  }
}
