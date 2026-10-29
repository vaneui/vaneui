import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { GapClassMapper, PxClassMapper, PyClassMapper, MarginClassMapper } from "../theme/size";
import type { WrapClassMapper, DirectionClassMapper, RadiusClassMapper, BorderClassMapper, FlexClassMapper, ShrinkClassMapper, PointerEventsClassMapper, WhitespaceClassMapper, DividedClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper, StrongBorderClassMapper } from "../theme/appearance";

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
    strongBorder: StrongBorderClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    wrap: WrapClassMapper;
    flexDirection: DirectionClassMapper;
    radius: RadiusClassMapper;
    border: BorderClassMapper;
    flex: FlexClassMapper;
    shrink: ShrinkClassMapper;
    pointerEvents: PointerEventsClassMapper;
    whitespace: WhitespaceClassMapper;
    divided: DividedClassMapper;
  };
}
