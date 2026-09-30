import { TYPOGRAPHY_CATEGORIES } from "../common";

/** Link-specific categories. Adds `focusVisible` (a focus ring on the rendered `<a>`)
 * and `disabled` (the dimmed disabled look). Other typography components (Text, Title, …)
 * are not focusable by default, so they keep the slimmer TYPOGRAPHY_CATEGORIES. */
export const LINK_CATEGORIES = [...TYPOGRAPHY_CATEGORIES, 'focusVisible', 'disabled'] as const;
