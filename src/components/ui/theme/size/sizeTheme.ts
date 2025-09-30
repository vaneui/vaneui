import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { SizeKey, ComponentKeys } from "../../props";
import { FontSizeTheme } from "../typography/fontSizeTheme";

export class SizeTheme extends BaseTheme implements Record<SizeKey, string> {
  /** Extra-small size variant */
  xs: string = "";
  /** Small size variant */
  sm: string = "";
  /** Medium size variant (default) */
  md: string = "";
  /** Large size variant */
  lg: string = "";
  /** Extra-large size variant */
  xl: string = "";

  private readonly useDefaultKey: boolean;
  private readonly fontSizeTheme?: FontSizeTheme;

  constructor(sizeMap?: Record<SizeKey, string> | FontSizeTheme, useDefaultKey: boolean = true) {
    super();
    this.useDefaultKey = useDefaultKey;
    
    if (sizeMap instanceof FontSizeTheme) {
      this.fontSizeTheme = sizeMap;
      ComponentKeys.size.forEach((key) => {
        this[key] = sizeMap[key];
      });
    } else {
      ComponentKeys.size.forEach((key) => {
        this[key] = sizeMap?.[key] ?? "";
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (this.fontSizeTheme) {
      return this.fontSizeTheme.getClasses(extractedKeys);
    }
    
    const size = extractedKeys?.size ?? (this.useDefaultKey ? 'md' : undefined);
    return size ? [this[size]] : [''];
  }
}
