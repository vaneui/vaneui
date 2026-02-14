import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { FocusVisibleClassMapper } from "../theme/layout";
import type { SizeClassMapper } from "../theme/size";

/** Theme interface for checkbox wrapper element */
export interface CheckboxWrapperTheme extends BaseComponentTheme {
  size: {
    height: SizeClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    focusVisible: FocusVisibleClassMapper;
  };
  appearance: {
    variant: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
  };
}
