import type {
  BaseComponentTheme,
  DefaultSizedLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { GapClassMapper } from "../theme/size/gapClassMapper";
import type { PxClassMapper } from "../theme/size/pxClassMapper";
import type { PyClassMapper } from "../theme/size/pyClassMapper";
import type { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import type { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import type { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import type { BorderClassMapper } from "../theme/layout/borderClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";

export interface GridTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
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
  };
}
