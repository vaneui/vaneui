import type { BaseTypographyComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { RadiusClassMapper, DirectionClassMapper, BorderClassMapper, RingClassMapper } from "../theme/layout";
import type { GapClassMapper, PxClassMapper, PyClassMapper } from "../theme/size";
import type { ShadowAppearanceClassMapper, SimpleConsumerClassMapper } from "../theme/appearance";

export interface ModalContentTheme extends BaseTypographyComponentTheme {
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
    shadow: ShadowAppearanceClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
  };
}
