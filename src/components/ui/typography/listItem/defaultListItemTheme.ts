import { ComponentTheme, bgAppearance } from "../../theme/common";
import type { TypographyProps } from "../common";
import type { ListItemTheme } from "./ListItemTheme";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { SimpleConsumerClassMapper } from "../../theme/appearance/simpleConsumerClassMapper";
import { textConsumerClass } from "../../classes/appearanceClasses";
import { LIST_CATEGORIES } from "../common";
import { listItemDefaults } from "./listItemDefaults";

/** ListItem theme — composed over the shared `typographyClassMappers`
 *  collection so changes to the shared collection automatically reach
 *  ListItem. Includes `bgAppearance` so `<ListItem danger filled>` produces a
 *  colored background and `<ListItem transparent>` toggles it off. */
export const defaultListItemTheme: ComponentTheme<TypographyProps, ListItemTheme> = new ComponentTheme<TypographyProps, ListItemTheme>(
  "li",
  "vane-list-item [&[data-has-icon='true']]:list-none",
  {
    size: {
      text: typographyClassMappers.size.text,
      lineHeight: typographyClassMappers.size.lineHeight,
      // delta: the shared `letterSpacing` mapper is deliberately NOT inherited —
      // `letterSpacing` is not in LIST_CATEGORIES, and LetterSpacingClassMapper
      // emits a default `tracking-(--ls)` class even when the prop is absent,
      // which would change every ListItem's class output.
    },
    appearance: {
      ...typographyClassMappers.appearance,
      // delta: list items support `filled`/`transparent` backgrounds, unlike background-less typography
      background: bgAppearance,
      // delta: `alwaysOutput` because listItemDefaults has no appearance default
      // (items inherit color from the parent List) — the text consumer class must
      // still be emitted so the <li> stays bound to the cascading --text-color
      text: new SimpleConsumerClassMapper({ base: textConsumerClass, alwaysOutput: true }, 'text'),
    },
    typography: typographyClassMappers.typography,
    // whole group inherited by reference. This also FIXES a former silent gap:
    // LIST_CATEGORIES registers `width`/`height`, but the old unsized layout
    // collection had no mappers for them, so `<ListItem wFull>` was a no-op.
    // The shared group's `cursor` mapper stays inert (`cursor` is not in LIST_CATEGORIES).
    layout: typographyClassMappers.layout,
  },
  listItemDefaults,
  LIST_CATEGORIES,
  undefined,
  'ui'
);

/** Alias for backward compatibility */
export const listItemTheme = defaultListItemTheme;
