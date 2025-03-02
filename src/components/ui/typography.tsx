import React from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";

export const PageTitle: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "h1")
    .withSizes({
      xs: "text-3xl",
      sm: "text-4xl",
      md: "text-5xl",
      lg: "text-6xl",
      xl: "text-7xl",
    })
    .withTypography({
      fontWeight: { semibold: true }
    })
    .build();

export const SectionTitle: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "h2")
    .withSizes({
      xs: "text-2xl",
      sm: "text-3xl",
      md: "text-4xl",
      lg: "text-5xl",
      xl: "text-6xl",
    })
    .withTypography({
      fontWeight: { semibold: true }
    })
    .build();

export const Title: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "h3")
    .withSizes({
      xs: "text-lg",
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
      xl: "text-4xl",
    })
    .withTypography({
      fontWeight: { semibold: true }
    })
    .build();

export const Text: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "p", "p-0 m-0")
    .withSizes({
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    })
    .withTypography({
      textAppearance: { secondary: true }
    })
    .build();

export const Link: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "a", "hover:underline")
    .withSizes({
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    })
    .withTypography({
      textAppearance: { link: true }
    })
    .build();

export const ListItem: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "li")
    .withSizes({
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    })
    .withTypography({})
    .build();

export const List: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "ul", "list-disc list-inside")
    .withSizes({
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    })
    .withTypography({})
    .build();
