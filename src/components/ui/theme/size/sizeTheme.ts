import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { SizeKey, ComponentKeys } from "../../props";

export interface SizeTheme extends Record<SizeKey, string> {
}

export class SizeTheme extends BaseTheme {

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
    if (size !== undefined)
      return [this[size]];
    else return [''];
  }
}
