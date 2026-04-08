import { ComponentTheme, interactiveClassMappers } from "../theme/common";
import type { MarkProps } from "./MarkProps";
import type { MarkTheme } from "./MarkTheme";
import { CODE_CATEGORIES } from "../props/categoryBuilders";
import { markDefaults } from "./markDefaults";

export const defaultMarkTheme = new ComponentTheme<MarkProps, MarkTheme>(
  "mark",
  "vane-mark",
  interactiveClassMappers,
  markDefaults,
  CODE_CATEGORIES,
  undefined,
  'ui'
);
// `warning outline` from markDefaults is Mark's semantic identity — Mark is
// a highlighted yellow span that must render its warning palette regardless
// of ancestor filled context. Setting hasIdentity=true promotes those keys
// through the data-attribute gate in ComponentTheme.getComponentConfig.
defaultMarkTheme.hasIdentity = true;
