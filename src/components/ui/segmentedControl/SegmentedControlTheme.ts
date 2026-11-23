import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { SimpleConsumerClassMapper, DisabledVisualClassMapper } from "../theme/appearance";
import type { FontSizeClassMapper, GapClassMapper, LineHeightClassMapper, MarginClassMapper, PxClassMapper, PyClassMapper } from "../theme/size";
import type { CursorClassMapper, RadiusClassMapper, TransitionClassMapper, WhitespaceClassMapper, WidthClassMapper } from "../theme/layout";
import type { FontFamilyClassMapper, FontStyleClassMapper, FontWeightClassMapper, TextDecorationClassMapper, TextTransformClassMapper } from "../theme/typography";

/** Theme interface for the SegmentedControl track */
export interface SegmentedControlTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    margin: MarginClassMapper;
  };
  appearance: {
    background: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    width: WidthClassMapper;
    radius: RadiusClassMapper;
  };
}

/** Theme interface for one segment */
export interface SegmentedControlItemTheme extends BaseComponentTheme {
  size: {
    px: PxClassMapper;
    py: PyClassMapper;
    gap: GapClassMapper;
    text: FontSizeClassMapper;
    lineHeight: LineHeightClassMapper;
  };
  appearance: {
    disabled: DisabledVisualClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    radius: RadiusClassMapper;
    cursor: CursorClassMapper;
    transition: TransitionClassMapper;
    whitespace: WhitespaceClassMapper;
  };
  typography: {
    fontFamily: FontFamilyClassMapper;
    fontWeight: FontWeightClassMapper;
    fontStyle: FontStyleClassMapper;
    textDecoration: TextDecorationClassMapper;
    textTransform: TextTransformClassMapper;
  };
}
