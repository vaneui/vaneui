import { SizeKey, PaddingKey } from "../../props";
import { PaddingTheme } from "./paddingTheme";

export interface PxTheme extends Record<PaddingKey, string | Record<SizeKey, string>> {
}

export class PxTheme extends PaddingTheme {
  public readonly defaultClasses: Record<PaddingKey, string | Record<SizeKey, string>> = {
    padding: {
      xs: "px-2",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
      xl: "px-10"
    },
    noPadding: "px-0"
  };
}