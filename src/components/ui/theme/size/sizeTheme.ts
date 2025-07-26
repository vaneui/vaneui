import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";
import { SizeKey, ComponentKeys } from "../../props";

export interface SizeTheme extends Record<SizeKey, string> {
}

export class SizeTheme extends BaseTheme {

  private readonly useDefaultKey: boolean;

  constructor(initial?: Partial<Record<SizeKey, string>>, useDefaultKey: boolean = true) {
    super();
    this.useDefaultKey = useDefaultKey;
    ComponentKeys.size.forEach((key) => {
      this[key as SizeKey] = initial?.[key as SizeKey] ?? "";
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const size = (extractedKeys?.size as SizeKey) ?? (this.useDefaultKey ? 'md' : undefined);
    if (size !== undefined)
      return [this[size]];
    else return [''];
  }
}
