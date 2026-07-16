import { ComponentTheme, defaultLayoutClassMappers, textAppearance } from "../theme/common";
import type { CaptionProps } from "./CaptionProps";
import type { CaptionTheme } from "./CaptionTheme";
import { CAPTION_CATEGORIES } from "./CaptionCategories";
import { captionDefaults } from "./captionDefaults";
import { FontSizeClassMapper } from "../theme/size";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultCaptionTheme = new ComponentTheme<CaptionProps, CaptionTheme>(
  "caption",
  "vane-table-caption",
  {
    size: {
      fontSize: new FontSizeClassMapper(),
    },
    appearance: {
      text: textAppearance,
    },
    layout: defaultLayoutClassMappers,
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  captionDefaults,
  CAPTION_CATEGORIES,
  undefined,
  'layout'
);
