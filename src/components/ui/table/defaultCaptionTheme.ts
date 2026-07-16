import { ComponentTheme, defaultLayoutClassMappers, textAppearance } from "../theme/common";
import type { CaptionProps } from "./CaptionProps";
import type { CaptionTheme } from "./CaptionTheme";
import { CAPTION_CATEGORIES } from "./CaptionCategories";
import { captionDefaults } from "./captionDefaults";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultCaptionTheme = new ComponentTheme<CaptionProps, CaptionTheme>(
  "caption",
  "vane-table-caption",
  {
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
