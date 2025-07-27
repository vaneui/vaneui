import { OverflowKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

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
    ComponentKeys.overflow.forEach((key) => {
      this[key as OverflowKey] = initialConfig?.[key as OverflowKey] ?? OverflowTheme.defaultClasses[key as OverflowKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.overflow as OverflowKey;
    return [key && this[key] ? this[key] : ''];
  }
}