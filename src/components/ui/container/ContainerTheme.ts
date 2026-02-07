import type { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common/ComponentTheme";
import type { GapClassMapper } from "../theme/size/gapClassMapper";
import type { PxClassMapper } from "../theme/size/pxClassMapper";
import type { PyClassMapper } from "../theme/size/pyClassMapper";
import type { SizeClassMapper } from "../theme/size/sizeClassMapper";
import type { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import type { BorderClassMapper } from "../theme/layout/borderClassMapper";
import type { RingClassMapper } from "../theme/layout/ringClassMapper";
import type { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import type { WidthClassMapper } from "../theme/layout/widthClassMapper";
import type { HeightClassMapper } from "../theme/layout/heightClassMapper";
import type { BreakpointClassMapper } from "../theme/size/breakpointClassMapper";
import type { TextAlignClassMapper } from "../theme/typography/textAlignClassMapper";

export interface ContainerTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
    maxWidth: SizeClassMapper;
    breakpoint: BreakpointClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    wrap: WrapClassMapper;
    direction: DirectionClassMapper;
    border: BorderClassMapper;
    ring: RingClassMapper;
    radius: RadiusClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
  typography: {
    textAlign: TextAlignClassMapper;
  };
}
