import type {
  BaseComponentTheme,
  DefaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { BlurClassMapper } from "../theme/layout/blurClassMapper";
import type { PointerEventsClassMapper } from "../theme/layout/pointerEventsClassMapper";
import type { RingClassMapper } from "../theme/layout/ringClassMapper";
import type { WidthClassMapper } from "../theme/layout/widthClassMapper";
import type { HeightClassMapper } from "../theme/layout/heightClassMapper";
import type { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";

export interface OverlayTheme extends BaseComponentTheme {
  layout: DefaultLayoutClassMappers & {
    blur: BlurClassMapper;
    pointerEvents: PointerEventsClassMapper;
    ring: RingClassMapper;
    shadow: ShadowAppearanceClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
  };
  appearance: {
    ring: SimpleConsumerClassMapper;
  };
}
