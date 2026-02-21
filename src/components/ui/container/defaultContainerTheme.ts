import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { ContainerProps } from "./ContainerProps";
import type { ContainerTheme } from "./ContainerTheme";
import { CONTAINER_CATEGORIES } from "../props/categoryBuilders";
import { containerDefaults } from "./containerDefaults";
import { SizeClassMapper, BreakpointClassMapper } from "../theme/size";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultContainerTheme = new ComponentTheme<ContainerProps, ContainerTheme>(
  "div",
  "vane-container mx-auto",
  {
    ...layoutClassMappers,
    size: {
      ...layoutClassMappers.size,
      maxWidth: new SizeClassMapper({xs: 'max-w-3xl', sm: 'max-w-4xl', md: 'max-w-5xl', lg: 'max-w-6xl', xl: 'max-w-7xl'}),
      breakpoint: new BreakpointClassMapper(),
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  containerDefaults,
  CONTAINER_CATEGORIES,
  undefined,
  'layout'
);
