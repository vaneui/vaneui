import type { BaseComponentTheme, DefaultLayoutThemes } from "../theme/common/ComponentTheme";
import type { DirectionTheme } from "../theme/layout/directionTheme";
import type { GapTheme } from "../theme/size/gapTheme";
import type { WrapTheme } from "../theme/layout/wrapTheme";
import type { PxTheme } from "../theme/size/pxTheme";
import type { PyTheme } from "../theme/size/pyTheme";
import type { BorderTheme } from "../theme/layout/borderTheme";
import type { RingTheme } from "../theme/layout/ringTheme";
import type { RadiusTheme } from "../theme/layout/radiusTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import type { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import type { BreakpointTheme } from "../theme/size/breakpointTheme";

export interface SectionTheme extends BaseComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
    breakpoint: BreakpointTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
}
