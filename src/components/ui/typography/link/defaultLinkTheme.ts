import {
  ComponentTheme,
  defaultSizedLayoutClassMappers,
  defaultTypographyClassMappers,
} from "../../theme/common";
import type { TypographyProps } from "../common";
import type { LinkTheme } from "./LinkTheme";
import { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import { LetterSpacingClassMapper } from "../../theme/typography/letterSpacingClassMapper";
import { CursorClassMapper } from "../../theme/layout/cursorClassMapper";
import { LinkVariantClassMapper } from "../../theme/appearance/linkVariantClassMapper";
import { TYPOGRAPHY_CATEGORIES } from "../common";
import { linkDefaults } from "./linkDefaults";

/**
 * Link theme — uses LinkVariantClassMapper for link-specific colors.
 *
 * Link is intentionally background-less (an inline anchor that inherits
 * its container's background). Wires up `LetterSpacingClassMapper` and
 * `CursorClassMapper` so `letterSpacing` and `cursor*` props from
 * `TYPOGRAPHY_CATEGORIES` actually take effect.
 */
export const defaultLinkTheme: ComponentTheme<TypographyProps, LinkTheme> = new ComponentTheme<TypographyProps, LinkTheme>(
  "a",
  "vane-link hover:underline",
  {
    size: {
      text: new FontSizeClassMapper(),
      lineHeight: new LineHeightClassMapper(),
      letterSpacing: new LetterSpacingClassMapper(),
    },
    appearance: {
      text: new LinkVariantClassMapper(),
    },
    typography: defaultTypographyClassMappers,
    layout: {
      ...defaultSizedLayoutClassMappers,
      cursor: new CursorClassMapper(),
    },
  },
  linkDefaults,
  TYPOGRAPHY_CATEGORIES,
  undefined,
  'ui',
  // `link outline` from linkDefaults is Link's semantic identity — a
  // hyperlink should render in the link palette (typically blue)
  // regardless of the ancestor appearance context.
  true,
);

/** Alias for backward compatibility */
export const linkTheme = defaultLinkTheme;
