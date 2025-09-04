import { FontWeightKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface FontWeightTheme extends Record<FontWeightKey, string> {
}

export class FontWeightTheme extends BaseTheme {
  constructor(initial?: Partial<Record<FontWeightKey, string>>) {
    super();
    ComponentKeys.fontWeight.forEach((key) => {
      this[key] = initial?.[key] ?? {
        thin: "font-thin",
        extralight: "font-extralight",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      }[key];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.fontWeight;
    if (key === undefined)
      return [];

    return [this[key]];
  }
}
