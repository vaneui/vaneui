import type {
  BaseComponentTheme,
  DefaultLayoutThemes
} from "../theme/common/ComponentTheme";
import type { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import type { FocusVisibleTheme } from "../theme/layout/focusVisibleTheme";
import type { SizeTheme } from "../theme/size/sizeTheme";

/** Theme interface for checkbox wrapper element */
export interface CheckboxWrapperTheme extends BaseComponentTheme {
  size: {
    height: SizeTheme;
  };
  layout: DefaultLayoutThemes & {
    focusVisible: FocusVisibleTheme;
  };
  appearance: {
    variant: SimpleConsumerTheme;
    focusVisible: SimpleConsumerTheme;
  };
}
