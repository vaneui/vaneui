import type {
  BaseComponentTheme,
  DefaultSizedLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { BlurClassMapper } from "../theme/layout/blurClassMapper";
import type { PointerEventsClassMapper } from "../theme/layout/pointerEventsClassMapper";
import type { RingClassMapper } from "../theme/layout/ringClassMapper";
import type { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";

export interface OverlayTheme extends BaseComponentTheme {
  layout: DefaultSizedLayoutClassMappers & {
    blur: BlurClassMapper;
    pointerEvents: PointerEventsClassMapper;
    ring: RingClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
  appearance: {
    ring: SimpleConsumerClassMapper;
  };
}
