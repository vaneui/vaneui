import type { FlexLayoutComponentTheme } from "../theme/common";
import type { BreakpointClassMapper } from "../theme/size";
import type { TextAlignClassMapper } from "../theme/typography";

/** Alert is a flex surface; no cursor or focus ring, since it is never a link. */
export type AlertTheme = FlexLayoutComponentTheme & {
  size: FlexLayoutComponentTheme['size'] & { breakpoint: BreakpointClassMapper };
  typography: { textAlign: TextAlignClassMapper };
};
