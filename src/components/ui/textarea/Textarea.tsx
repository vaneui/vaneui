import type React from 'react';
import { forwardRef, useMemo, useRef } from 'react';
import type { TextareaProps } from "./TextareaProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useThemedFieldControlProps } from "../field/FieldContext";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { useMergedRef } from "../../utils/mergedRef";
import { useIsomorphicLayoutEffect } from "../../utils/isomorphicLayoutEffect";
import { defaultTextareaTheme } from "./defaultTextareaTheme";

/** The class `autosize` emits; read from the DOM, so a theme default turns the fallback on too */
const AUTOSIZE_CLASS = 'field-sizing-content';

let fieldSizingSupport: boolean | undefined;
function supportsFieldSizing(): boolean {
  if (fieldSizingSupport === undefined) {
    fieldSizingSupport = typeof CSS !== 'undefined' && typeof CSS.supports === 'function'
      && CSS.supports('field-sizing', 'content');
  }
  return fieldSizingSupport;
}

/**
 * `autosize` sizes the box with `field-sizing: content`. A browser without it
 * gets the box fitted to its scroll height on every input and render instead.
 */
function useAutosizeFallback(ref: React.RefObject<HTMLTextAreaElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || !el.classList.contains(AUTOSIZE_CLASS) || supportsFieldSizing()) return;
    const fit = () => {
      const borderY = el.offsetHeight - el.clientHeight;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight + borderY}px`;
    };
    fit();
    el.addEventListener('input', fit);
    return () => {
      el.removeEventListener('input', fit);
      el.style.height = '';
    };
  });
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(rawProps, ref) {
    const props = useThemedFieldControlProps(rawProps);
    const theme = useTheme();
    const textareaThemeBase = theme?.textarea ?? defaultTextareaTheme;
    // inside a Label, the Label's resolved size becomes this control's size
    // default; an explicit size prop still wins at extraction
    const labelSize = useLabelSizeContext();
    const textareaTheme = useMemo(
      () => withLabelSizeDefault(textareaThemeBase, labelSize),
      [textareaThemeBase, labelSize]
    );
    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    const mergedRef = useMergedRef(ref, innerRef);
    useAutosizeFallback(innerRef);

    return <ThemedComponent ref={mergedRef} theme={textareaTheme} {...props} />
  }
);

Textarea.displayName = 'Textarea';
