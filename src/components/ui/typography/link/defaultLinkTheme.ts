import { ComponentTheme } from "../../theme/common";
import type { TypographyProps } from "../common";
import type { LinkTheme } from "./LinkTheme";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { FocusVisibleClassMapper } from "../../theme/layout/focusVisibleClassMapper";
import { LinkVariantClassMapper } from "../../theme/appearance/linkVariantClassMapper";
import { LINK_CATEGORIES } from "./LinkCategories";
import { linkDefaults } from "./linkDefaults";

/**
 * Link theme — composed over the shared `typographyClassMappers` collection
 * (size, typography, and layout mappers are inherited from it), so changes to
 * the shared collection automatically reach Link. Only the deltas below
 * diverge, each with a documented reason.
 *
 * Link stays background-less like all typography components (an inline anchor
 * inherits its container's background).
 */
export const defaultLinkTheme: ComponentTheme<TypographyProps, LinkTheme> = new ComponentTheme<TypographyProps, LinkTheme>(
  "a",
  "vane-link hover:underline",
  {
    ...typographyClassMappers,
    appearance: {
      ...typographyClassMappers.appearance,
      // delta: link-variant colors (cascading --link-text / --app-text) instead
      // of the generic text appearance — Link has no data-variant to drive --text-color
      text: new LinkVariantClassMapper(),
    },
    layout: {
      ...typographyClassMappers.layout,
      // delta: LINK_CATEGORIES adds `focusVisible` so the rendered <a> can show a keyboard focus ring
      focusVisible: new FocusVisibleClassMapper(),
    },
  },
  linkDefaults,
  LINK_CATEGORIES,
  undefined,
  'ui'
);

/** Alias for backward compatibility */
export const linkTheme = defaultLinkTheme;
