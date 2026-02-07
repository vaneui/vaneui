import type { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common/ComponentTheme";
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
  layout: DefaultSizedLayoutClassMappers & {
    wrap: WrapClassMapper;
    direction: DirectionClassMapper;
    border: BorderClassMapper;
    ring: RingClassMapper;
    radius: RadiusClassMapper;
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
