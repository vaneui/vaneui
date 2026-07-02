import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { GapClassMapper, PxClassMapper, PyClassMapper, MarginClassMapper } from "../theme/size";
import type { WrapClassMapper, DirectionClassMapper, RadiusClassMapper, BorderClassMapper, FlexClassMapper, ShrinkClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper } from "../theme/appearance";

export interface GridTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
    margin: MarginClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    wrap: WrapClassMapper;
    flexDirection: DirectionClassMapper;
    radius: RadiusClassMapper;
    border: BorderClassMapper;
    flex: FlexClassMapper;
    shrink: ShrinkClassMapper;
  };
}
