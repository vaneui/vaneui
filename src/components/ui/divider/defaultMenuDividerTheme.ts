import { defaultDividerTheme } from "./defaultDividerTheme";
import { menuDividerDefaults } from "./menuDividerDefaults";

/** Menu divider: reuses the regular divider theme with compact defaults (paddingY only, no px) */
export const defaultMenuDividerTheme = defaultDividerTheme.withDefaults(menuDividerDefaults);
