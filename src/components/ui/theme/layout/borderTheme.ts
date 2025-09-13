import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ModeKey } from "../../props";
import { ModeKeys } from "../../props/mode";

export class BorderTheme extends BaseTheme implements Record<ModeKey, string> {
  base: string = "border";
  hover: string = "";
  active: string = "";
  focus: string = "";
  focusVisible: string = "";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.border === "border"
      ? ModeKeys.mode.map((mode) => this[mode])
      : [];
  }
}
