import { SizeKey, PaddingKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";

export interface PyTheme extends Record<SizeKey, string> {
}

export class PyTheme extends PaddingTheme {
  constructor(sizeMap?: Record<SizeKey, string>) {
    super(sizeMap);
    // Override with PyTheme's default classes if no custom sizeMap provided
    if (!sizeMap) {
      ComponentKeys.size.forEach((key) => {
        this[key] = {
          xs: "py-2", sm: "py-4", md: "py-6", lg: "py-8", xl: "py-10"
        }[key];
      });
    }
  }
}
