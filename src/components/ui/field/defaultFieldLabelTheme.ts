import { defaultLabelTheme } from "../label/defaultLabelTheme";
import { fieldLabelDefaults } from "./fieldLabelDefaults";

/** Field's label: the Label theme with the stacking dropped, since Field owns the column. */
export const defaultFieldLabelTheme = defaultLabelTheme.withDefaults(fieldLabelDefaults);
