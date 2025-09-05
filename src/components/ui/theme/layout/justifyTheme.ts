import { JustifyKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class JustifyTheme extends BaseTheme implements Record<JustifyKey, string> {
  justifyStart: string = "justify-start";
  justifyEnd: string = "justify-end";
  justifyCenter: string = "justify-center";
  justifyBetween: string = "justify-between";
  justifyAround: string = "justify-around";
  justifyEvenly: string = "justify-evenly";
  justifyStretch: string = "justify-stretch";
  justifyBaseline: string = "justify-baseline";

  constructor(initialConfig?: Partial<Record<JustifyKey, string>>) {
    super();
    if (initialConfig) {
      ComponentKeys.justify.forEach((key) => {
        if (initialConfig[key] !== undefined) {
          this[key] = initialConfig[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.justify ? this[extractedKeys.justify] : ''];
  }
}
