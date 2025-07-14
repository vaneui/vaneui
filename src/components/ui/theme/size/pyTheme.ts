import { SizeKey, PaddingKey } from "../../props";
import { PaddingTheme } from "./paddingTheme";

export interface PyTheme extends Record<PaddingKey, string | Record<SizeKey, string>> {
}

export class PyTheme extends PaddingTheme {
  public readonly defaultClasses: Record<PaddingKey, string | Record<SizeKey, string>> = {
    padding: {
      xs: "py-2",
      sm: "py-4",
      md: "py-6",
      lg: "py-8",
      xl: "py-10"
    },
    noPadding: "py-0"
  };
}
