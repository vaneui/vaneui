import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { SizeKey, ComponentKeys } from "../../props";

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

  constructor(sizeMap?: Record<SizeKey, string>, useDefaultKey: boolean = true) {
    super();
    this.useDefaultKey = useDefaultKey;
    ComponentKeys.size.forEach((key) => {
      this[key] = sizeMap?.[key] ?? "";
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? (this.useDefaultKey ? 'md' : undefined);
    return size ? [this[size]] : [''];
  }
}
