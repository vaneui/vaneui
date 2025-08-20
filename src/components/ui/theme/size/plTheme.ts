import { SizeKey, PaddingKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";

export interface PlTheme extends Record<SizeKey, string> {
}

export class PlTheme extends PaddingTheme {
  public readonly defaultClasses: Record<SizeKey, string> = {
    xs: "pl-2", sm: "pl-4", md: "pl-6", lg: "pl-8", xl: "pl-10"
  };

  constructor(sizeMap?: Record<SizeKey, string>) {
    super(sizeMap);
    // Override with PlTheme's default classes if no custom sizeMap provided
    if (!sizeMap) {
      ComponentKeys.size.forEach((key) => {
        this[key as SizeKey] = this.defaultClasses[key as SizeKey];
      });
    }
  }
}