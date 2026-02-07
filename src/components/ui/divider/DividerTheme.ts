import type {
  BaseComponentTheme,
  DefaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { PyClassMapper } from "../theme/size/pyClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { OrientationClassMapper } from "../theme/layout/orientationClassMapper";
import type { WidthClassMapper } from "../theme/layout/widthClassMapper";
import type { HeightClassMapper } from "../theme/layout/heightClassMapper";

export interface DividerTheme extends BaseComponentTheme {
  size: {
    py: PyClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    orientation: OrientationClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
  };
}
