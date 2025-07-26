import { SizeKey, PaddingKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";

export interface PlTheme extends Record<PaddingKey, string | Record<SizeKey, string>> {
}

export class PlTheme extends PaddingTheme {
  public readonly defaultClasses: Record<PaddingKey, string | Record<SizeKey, string>> = {
    padding: {
      xs: "pl-2",
      sm: "pl-4",
      md: "pl-6",
      lg: "pl-8",
      xl: "pl-10"
    },
    noPadding: "pl-0"
  };

  constructor(initial?: Partial<Record<PaddingKey, string | Record<SizeKey, string>>>) {
    super(initial);
    // Override with PlTheme's default classes
    ComponentKeys.padding.forEach((key) => {
      this[key as PaddingKey] = initial?.[key as PaddingKey] ?? this.defaultClasses[key as PaddingKey];
    });
  }
}