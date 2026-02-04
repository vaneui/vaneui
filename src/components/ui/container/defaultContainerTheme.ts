import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { ContainerProps } from "./ContainerProps";
import type { ContainerTheme } from "./ContainerTheme";
import { CONTAINER_CATEGORIES } from "../props/categoryBuilders";
import { layoutSubThemes } from "../theme/common/layoutSubThemes";
import { containerDefaults } from "./containerDefaults";
import { SizeClassMapper } from "../theme/size/sizeClassMapper";

export const defaultContainerTheme = new ComponentTheme<ContainerProps, ContainerTheme>(
  "div",
  "vane-container mx-auto w-full",
  {
    ...layoutSubThemes,
    size: {
      ...layoutSubThemes.size,
      maxWidth: new SizeClassMapper({xs: 'max-w-3xl', sm: 'max-w-4xl', md: 'max-w-5xl', lg: 'max-w-6xl', xl: 'max-w-7xl'}),
    },
  },
  containerDefaults,
  CONTAINER_CATEGORIES,
  undefined,
  'layout'
);
