import { ComponentTheme } from "../../theme/common";
import type { TypographyProps } from "../common";
import type { LinkTheme } from "./LinkTheme";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { FocusVisibleClassMapper } from "../../theme/layout/focusVisibleClassMapper";
import { LinkVariantClassMapper } from "../../theme/appearance/linkVariantClassMapper";
import { SimpleConsumerClassMapper } from "../../theme/appearance/simpleConsumerClassMapper";
import { DisabledVisualClassMapper } from "../../theme/appearance/disabledClassMapper";
import { LINK_CATEGORIES } from "./LinkCategories";
import { linkDefaults } from "./linkDefaults";

/* Link theme composed over the shared typographyClassMappers (inherits size/typography/layout); only the deltas below diverge. Background-less like all typography. */
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
      // delta: the focus ring takes the link's own color; Link has no appearance, so --focus-color would be unset
      focusVisible: new SimpleConsumerClassMapper({ base: "focus-visible:outline-current", alwaysOutput: true }, 'focusVisible'),
    },
    layout: {
      ...typographyClassMappers.layout,
      // delta: LINK_CATEGORIES adds `focusVisible` so the rendered <a> can show a keyboard focus ring
      focusVisible: new FocusVisibleClassMapper(),
      // delta: a disabled link dims like other disabled controls; after cursor so not-allowed wins over pointer
      disabled: new DisabledVisualClassMapper(),
    },
  },
  linkDefaults,
  LINK_CATEGORIES,
  undefined,
  'ui'
);

/** Alias for backward compatibility */
export const linkTheme = defaultLinkTheme;
