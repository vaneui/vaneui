import type { BaseComponentTheme } from "../../theme/common/ComponentTheme";
import type { SizeClassMapper } from "../../theme/size/sizeClassMapper";

export interface LinkIconTheme extends BaseComponentTheme {
  size: {
    height: SizeClassMapper;
  };
}
