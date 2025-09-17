import { SizeKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";
import { layoutPaddingXClasses } from "../../classes/layoutClasses";

/** Horizontal padding theme - controls left and right padding */
export class PxTheme extends PaddingTheme {
  constructor(sizeMap?: Record<SizeKey, string>) {
    super(sizeMap);
    // Override with PxTheme's default classes if no custom sizeMap provided
    if (!sizeMap) {
      ComponentKeys.size.forEach((key) => {
        this[key] = layoutPaddingXClasses[key];
      });
    }
  }
}