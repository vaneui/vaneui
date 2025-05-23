import { SizeKey, SIZE_KEYS, NoGapKey, NO_GAP_KEYS } from "../../props/propKeys";
import { pickFirstKey, pickFirstKeyOptional } from "../../../utils/componentUtils";
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

  getClasses(props: Record<string, any>): string[] {
    const noGap = pickFirstKeyOptional(props, NO_GAP_KEYS);
    if (noGap) {
      return ['gap-0'];
    }

    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    return [this.classes[size]];
  }
}
