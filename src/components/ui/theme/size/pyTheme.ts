import { SizeKey, PaddingKey, ComponentKeys } from "../../props";
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

  constructor(sizeMap?: Record<SizeKey, string>) {
    // If a simple size map is provided, convert it to the expected format
    const initial = sizeMap ? { padding: sizeMap } : undefined;
    super(initial);
    // Override with PyTheme's default classes
    ComponentKeys.padding.forEach((key) => {
      if (key === 'padding' && initial?.padding) {
        this[key as PaddingKey] = initial.padding;
      } else {
        this[key as PaddingKey] = this.defaultClasses[key as PaddingKey];
      }
    });
  }
}
