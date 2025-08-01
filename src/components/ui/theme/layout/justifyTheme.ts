import { JustifyKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

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
    ComponentKeys.justify.forEach((key) => {
      this[key as JustifyKey] = initialConfig?.[key as JustifyKey] ?? JustifyTheme.defaultClasses[key as JustifyKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.justify;
    return [key ? this[key] : ''];
  }
}
