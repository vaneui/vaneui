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
  // List is a content-bearing typography component — it should not paint its
  // own background by default. The theme includes `bgAppearance` so that
  // `<List danger filled>` still produces a colored background when explicitly
  // requested; `transparent` (toggle category) suppresses the default bg.
  transparent: true,
};
