import type { DirectionTheme } from "../theme/layout/directionTheme";
import type { BaseComponentTheme, DefaultLayoutThemes } from "../theme/common/ComponentTheme";
import type { GapTheme } from "../theme/size/gapTheme";
import type { PxTheme } from "../theme/size/pxTheme";
import type { PyTheme } from "../theme/size/pyTheme";
import type { SizeTheme } from "../theme/size/sizeTheme";
import type { WrapTheme } from "../theme/layout/wrapTheme";
import type { BorderTheme } from "../theme/layout/borderTheme";
import type { RingTheme } from "../theme/layout/ringTheme";
import type { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import type { RadiusTheme } from "../theme/layout/radiusTheme";

export interface ContainerTheme extends BaseComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
    maxWidth: SizeTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
  }
}
