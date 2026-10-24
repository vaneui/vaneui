import { UI_ELEMENT_CATEGORIES, INDICATOR } from "../props/categoryBuilders";

/** NavLink root categories — truncation moved to NavLink label sub-theme */
export const NAV_LINK_CATEGORIES = [...UI_ELEMENT_CATEGORIES, ...INDICATOR] as const;
