import type {
  BaseComponentTheme,
  DefaultSizedLayoutClassMappers
} from "../theme/common/ComponentTheme";
import type { RadiusClassMapper, BorderClassMapper, RingClassMapper, FocusVisibleClassMapper, CursorClassMapper, TransitionClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper, StatusClassMapper, DisabledInteractiveClassMapper } from "../theme/appearance";
import type { SizeClassMapper } from "../theme/size";

/** Theme interface for the switch input element (the track) */
export interface SwitchTheme extends BaseComponentTheme {
  size: {
    track: SizeClassMapper;
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
    background: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
    checked: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
    status: StatusClassMapper;
    disabled: DisabledInteractiveClassMapper;
  };
}
