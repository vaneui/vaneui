import type { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import type { BaseComponentTheme, DefaultLayoutThemes } from "../theme/common/ComponentTheme";
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

export interface ContainerTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
    maxWidth: SizeClassMapper;
  };
  layout: DefaultLayoutThemes & {
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
  }
}
