import { SizeKey, SIZE_KEYS, NO_GAP_KEYS } from "../../props/propKeys";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class GapTheme extends BaseTheme {
  constructor(private classes: Record<SizeKey, string> = {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-5',
    xl: 'gap-6',
  }) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const noGap = pickKey(props, defaults, NO_GAP_KEYS);
    if (noGap) {
      return ['gap-0'];
    }

    const size = pickKey(props, defaults, SIZE_KEYS, 'md');
    return [this.classes[size ?? 'md']];
  }
}
