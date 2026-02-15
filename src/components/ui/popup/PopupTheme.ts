import type { BaseTypographyComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { RadiusClassMapper, DirectionClassMapper, BorderClassMapper, RingClassMapper, TransitionClassMapper, PointerEventsClassMapper } from "../theme/layout";
import type { GapClassMapper, PxClassMapper, PyClassMapper } from "../theme/size";
import type { ShadowAppearanceClassMapper, SimpleConsumerClassMapper } from "../theme/appearance";

export interface PopupTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    radius: RadiusClassMapper;
    direction: DirectionClassMapper;
    border: BorderClassMapper;
    ring: RingClassMapper;
    transition: TransitionClassMapper;
    shadow: ShadowAppearanceClassMapper;
    pointerEvents: PointerEventsClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
  };
}
