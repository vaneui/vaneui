import { SizeKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";

/** Horizontal padding theme - controls left and right padding */
export class PxTheme extends PaddingTheme {
  constructor(sizeMap?: Record<SizeKey, string>) {
    super(sizeMap);
    // Override with PxTheme's default classes if no custom sizeMap provided
    if (!sizeMap) {
      ComponentKeys.size.forEach((key) => {
        this[key] = {
          xs: "px-2", sm: "px-4", md: "px-6", lg: "px-8", xl: "px-10"
        }[key];
      });
    }
  }
}