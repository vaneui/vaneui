import { ComponentTheme } from "../theme/common";
import type { DividerProps } from "./DividerProps";
import type { DividerTheme } from "./DividerTheme";
import { defaultDividerTheme } from "./defaultDividerTheme";
import { DIVIDER_CATEGORIES } from "./DividerCategories";
import { menuDividerDefaults } from "./menuDividerDefaults";

/** Menu divider: reuses the regular divider theme with compact defaults (paddingY only, no px) */
export const defaultMenuDividerTheme = new ComponentTheme<DividerProps, DividerTheme>(
  defaultDividerTheme.tag,
  defaultDividerTheme.base,
  defaultDividerTheme.themes,
  menuDividerDefaults,
  DIVIDER_CATEGORIES,
  undefined,
  defaultDividerTheme.vaneType
);
