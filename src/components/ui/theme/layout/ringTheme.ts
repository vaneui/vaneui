import { ringModeClasses, noRingModeClasses } from "../../classes/layoutClasses";
import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey, RING_KEYS, RingKey } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";

export interface RingTheme extends Record<RingKey, Record<ModeKey, string>> {
}

export class RingTheme extends BaseTheme {
  public static readonly defaultClasses: Record<RingKey, Record<ModeKey, string>> = {
    ring: ringModeClasses,
    noRing: noRingModeClasses,
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