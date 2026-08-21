import { ComponentTheme } from "../theme/common";
import type { ColProps } from "../col/ColProps";
import type { ColTheme } from "../col/ColTheme";
import { COL_CATEGORIES } from "../col/ColCategories";
import { defaultColTheme } from "../col/defaultColTheme";
import { fieldControlRowDefaults } from "./fieldControlRowDefaults";

/** Field's inline control row: Col's classes under Field's own base class and gap curve. */
export const defaultFieldControlRowTheme = new ComponentTheme<ColProps, ColTheme>(
  defaultColTheme.tag,
  "vane-field-control-row",
  defaultColTheme.themes,
  fieldControlRowDefaults,
  COL_CATEGORIES,
  (props: ColProps) => props.href ? "a" : "div",
  defaultColTheme.vaneType
);
