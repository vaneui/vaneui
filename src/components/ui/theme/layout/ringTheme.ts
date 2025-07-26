import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";
import { ModeKey, RingKey, ComponentKeys } from "../../props";

export interface RingTheme extends Record<RingKey, Record<ModeKey, string>> {
}

export class RingTheme extends BaseTheme {
  public static readonly defaultClasses: Record<RingKey, Record<ModeKey, string>> = {
    ring: {
      base: "ring ring-inset",
      hover: "hover:ring hover:ring-inset",
      active: "active:ring active:ring-inset",
    },
    noRing: {
      base: "",
      hover: "",
      active: "",
    },
    //noRing: {
    //  base: "ring-0",
    //  hover: "hover:ring-0",
    //  active: "active:ring-0",
    //},
  };

  constructor(initial?: Partial<Record<RingKey, Record<ModeKey, string>>>) {
    super();
    ComponentKeys.ring.forEach((key) => {
      this[key as RingKey] = {
        ...RingTheme.defaultClasses[key as RingKey],
        ...(initial?.[key as RingKey] || {}),
      };
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.ring as RingKey;
    if (!key || !this[key]) {
      return ComponentKeys.mode.map(() => '');
    }

    return ComponentKeys.mode.map(mode => this[key][mode as ModeKey] || '');
  }
}