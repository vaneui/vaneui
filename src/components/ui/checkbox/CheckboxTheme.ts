import type {
  BaseComponentTheme,
  DefaultSizedLayoutClassMappers
} from "../theme/common/ComponentTheme";
import type { RadiusClassMapper, BorderClassMapper, RingClassMapper, FocusVisibleClassMapper, CursorClassMapper, TransitionClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper, StatusClassMapper, DisabledInteractiveClassMapper } from "../theme/appearance";
import type { SizeClassMapper, FontSizeClassMapper } from "../theme/size";

/** Theme interface for checkbox input element */
export interface CheckboxTheme extends BaseComponentTheme {
  size: {
    size: SizeClassMapper;
    text: FontSizeClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    focusVisible: FocusVisibleClassMapper;
    cursor: CursorClassMapper;
    transition: TransitionClassMapper;
    radius: RadiusClassMapper;
  };
  appearance: {
    accent: SimpleConsumerClassMapper;
    background: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
    check: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
    status: StatusClassMapper;
    disabled: DisabledInteractiveClassMapper;
  };
}
