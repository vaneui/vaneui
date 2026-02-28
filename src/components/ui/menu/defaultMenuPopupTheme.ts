import { defaultPopupTheme } from "../popup/defaultPopupTheme";
import { menuPopupDefaults } from "./menuPopupDefaults";

/** Menu popup: reuses the regular popup theme with menu-specific defaults (no gap, no ring) */
export const defaultMenuPopupTheme = defaultPopupTheme.withDefaults(menuPopupDefaults);
