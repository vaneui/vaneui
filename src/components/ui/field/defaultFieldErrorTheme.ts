import { ComponentTheme } from "../theme/common";
import type { TypographyProps, TextTheme } from "../typography/common";
import { TYPOGRAPHY_CATEGORIES } from "../typography/common";
import { defaultTextTheme } from "../typography/text/defaultTextTheme";
import { fieldErrorDefaults } from "./fieldErrorDefaults";

/** Field's error text: Text's classes under its own class, so a filled surface can re-point its color. */
export const defaultFieldErrorTheme = new ComponentTheme<TypographyProps, TextTheme>(
  defaultTextTheme.tag,
  `${defaultTextTheme.base} vane-field-error`,
  defaultTextTheme.themes,
  fieldErrorDefaults,
  TYPOGRAPHY_CATEGORIES,
  (props: TypographyProps) => props.href ? "a" : "p",
  defaultTextTheme.vaneType
);
