import { JustifyKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface JustifyTheme extends Record<JustifyKey, string> {}

export class JustifyTheme extends BaseTheme {
  constructor(initialConfig?: Partial<Record<JustifyKey, string>>) {
    super();
    ComponentKeys.justify.forEach((key) => {
      this[key] = initialConfig?.[key] ?? {
        justifyStart: "justify-start",
        justifyEnd: "justify-end",
        justifyCenter: "justify-center",
        justifyBetween: "justify-between",
        justifyAround: "justify-around",
        justifyEvenly: "justify-evenly",
        justifyStretch: "justify-stretch",
        justifyBaseline: "justify-baseline",
      }[key];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.justify;
    return [key ? this[key] : ''];
  }
}
