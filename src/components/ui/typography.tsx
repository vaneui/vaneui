import React, { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { textSizeClasses } from "./props/typographyValues";

export const PageTitle = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "h1", "text-balance tracking-tighter")
    .withTypography({
      xs: "text-3xl max-lg:text-2xl max-md:text-xl",
      sm: "text-4xl max-lg:text-3xl max-md:text-2xl",
      md: "text-5xl max-lg:text-4xl max-md:text-3xl",
      lg: "text-6xl max-lg:text-5xl max-md:text-4xl",
      xl: "text-7xl max-lg:text-6xl max-md:text-5xl",
    }, {
      fontWeight: {semibold: true},
      textAppearance: {default: true}
    })
    .build();

export const SectionTitle = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "h2", "text-balance")
    .withTypography({
      xs: "text-2xl max-lg:text-xl max-md:text-lg",
      sm: "text-3xl max-lg:text-2xl max-md:text-xl",
      md: "text-4xl max-lg:text-3xl max-md:text-2xl",
      lg: "text-5xl max-lg:text-4xl max-md:text-3xl",
      xl: "text-6xl max-lg:text-5xl max-md:text-4xl",
    }, {
      fontWeight: {semibold: true},
      textAppearance: {default: true}
    })
    .build();

export const Title = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "h3", "text-balance")
    .withTypography({
      xs: "text-lg",
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
      xl: "text-4xl",
    }, {
      fontWeight: {semibold: true},
      textAppearance: {default: true}
    })
    .build();

export const Text = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "p", "p-0 m-0")
    .withTypography(textSizeClasses, {
      textAppearance: {secondary: true},
      textSize: {md: true}
    })
    .build();

export const Link = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "a", "hover:underline")
    .withTypography(textSizeClasses, {
      textAppearance: {link: true},
      textSize: {md: true}
    })
    .build();

export const ListItem = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "li", "")
    .withTypography(textSizeClasses, {
      textSize: {md: true},
      textAppearance: {default: true}
    })
    .build();

export const List = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "ul", "list-disc list-inside")
    .withTypography(textSizeClasses, {
      textSize: {md: true},
      textAppearance: {default: true}
    })
    .build();
