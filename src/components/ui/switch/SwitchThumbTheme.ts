import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { RadiusClassMapper, TransitionClassMapper, JustifySelfClassMapper, PointerEventsClassMapper } from "../theme/layout";

/** Theme interface for the switch thumb element */
export interface SwitchThumbTheme extends BaseComponentTheme {
  layout: DefaultLayoutClassMappers & {
    radius: RadiusClassMapper;
    transition: TransitionClassMapper;
    justifySelf: JustifySelfClassMapper;
    pointerEvents: PointerEventsClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
  };
}
