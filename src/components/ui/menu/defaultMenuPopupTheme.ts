import { ComponentTheme } from "../theme/common";
import type { PopupProps } from "../popup/PopupProps";
import type { PopupTheme } from "../popup/PopupTheme";
import { defaultPopupTheme } from "../popup/defaultPopupTheme";
import { POPUP_CATEGORIES } from "../popup/PopupCategories";
import { menuPopupDefaults } from "./menuPopupDefaults";

/** Menu popup: reuses the regular popup theme with menu-specific defaults (no gap, no ring) */
export const defaultMenuPopupTheme = new ComponentTheme<PopupProps, PopupTheme>(
  defaultPopupTheme.tag,
  defaultPopupTheme.base,
  defaultPopupTheme.themes,
  menuPopupDefaults,
  POPUP_CATEGORIES,
  undefined,
  defaultPopupTheme.vaneType
);
