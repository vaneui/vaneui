import type {
  BaseTypographyComponentTheme,
  DefaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { GapClassMapper } from "../theme/size/gapClassMapper";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import type { FontSizeClassMapper } from "../theme/size/fontSizeClassMapper";
import type { LineHeightClassMapper } from "../theme/size/lineHeightClassMapper";
import type { BorderClassMapper } from "../theme/layout/borderClassMapper";
import type { RingClassMapper } from "../theme/layout/ringClassMapper";
import type { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import type { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import type { CursorClassMapper } from "../theme/layout/cursorClassMapper";

export interface LabelTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
    gap: GapClassMapper;
  };
  appearance: {
    text: SimpleConsumerClassMapper;
    border: SimpleConsumerClassMapper;
    ring: SimpleConsumerClassMapper;
    shadow: ShadowAppearanceClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    border: BorderClassMapper;
    ring: RingClassMapper;
    wrap: WrapClassMapper;
    flexDirection: DirectionClassMapper;
    cursor: CursorClassMapper;
  };
}
