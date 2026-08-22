import { ComponentTheme } from "../theme/common";
import type { TypographyProps, TextTheme } from "../typography/common";
import { TYPOGRAPHY_CATEGORIES } from "../typography/common";
import { defaultTextTheme } from "../typography/text/defaultTextTheme";
import { fieldDescriptionDefaults } from "./fieldDescriptionDefaults";

/** Field's help text: Text's classes under its own class, so a filled surface can re-point its color. */
export const defaultFieldDescriptionTheme = new ComponentTheme<TypographyProps, TextTheme>(
  defaultTextTheme.tag,
  `${defaultTextTheme.base} vane-field-description`,
  defaultTextTheme.themes,
  fieldDescriptionDefaults,
  TYPOGRAPHY_CATEGORIES,
  (props: TypographyProps) => props.href ? "a" : "p",
  defaultTextTheme.vaneType
);
