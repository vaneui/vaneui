import type {
  BaseComponentTheme,
  DefaultLayoutClassMappers
} from "../theme/common/ComponentTheme";
import type { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import type { BorderClassMapper } from "../theme/layout/borderClassMapper";
import type { RingClassMapper } from "../theme/layout/ringClassMapper";
import type { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import type { CursorClassMapper } from "../theme/layout/cursorClassMapper";
import type { TransitionClassMapper } from "../theme/layout/transitionClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { SizeClassMapper } from "../theme/size/sizeClassMapper";
import type { FontSizeClassMapper } from "../theme/size/fontSizeClassMapper";
import type { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import type { StatusClassMapper } from "../theme/appearance/statusClassMapper";
import type { WidthClassMapper } from "../theme/layout/widthClassMapper";
import type { HeightClassMapper } from "../theme/layout/heightClassMapper";

/** Theme interface for checkbox input element */
export interface CheckboxTheme extends BaseComponentTheme {
  size: {
    size: SizeClassMapper;
    text: FontSizeClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    focusVisible: FocusVisibleClassMapper;
    cursor: CursorClassMapper;
    transition: TransitionClassMapper;
    radius: RadiusClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
  };
  appearance: {
    accent: SimpleConsumerClassMapper;
    background: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
    check: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
    status: StatusClassMapper;
  };
}
