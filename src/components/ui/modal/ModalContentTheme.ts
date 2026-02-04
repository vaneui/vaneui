import type {
  BaseTypographyComponentTheme,
  DefaultLayoutThemes,
} from "../theme/common/ComponentTheme";
import type { GapTheme } from "../theme/size/gapTheme";
import type { PxTheme } from "../theme/size/pxTheme";
import type { PyTheme } from "../theme/size/pyTheme";
import type { RadiusTheme } from "../theme/layout/radiusTheme";
import type { DirectionTheme } from "../theme/layout/directionTheme";
import type { BorderTheme } from "../theme/layout/borderTheme";
import type { RingTheme } from "../theme/layout/ringTheme";
import type { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";

export interface ModalContentTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes & {
    radius: RadiusTheme;
    direction: DirectionTheme;
    border: BorderTheme;
    ring: RingTheme;
    shadow: ShadowAppearanceTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
  };
}
