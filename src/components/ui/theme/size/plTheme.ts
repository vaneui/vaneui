import { SizeKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";

/** Left padding theme - controls left padding only */
export class PlTheme extends PaddingTheme {
  constructor(sizeMap?: Record<SizeKey, string>) {
    super(sizeMap);
    // Override with PlTheme's default classes if no custom sizeMap provided
    if (!sizeMap) {
      ComponentKeys.size.forEach((key) => {
        this[key] = {
          xs: "pl-2", sm: "pl-4", md: "pl-6", lg: "pl-8", xl: "pl-10"
        }[key];
      });
    }
  }
}