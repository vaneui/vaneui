import { SizeKey, PaddingKey } from "../../props";
import { PADDING_KEYS } from "../../props/keys";
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

  constructor(initial?: Partial<Record<PaddingKey, string | Record<SizeKey, string>>>) {
    super(initial);
    // Override with PyTheme's default classes
    PADDING_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? this.defaultClasses[key];
    });
  }
}
