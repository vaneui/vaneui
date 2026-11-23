import type { ReactElement } from "react";
import type { BaseComponentTheme, DefaultLayoutClassMappers } from "../theme/common";
import type { SimpleConsumerClassMapper } from "../theme/appearance";
import type { FontSizeClassMapper, GapClassMapper, MarginClassMapper } from "../theme/size";
import type { CursorClassMapper, FocusVisibleClassMapper, ShrinkClassMapper, TransitionClassMapper, WhitespaceClassMapper, WrapClassMapper } from "../theme/layout";
import type { FontFamilyClassMapper, FontWeightClassMapper } from "../theme/typography";

/** Theme interface for the Breadcrumb root (`<nav>`) */
export interface BreadcrumbTheme extends BaseComponentTheme {
  size: {
    text: FontSizeClassMapper;
    margin: MarginClassMapper;
  };
  appearance: {
    text: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers;
  typography: {
    fontFamily: FontFamilyClassMapper;
    fontWeight: FontWeightClassMapper;
  };
}

/** Theme interface for the trail list (`<ol>`) */
export interface BreadcrumbListTheme extends BaseComponentTheme {
  size: {
    gap: GapClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    wrap: WrapClassMapper;
  };
}

/** Theme interface for a trail item's link or current-page text */
export interface BreadcrumbItemTheme extends BaseComponentTheme {
  appearance: {
    focusVisible: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    focusVisible: FocusVisibleClassMapper;
    transition: TransitionClassMapper;
    whitespace: WhitespaceClassMapper;
    cursor: CursorClassMapper;
  };
  typography: {
    fontWeight: FontWeightClassMapper;
  };
}

/** Theme interface for the separator between items */
export interface BreadcrumbSeparatorTheme extends BaseComponentTheme {
  /** The default separator; replace via `themeOverride`, or per Breadcrumb with `separator` */
  separatorElement: () => ReactElement;
  appearance: {
    color: SimpleConsumerClassMapper;
  };
  layout: DefaultLayoutClassMappers & {
    shrink: ShrinkClassMapper;
  };
}
