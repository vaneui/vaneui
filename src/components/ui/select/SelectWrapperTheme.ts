import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { WidthClassMapper } from "../theme/layout";
import type { DisabledOpacityClassMapper } from "../theme/appearance";

/** Theme interface for the select wrapper element */
export interface SelectWrapperTheme extends BaseComponentTheme {
  layout: DefaultLayoutClassMappers & {
    width: WidthClassMapper;
  };
  appearance: {
    disabled: DisabledOpacityClassMapper;
  };
}
