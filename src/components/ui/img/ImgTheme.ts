import type {
  BaseComponentTheme,
  DefaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { BorderClassMapper } from "../theme/layout/borderClassMapper";
import type { RingClassMapper } from "../theme/layout/ringClassMapper";
import type { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import type { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import type { ObjectFitClassMapper } from "../theme/layout/objectFitClassMapper";
import type { WidthClassMapper } from "../theme/layout/widthClassMapper";
import type { HeightClassMapper } from "../theme/layout/heightClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";

export interface ImgTheme extends BaseComponentTheme {
  layout: DefaultLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    focusVisible: FocusVisibleClassMapper;
    radius: RadiusClassMapper;
    objectFit: ObjectFitClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
}
