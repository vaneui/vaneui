import { SizeKey, SIZE_KEYS, GAP_KEYS, ShadowKey, ModeKey, GapKey, SHADOW_KEYS, SHAPE_KEYS } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";
import {
  activeShadowClasses,
  hoverShadowClasses,
  noShadowModeClasses,
  shadowClasses
} from "../../classes/layoutClasses";
import { ShadowTheme } from "../layout/shadowTheme";

export interface GapTheme extends Record<GapKey, string | Record<SizeKey, string>> {
}

export class GapTheme extends BaseTheme {
  public static readonly defaultClasses: Record<GapKey, string | Record<SizeKey, string>> = {
    gap: {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
      xl: 'gap-6',
    },
    noGap: "gap-0"
  };

  constructor(initial?: Record<GapKey, string | Record<SizeKey, string>>) {
    super();
    GAP_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? GapTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickKey(props, defaults, SIZE_KEYS) || 'md';
    const key = pickKey(props, defaults, GAP_KEYS) || 'noGap';

    return [typeof this[key] === 'string' ? this[key] : (this[key] as Record<SizeKey, string>)[size]];
  }
}
