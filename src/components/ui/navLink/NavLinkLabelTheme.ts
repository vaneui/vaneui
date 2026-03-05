import type { TruncateClassMapper } from "../theme/typography/truncateClassMapper";
import type { OverflowClassMapper } from "../theme/layout/overflowClassMapper";
import type { WhitespaceClassMapper } from "../theme/layout/whitespaceClassMapper";
import type { WidthClassMapper } from "../theme/layout/widthClassMapper";

/** Theme interface for NavLink label element */
export interface NavLinkLabelTheme {
  layout: {
    overflow: OverflowClassMapper;
    whitespace: WhitespaceClassMapper;
    width: WidthClassMapper;
  };
  typography: {
    truncate: TruncateClassMapper;
  };
}
