import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey, RING_KEYS, RingKey } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";

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
    RING_KEYS.forEach((key: RingKey) => {
      this[key] = {
        ...RingTheme.defaultClasses[key],
        ...(initial?.[key] || {}),
      };
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, RING_KEYS);
    if (!key || !this[key]) {
      return MODE_KEYS.map(() => '');
    }

    return MODE_KEYS.map(mode => this[key][mode] || '');
  }
}