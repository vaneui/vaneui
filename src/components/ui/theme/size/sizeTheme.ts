import { BaseTheme } from "../common/baseTheme";
import { SIZE_KEYS, SizeKey } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";

export interface SizeTheme extends Record<SizeKey, string> {
}

export class SizeTheme extends BaseTheme {

  private readonly useDefaultKey: boolean;

  constructor(initial?: Partial<Record<SizeKey, string>>, useDefaultKey: boolean = true) {
    super();
    this.useDefaultKey = useDefaultKey;
    SIZE_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? "";
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickFirstTruthyKey(props, defaults, SIZE_KEYS);
    if (size !== undefined)
      return [this[size]];
    else return this.useDefaultKey ? [this['md']] : [''];
  }
}
