import type {
  BaseComponentTheme,
  DefaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { GapClassMapper } from "../theme/size/gapClassMapper";
import type { PxClassMapper } from "../theme/size/pxClassMapper";
import type { PyClassMapper } from "../theme/size/pyClassMapper";
import type { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import type { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import type { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import type { BorderClassMapper } from "../theme/layout/borderClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { WidthClassMapper } from "../theme/layout/widthClassMapper";
import type { HeightClassMapper } from "../theme/layout/heightClassMapper";

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
  layout: DefaultLayoutClassMappers & {
    wrap: WrapClassMapper;
    flexDirection: DirectionClassMapper;
    radius: RadiusClassMapper;
    border: BorderClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
  };
}
