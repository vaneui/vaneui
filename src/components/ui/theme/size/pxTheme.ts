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

  constructor(sizeMap?: Record<SizeKey, string>) {
    // If a simple size map is provided, convert it to the expected format
    const initial = sizeMap ? { padding: sizeMap } : undefined;
    super(initial);
    // Override with PxTheme's default classes
    ComponentKeys.padding.forEach((key) => {
      if (key === 'padding' && initial?.padding) {
        this[key as PaddingKey] = initial.padding;
      } else {
        this[key as PaddingKey] = this.defaultClasses[key as PaddingKey];
      }
    });
  }
}