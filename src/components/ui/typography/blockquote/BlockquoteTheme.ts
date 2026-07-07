import type { TextTheme } from "../common/TypographyTheme";
import type { BorderClassMapper } from "../../theme/layout/borderClassMapper";
import type { SimpleConsumerClassMapper } from "../../theme/appearance/simpleConsumerClassMapper";

/**
 * Blockquote's theme: the typography theme plus a per-side border — width
 * (`layout.border`) and color (`appearance.border`) — so the inline-start
 * accent is driven by the `borderS` prop like any other bordered component.
 */
export interface BlockquoteTheme extends TextTheme {
  layout: TextTheme['layout'] & { border: BorderClassMapper };
  appearance: TextTheme['appearance'] & { border: SimpleConsumerClassMapper };
}
