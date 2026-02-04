import type {
  BaseComponentTheme,
  DefaultLayoutThemes,
} from "../theme/common/ComponentTheme";
import type { PyTheme } from "../theme/size/pyTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import type { OrientationTheme } from "../theme/layout/orientationTheme";

export interface DividerTheme extends BaseComponentTheme {
  size: {
    py: PyTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes & {
    orientation: OrientationTheme;
  };
}
