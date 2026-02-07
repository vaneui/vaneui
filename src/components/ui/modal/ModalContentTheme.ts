import type {
  BaseTypographyComponentTheme,
  DefaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { GapClassMapper } from "../theme/size/gapClassMapper";
import type { PxClassMapper } from "../theme/size/pxClassMapper";
import type { PyClassMapper } from "../theme/size/pyClassMapper";
import type { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import type { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import type { BorderClassMapper } from "../theme/layout/borderClassMapper";
import type { RingClassMapper } from "../theme/layout/ringClassMapper";
import type { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { WidthClassMapper } from "../theme/layout/widthClassMapper";
import type { HeightClassMapper } from "../theme/layout/heightClassMapper";

export interface ModalContentTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    radius: RadiusClassMapper;
    direction: DirectionClassMapper;
    border: BorderClassMapper;
    ring: RingClassMapper;
    shadow: ShadowAppearanceClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
  };
}
