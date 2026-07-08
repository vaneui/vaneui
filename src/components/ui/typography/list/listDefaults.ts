import type { ListProps } from "./ListProps";

/** Default props for List component */
export const listDefaults: Partial<ListProps> = {
  md: true,
  sans: true,
  normal: true,
  padding: true,
  gap: true,
  disc: true,
  outside: true,
  outline: true,
  inherit: true,
  // List is a content-bearing typography component, so it stays transparent by
  // default and never paints its own background. The theme still wires
  // `bgAppearance`, but this `transparent` default suppresses it: a filled List
  // paints a background only when `transparent` is explicitly cleared
  // (e.g. `<List danger filled transparent={false}>`). To put a surface behind a
  // list, nest it inside a filled Card.
  transparent: true,
};
