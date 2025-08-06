import {
  BaseComponentTheme,
  ComponentTheme,
  defaultLayoutTheme,
  DefaultLayoutThemes
} from "./common/ComponentTheme";
import { CheckProps } from "../props";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { CHECK_CATEGORIES } from "../props";
import React, { ReactElement } from "react";

export interface CheckTheme extends BaseComponentTheme {
  element: ReactElement;
  layout: DefaultLayoutThemes;
  appearance: {
    color: GenericVariantTheme<AppearanceTheme>;
  };
}

export const defaultCheckTheme = new ComponentTheme<CheckProps, CheckTheme>(
  "span",
  "invisible col-start-1 row-start-1 peer-checked:visible",
  {
    element:
      <svg viewBox="0 0 14 14" fill="none">
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          stroke="currentColor"
        />
      </svg>,
    layout: defaultLayoutTheme,
    appearance: {
      color: GenericVariantTheme.createUIElementTextTheme(),
    }
  },
  {
    default: true,
    filled: true,
  },
  CHECK_CATEGORIES
);