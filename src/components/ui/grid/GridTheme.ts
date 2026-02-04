import type {
  BaseComponentTheme,
  DefaultLayoutThemes,
} from "../theme/common/ComponentTheme";
import type { GapTheme } from "../theme/size/gapTheme";
import type { PxTheme } from "../theme/size/pxTheme";
import type { PyTheme } from "../theme/size/pyTheme";
import type { WrapTheme } from "../theme/layout/wrapTheme";
import type { DirectionTheme } from "../theme/layout/directionTheme";
import type { RadiusTheme } from "../theme/layout/radiusTheme";
import type { BorderTheme } from "../theme/layout/borderTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";

export interface GridTheme extends BaseComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
    radius: RadiusTheme;
    border: BorderTheme;
  };
}
