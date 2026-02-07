import type { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import type {
  BaseTypographyComponentTheme,
  DefaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { LineHeightClassMapper } from "../theme/size/lineHeightClassMapper";
import type { GapClassMapper } from "../theme/size/gapClassMapper";
import type { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import type { BorderClassMapper } from "../theme/layout/borderClassMapper";
import type { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import type { PxClassMapper } from "../theme/size/pxClassMapper";
import type { PyClassMapper } from "../theme/size/pyClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { BreakpointClassMapper } from "../theme/size/breakpointClassMapper";
import type { RingClassMapper } from "../theme/layout/ringClassMapper";
import type { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import type { WidthClassMapper } from "../theme/layout/widthClassMapper";
import type { HeightClassMapper } from "../theme/layout/heightClassMapper";
import type { CursorClassMapper } from "../theme/layout/cursorClassMapper";

export interface CardTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    lineHeight: LineHeightClassMapper;
    gap: GapClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    border: BorderClassMapper;
    radius: RadiusClassMapper;
    ring: RingClassMapper;
    wrap: WrapClassMapper;
    direction: DirectionClassMapper;
    breakpoint: BreakpointClassMapper;
    shadow: ShadowAppearanceClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
    cursor: CursorClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
  };
}
