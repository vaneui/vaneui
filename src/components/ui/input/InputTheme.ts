import type { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import type {
  BaseTypographyComponentTheme,
  DefaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { FontSizeClassMapper } from "../theme/size/fontSizeClassMapper";
import type { LineHeightClassMapper } from "../theme/size/lineHeightClassMapper";
import type { GapClassMapper } from "../theme/size/gapClassMapper";
import type { BorderClassMapper } from "../theme/layout/borderClassMapper";
import type { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import type { RingClassMapper } from "../theme/layout/ringClassMapper";
import type { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import type { CursorClassMapper } from "../theme/layout/cursorClassMapper";
import type { PxClassMapper } from "../theme/size/pxClassMapper";
import type { PyClassMapper } from "../theme/size/pyClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import type { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import type { TransitionClassMapper } from "../theme/layout/transitionClassMapper";
import type { WidthClassMapper } from "../theme/layout/widthClassMapper";
import type { HeightClassMapper } from "../theme/layout/heightClassMapper";
import type { StatusClassMapper } from "../theme/appearance/statusClassMapper";

export interface InputTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
    status: StatusClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    focusVisible: FocusVisibleClassMapper;
    cursor: CursorClassMapper;
    radius: RadiusClassMapper;
    wrap: WrapClassMapper;
    flexDirection: DirectionClassMapper;
    transition: TransitionClassMapper;
    width: WidthClassMapper;
    height: HeightClassMapper;
  };
}
