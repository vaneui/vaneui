import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { SimpleConsumerClassMapper, DisabledOpacityClassMapper } from "../theme/appearance";
import type { FocusVisibleClassMapper, AlignSelfClassMapper } from "../theme/layout";
import type { SizeClassMapper } from "../theme/size";

/** Theme interface for the switch wrapper element */
export interface SwitchWrapperTheme extends BaseComponentTheme {
  size: {
    height: SizeClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    focusVisible: FocusVisibleClassMapper;
    alignSelf: AlignSelfClassMapper;
  };
  appearance: {
    focusVisible: SimpleConsumerClassMapper;
    disabled: DisabledOpacityClassMapper;
  };
}
