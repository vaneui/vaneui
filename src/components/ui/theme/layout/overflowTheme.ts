import { OverflowKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class OverflowTheme extends BaseTheme implements Record<OverflowKey, string> {
  overflowAuto: string = 'overflow-auto';
  overflowHidden: string = 'overflow-hidden';
  overflowClip: string = 'overflow-clip';
  overflowVisible: string = 'overflow-visible';
  overflowScroll: string = 'overflow-scroll';
  overflowXAuto: string = 'overflow-x-auto';
  overflowYAuto: string = 'overflow-y-auto';
  overflowXHidden: string = 'overflow-x-hidden';
  overflowYHidden: string = 'overflow-y-hidden';
  overflowXClip: string = 'overflow-x-clip';
  overflowYClip: string = 'overflow-y-clip';
  overflowXVisible: string = 'overflow-x-visible';
  overflowYVisible: string = 'overflow-y-visible';
  overflowXScroll: string = 'overflow-x-scroll';
  overflowYScroll: string = 'overflow-y-scroll';

  constructor(initialConfig?: Partial<Record<OverflowKey, string>>) {
    super();
    if (initialConfig) {
      ComponentKeys.overflow.forEach((key) => {
        if (initialConfig[key] !== undefined) {
          this[key] = initialConfig[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.overflow;
    return [key && this[key] ? this[key] : ''];
  }
}