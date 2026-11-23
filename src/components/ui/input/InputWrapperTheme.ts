import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { WidthClassMapper, ShrinkClassMapper } from "../theme/layout";
import type { DisabledOpacityClassMapper } from "../theme/appearance";

/** Theme interface for the input wrapper element */
export interface InputWrapperTheme extends BaseComponentTheme {
  layout: DefaultLayoutClassMappers & {
    width: WidthClassMapper;
    shrink: ShrinkClassMapper;
  };
  appearance: {
    disabled: DisabledOpacityClassMapper;
  };
}
