import { TYPOGRAPHY_CATEGORIES } from "../common";

/** Link-specific categories. Adds `focusVisible` so the focus ring can render
 * on the rendered `<a>` element. Other typography components (Text, Title, …)
 * are not focusable by default, so they keep the slimmer TYPOGRAPHY_CATEGORIES. */
export const LINK_CATEGORIES = [...TYPOGRAPHY_CATEGORIES, 'focusVisible'] as const;
