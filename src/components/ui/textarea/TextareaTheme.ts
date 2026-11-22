import type { InputTheme } from "../input/InputTheme";
import type { ResizeClassMapper, AutosizeClassMapper } from "../theme/layout";

/** Textarea theme: the input's mappers plus the resize handle and autosize */
export interface TextareaTheme extends InputTheme {
  layout: InputTheme['layout'] & {
    resize: ResizeClassMapper;
    autosize: AutosizeClassMapper;
  };
}
