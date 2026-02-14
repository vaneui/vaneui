import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { PyClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { OrientationClassMapper } from "../theme/layout";

export interface DividerTheme extends BaseComponentTheme {
  size: {
    py: PyClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
  };
  layout: DefaultSizedLayoutClassMappers & {
    orientation: OrientationClassMapper;
  };
}
