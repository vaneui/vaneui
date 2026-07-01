import { defaultSizedLayoutClassMappers, defaultTypographyClassMappers } from "./ComponentTheme";
import type { TextTheme } from "../../typography/common/TypographyTheme";
import { FontSizeClassMapper } from "../size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../size/lineHeightClassMapper";
import { LetterSpacingClassMapper } from "../typography/letterSpacingClassMapper";
import { MarginClassMapper } from "../size/marginClassMapper";
import { CursorClassMapper } from "../layout/cursorClassMapper";
import { textAppearance } from "./appearanceClassMappers";

// Typography components are background-less by design; no bgAppearance, no `transparent` category.
// CursorClassMapper enables `<Text cursorPointer>` for clickable inline text.
//
// Typed as concrete TextTheme (not DeepPartial) so derived themes (Link, List,
// ListItem) can compose over it — `{ ...typographyClassMappers, <deltas> }` —
// with every group and mapper guaranteed present. Composition is enforced by
// typographyMapperComposition.test.ts: hand-rebuilding these mappers in a
// component theme silently detaches it from future shared-collection changes.
export const typographyClassMappers: TextTheme = {
  size: {
    text: new FontSizeClassMapper(),
    lineHeight: new LineHeightClassMapper(),
    letterSpacing: new LetterSpacingClassMapper(),
    margin: new MarginClassMapper(),
  },
  appearance: {
    text: textAppearance,
  },
  typography: defaultTypographyClassMappers,
  layout: {
    ...defaultSizedLayoutClassMappers,
    cursor: new CursorClassMapper(),
  },
};
