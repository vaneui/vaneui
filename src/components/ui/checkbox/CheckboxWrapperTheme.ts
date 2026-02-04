import type {
  BaseComponentTheme,
  DefaultLayoutThemes
} from "../theme/common/ComponentTheme";
import type { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import type { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import type { SizeClassMapper } from "../theme/size/sizeClassMapper";

/** Theme interface for checkbox wrapper element */
export interface CheckboxWrapperTheme extends BaseComponentTheme {
  size: {
    height: SizeClassMapper;
  };
  layout: DefaultLayoutThemes & {
    focusVisible: FocusVisibleClassMapper;
  };
  appearance: {
    variant: SimpleConsumerClassMapper;
    focusVisible: SimpleConsumerClassMapper;
  };
}
