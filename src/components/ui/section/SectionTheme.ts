import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common/ComponentTheme";
import type { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import type { GapClassMapper } from "../theme/size/gapClassMapper";
import type { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import type { PxClassMapper } from "../theme/size/pxClassMapper";
import type { PyClassMapper } from "../theme/size/pyClassMapper";
import type { BorderClassMapper } from "../theme/layout/borderClassMapper";
import type { RingClassMapper } from "../theme/layout/ringClassMapper";
import type { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import type { BreakpointClassMapper } from "../theme/size/breakpointClassMapper";

export interface SectionTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
    breakpoint: BreakpointClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    wrap: WrapClassMapper;
    direction: DirectionClassMapper;
    border: BorderClassMapper;
    ring: RingClassMapper;
    radius: RadiusClassMapper;
  };
}
