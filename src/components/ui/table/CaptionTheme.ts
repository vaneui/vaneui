import type { BaseComponentTheme } from "../theme/common";
import type { FontSizeClassMapper } from "../theme/size";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper } from "../theme/typography";

export interface CaptionTheme extends BaseComponentTheme {
  size: {
    fontSize: FontSizeClassMapper;
  };
  appearance: {
    text: SimpleConsumerClassMapper;
  };
  typography: {
    textAlign: TextAlignClassMapper;
  };
}
