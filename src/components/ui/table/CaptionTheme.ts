import type { BaseComponentTheme } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { TextAlignClassMapper } from "../theme/typography";

export interface CaptionTheme extends BaseComponentTheme {
  appearance: {
    text: SimpleConsumerClassMapper;
  };
  typography: {
    textAlign: TextAlignClassMapper;
  };
}
