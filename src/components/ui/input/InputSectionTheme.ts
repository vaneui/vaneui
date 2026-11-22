import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { FontSizeClassMapper, GapClassMapper } from "../theme/size";
import type { PointerEventsClassMapper, WhitespaceClassMapper } from "../theme/layout";

/** Theme interface for the input section element (startSection / endSection) */
export interface InputSectionTheme extends BaseComponentTheme {
  size: {
    text: FontSizeClassMapper;
    gap: GapClassMapper;
  };
  appearance: {
    color: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    pointerEvents: PointerEventsClassMapper;
    whitespace: WhitespaceClassMapper;
  };
}
