import { OverflowKey, OVERFLOW_KEYS } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface OverflowTheme extends Record<OverflowKey, string> {
}

export class OverflowTheme extends BaseTheme {
  public static readonly defaultClasses: Record<OverflowKey, string> = {
    overflowAuto: 'overflow-auto',
    overflowHidden: 'overflow-hidden',
    overflowClip: 'overflow-clip',
    overflowVisible: 'overflow-visible',
    overflowScroll: 'overflow-scroll',
    overflowXAuto: 'overflow-x-auto',
    overflowYAuto: 'overflow-y-auto',
    overflowXHidden: 'overflow-x-hidden',
    overflowYHidden: 'overflow-y-hidden',
    overflowXClip: 'overflow-x-clip',
    overflowYClip: 'overflow-y-clip',
    overflowXVisible: 'overflow-x-visible',
    overflowYVisible: 'overflow-y-visible',
    overflowXScroll: 'overflow-x-scroll',
    overflowYScroll: 'overflow-y-scroll',
  };

  constructor(initialConfig?: Partial<Record<OverflowKey, string>>) {
    super();
    OVERFLOW_KEYS.forEach((key) => {
      this[key] = initialConfig?.[key] ?? OverflowTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, OVERFLOW_KEYS);
    return [key && this[key] ? this[key] : ''];
  }
}