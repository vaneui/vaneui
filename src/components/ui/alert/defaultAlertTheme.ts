import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { AlertProps } from "./AlertProps";
import type { AlertTheme } from "./AlertTheme";
import { ALERT_CATEGORIES } from "./AlertCategories";
import { alertDefaults } from "./alertDefaults";
import { BreakpointClassMapper } from "../theme/size";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultAlertTheme = new ComponentTheme<AlertProps, AlertTheme>(
  "div",
  "vane-alert",
  {
    ...layoutClassMappers,
    size: {
      ...layoutClassMappers.size,
      breakpoint: new BreakpointClassMapper(),
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  alertDefaults,
  ALERT_CATEGORIES,
  undefined,
  'layout'
);
