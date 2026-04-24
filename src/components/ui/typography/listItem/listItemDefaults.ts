import type { TypographyProps } from "../common";

/** Default props for ListItem component.
 *
 * Intentionally omits a `size` default so the ListItem inherits `--fs-unit`,
 * `--gap-unit`, and related CSS variables from its parent List. This mirrors
 * the existing pattern used by Card/Modal sub-components. Pass an explicit
 * size (e.g. `<ListItem xl>`) to opt a single item out of inheritance.
 */
export const listItemDefaults: Partial<TypographyProps> = {
  outline: true,
  sans: true,
};
