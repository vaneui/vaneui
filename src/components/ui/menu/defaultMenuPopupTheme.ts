import { ComponentTheme } from "../theme/common";
import type { PopupProps } from "../popup/PopupProps";
import type { PopupTheme } from "../popup/PopupTheme";
import { defaultPopupTheme } from "../popup/defaultPopupTheme";
import { POPUP_CATEGORIES } from "../popup/PopupCategories";

/** Menu popup: reuses the regular popup theme with menu-specific defaults (no gap, no ring) */
export const defaultMenuPopupTheme = new ComponentTheme<PopupProps, PopupTheme>(
  defaultPopupTheme.tag,
  defaultPopupTheme.base,
  defaultPopupTheme.themes,
  { md: true, fixed: true, flex: true, column: true, noGap: true,
    rounded: true, shadow: true, border: true, noRing: true,
    primary: true, outline: true, wFit: true, bottom: true },
  POPUP_CATEGORIES,
  undefined,
  defaultPopupTheme.vaneType
);
