import { SizeKey, PaddingKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";

export interface PxTheme extends Record<SizeKey, string> {
}

export class PxTheme extends PaddingTheme {
  public readonly defaultClasses: Record<SizeKey, string> = {
    xs: "px-2", sm: "px-4", md: "px-6", lg: "px-8", xl: "px-10"
  };

  constructor(sizeMap?: Record<SizeKey, string>) {
    super(sizeMap);
    // Override with PxTheme's default classes if no custom sizeMap provided
    if (!sizeMap) {
      ComponentKeys.size.forEach((key) => {
        this[key as SizeKey] = this.defaultClasses[key as SizeKey];
      });
    }
  }
}