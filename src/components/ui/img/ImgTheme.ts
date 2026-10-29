import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { BorderClassMapper, RingClassMapper, FocusVisibleClassMapper, RadiusClassMapper, ObjectFitClassMapper, ShrinkClassMapper } from "../theme/layout";
import type { SimpleConsumerClassMapper, ShadowAppearanceClassMapper } from "../theme/appearance";

export interface ImgTheme extends BaseComponentTheme {
  layout: DefaultSizedLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    focusVisible: FocusVisibleClassMapper;
    radius: RadiusClassMapper;
    objectFit: ObjectFitClassMapper;
    shrink: ShrinkClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
}
