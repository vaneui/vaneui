import { CHECKBOX_CATEGORIES } from "../checkbox/CheckboxCategories";
import { CHECKBOX_CHECK_CATEGORIES } from "../checkbox/CheckboxCheckCategories";
import { COL_CATEGORIES } from "../col/ColCategories";

/** Radio is the same box control as Checkbox (minus indeterminate, which is not a category). */
export const RADIO_CATEGORIES = CHECKBOX_CATEGORIES;

/** The dot is a decorative overlay like Checkbox's check mark — layout categories only. */
export const RADIO_DOT_CATEGORIES = CHECKBOX_CHECK_CATEGORIES;

/** RadioGroup is a flex column container, so it takes Col's category set. */
export const RADIO_GROUP_CATEGORIES = COL_CATEGORIES;
