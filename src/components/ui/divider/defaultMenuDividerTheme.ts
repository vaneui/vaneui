import { ComponentTheme } from "../theme/common";
import type { DividerProps } from "./DividerProps";
import type { DividerTheme } from "./DividerTheme";
import { defaultDividerTheme } from "./defaultDividerTheme";
import { DIVIDER_CATEGORIES } from "./DividerCategories";

/** Menu divider: reuses the regular divider theme with compact defaults (sm + padding) */
export const defaultMenuDividerTheme = new ComponentTheme<DividerProps, DividerTheme>(
  defaultDividerTheme.tag,
  defaultDividerTheme.base,
  defaultDividerTheme.themes,
  { sm: true, outline: true, inherit: true, padding: true, horizontal: true },
  DIVIDER_CATEGORIES,
  undefined,
  defaultDividerTheme.vaneType
);
