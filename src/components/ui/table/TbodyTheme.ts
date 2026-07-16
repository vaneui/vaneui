import type { BaseComponentTheme } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";

export interface TbodyTheme extends BaseComponentTheme {
  appearance: {
    background: SimpleConsumerClassMapper;
    text: SimpleConsumerClassMapper;
  };
}
