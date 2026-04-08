import { UI_ELEMENT_CATEGORIES } from "../props/categoryBuilders";

/**
 * MenuLabel categories — same as `UI_ELEMENT_CATEGORIES` minus `transparent`.
 *
 * MenuLabel intentionally has no `bgAppearance` mapper (see
 * `defaultMenuLabelTheme.ts` and `menu.test.tsx` "should have no
 * background classes"). Since there's no background, `transparent` has no
 * meaning here and is excluded so it can't be passed as an inert prop.
 */
export const MENU_LABEL_CATEGORIES =
  UI_ELEMENT_CATEGORIES.filter(c => c !== 'transparent') as readonly Exclude<typeof UI_ELEMENT_CATEGORIES[number], 'transparent'>[];
