import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ModeKey, ComponentKeys } from "../../props";

export class BorderTheme extends BaseTheme implements Record<ModeKey, string> {
  base: string = "border";
  hover: string = "";
  active: string = "";

  constructor() {
    super();
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.border === "border"
      ? ComponentKeys.mode.map((mode) => this[mode])
      : [];
  }
}
