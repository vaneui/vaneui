import { SizeKey, PaddingKey, ComponentKeys } from "../../props";
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

  constructor(initial?: Partial<Record<PaddingKey, string | Record<SizeKey, string>>>) {
    super(initial);
    // Override with PxTheme's default classes
    ComponentKeys.padding.forEach((key) => {
      this[key as PaddingKey] = initial?.[key as PaddingKey] ?? this.defaultClasses[key as PaddingKey];
    });
  }
}