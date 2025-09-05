import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { SizeKey, ComponentKeys } from "../../props";

export class SizeTheme extends BaseTheme implements Record<SizeKey, string> {
  xs: string = "";
  sm: string = "";
  md: string = "";
  lg: string = "";
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
