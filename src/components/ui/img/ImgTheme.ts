import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { BorderClassMapper, RingClassMapper, FocusVisibleClassMapper, RadiusClassMapper, ObjectFitClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";

export interface ImgTheme extends BaseComponentTheme {
  layout: DefaultSizedLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    focusVisible: FocusVisibleClassMapper;
    radius: RadiusClassMapper;
    objectFit: ObjectFitClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
}
