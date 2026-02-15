import type { BaseComponentTheme, DefaultSizedLayoutClassMappers } from "../theme/common";
import type { BlurClassMapper, OverlayBackgroundClassMapper, PointerEventsClassMapper, RingClassMapper } from "../theme/layout";
import type { ShadowAppearanceClassMapper, SimpleConsumerClassMapper } from "../theme/appearance";

export interface ModalOverlayTheme extends BaseComponentTheme {
  layout: DefaultSizedLayoutClassMappers & {
    blur: BlurClassMapper;
    overlayBackground: OverlayBackgroundClassMapper;
    pointerEvents: PointerEventsClassMapper;
    ring: RingClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
  appearance: {
    ring: SimpleConsumerClassMapper;
  };
}
