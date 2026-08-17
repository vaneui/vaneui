import { forwardRef, useMemo } from 'react';
import type { TextareaProps } from "./TextareaProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { defaultTextareaTheme } from "./defaultTextareaTheme";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    const theme = useTheme();
    const textareaThemeBase = theme?.textarea ?? defaultTextareaTheme;
    // inside a Label, the Label's resolved size becomes this control's size
    // default; an explicit size prop still wins at extraction
    const labelSize = useLabelSizeContext();
    const textareaTheme = useMemo(
      () => withLabelSizeDefault(textareaThemeBase, labelSize),
      [textareaThemeBase, labelSize]
    );

    return <ThemedComponent ref={ref} theme={textareaTheme} {...props} />
  }
);

Textarea.displayName = 'Textarea';
