import type { DirectionTheme } from "../theme/layout/directionTheme";
import type {
  BaseTypographyComponentTheme,
  DefaultLayoutThemes,
} from "../theme/common/ComponentTheme";
import type { LineHeightTheme } from "../theme/size/lineHeightTheme";
import type { GapTheme } from "../theme/size/gapTheme";
import type { WrapTheme } from "../theme/layout/wrapTheme";
import type { BorderTheme } from "../theme/layout/borderTheme";
import type { RadiusTheme } from "../theme/layout/radiusTheme";
import type { PxTheme } from "../theme/size/pxTheme";
import type { PyTheme } from "../theme/size/pyTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import type { BreakpointTheme } from "../theme/size/breakpointTheme";
import type { RingTheme } from "../theme/layout/ringTheme";
import type { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import type { WidthTheme } from "../theme/layout/widthTheme";

export interface CardTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    lineHeight: LineHeightTheme;
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    radius: RadiusTheme;
    ring: RingTheme;
    wrap: WrapTheme;
    direction: DirectionTheme;
    breakpoint: BreakpointTheme;
    shadow: ShadowAppearanceTheme;
    width: WidthTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
  };
}
