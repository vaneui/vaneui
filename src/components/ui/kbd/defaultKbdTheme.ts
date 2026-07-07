import { ComponentTheme, interactiveClassMappers } from "../theme/common";
import type { KbdProps } from "./KbdProps";
import type { KbdTheme } from "./KbdTheme";
import { CODE_CATEGORIES } from "../props/categoryBuilders";
import { PerSideBorderClassMapper } from "../theme/layout/perSideBorderClassMapper";
import { kbdDefaults } from "./kbdDefaults";

// Kbd is a normal `border` component (prop-driven, `noBorder`-toggleable, color
// from the appearance system) — it just swaps in the per-side border-width
// mapper so its `.vane-kbd { --bw-b }` override thickens the bottom into the
// keycap. Every other side tracks --bw like any other bordered component.
const kbdClassMappers = {
  ...interactiveClassMappers,
  layout: { ...interactiveClassMappers.layout, border: new PerSideBorderClassMapper() },
};

export const defaultKbdTheme = new ComponentTheme<KbdProps, KbdTheme>(
  "kbd",
  "vane-kbd",
  kbdClassMappers,
  kbdDefaults,
  CODE_CATEGORIES,
  undefined,
  'ui'
);
