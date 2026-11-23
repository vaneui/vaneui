import { forwardRef, useMemo, useRef } from 'react';
import type { InputProps } from "./InputProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useThemedFieldControlProps } from "../field/FieldContext";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { defaultInputTheme } from "./defaultInputTheme";
import { defaultInputErrorIconTheme } from "./defaultInputErrorIconTheme";
import { defaultInputWrapperTheme } from "./defaultInputWrapperTheme";
import { defaultInputSectionTheme } from "./defaultInputSectionTheme";
import { hasSection, splitWrapperProps, useSectionWidths } from "./fieldSections";
import type { InputWrapperProps } from "./InputWrapperProps";
import type { InputSectionProps } from "./InputSectionProps";

// The wrapper's state while the input is valid and has no section — a state key, not a visual
// default: its themed box (inputWrapperDefaults) only exists to position the overlays.
const BOXLESS_WRAPPER: Partial<InputWrapperProps> = { contents: true };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(rawProps, ref) {
    const { startSection, endSection, ...props } = useThemedFieldControlProps(rawProps);
    const theme = useTheme();
    const inputThemeBase = theme?.input ?? defaultInputTheme;
    const errorIconThemeBase = theme?.inputErrorIcon ?? defaultInputErrorIconTheme;
    const wrapperTheme = theme?.inputWrapper ?? defaultInputWrapperTheme;
    const sectionTheme = theme?.inputSection ?? defaultInputSectionTheme;
    // inside a Label, the Label's resolved size becomes this input's size
    // default; explicit size props on the Input still win at extraction
    const labelSize = useLabelSizeContext();
    const inputTheme = useMemo(
      () => withLabelSizeDefault(inputThemeBase, labelSize),
      [inputThemeBase, labelSize]
    );
    // the icon resolves the same size as the input (explicit prop > Label size >
    // default), so its --fs/--px scale tracks the field
    const errorIconTheme = useMemo(
      () => withLabelSizeDefault(errorIconThemeBase, labelSize),
      [errorIconThemeBase, labelSize]
    );

    const hasStart = hasSection(startSection);
    const hasEnd = hasSection(endSection);
    const sectioned = hasStart || hasEnd;
    const wrapperRef = useRef<HTMLElement | null>(null);
    const startRef = useRef<HTMLElement | null>(null);
    const endRef = useRef<HTMLElement | null>(null);
    useSectionWidths(wrapperRef, startRef, endRef, hasStart, hasEnd);

    // The error cue is a real themed element, not a CSS background-image, so the
    // <input> (a void element that can't hold children) sits in a span and the icon
    // overlays its trailing edge — see defaultInputErrorIconTheme.
    //
    // The span is rendered in EVERY state so the <input> keeps its place in the tree:
    // wrapping it only while invalid made React replace the node whenever `invalid`
    // flipped, which dropped focus and the typed text during live validation. The
    // section slots render null when empty, so the <input> stays the second child
    // whichever sections come and go. While valid with no section there is nothing
    // to position, so the span resolves to the display category's `contents` key
    // instead of its themed box: it generates no box and the <input> lays out as a
    // direct child of the span's parent, with every prop (className, style, width,
    // hide, ref) on the <input>. With a section, the span is the box the sections sit
    // in, so it takes the props that size and place the control, like Select's wrapper.
    const invalid = !!props.invalid;
    const { xs, sm, md, lg, xl } = props;
    const iconSize = { xs, sm, md, lg, xl };
    const fieldSize = pickFirstTruthyKeyByCategory(
      props as unknown as Record<string, unknown>,
      inputTheme.defaults as unknown as Record<string, unknown>,
      'size'
    );
    const sectionSize = (fieldSize ? { [fieldSize]: true } : {}) as Partial<InputSectionProps>;

    const { wrapperProps, fieldProps } = sectioned
      ? splitWrapperProps(props as unknown as Record<string, unknown>)
      : { wrapperProps: invalid ? {} : BOXLESS_WRAPPER, fieldProps: props };

    return (
      <ThemedComponent
        ref={wrapperRef}
        theme={wrapperTheme}
        {...wrapperProps}
        data-start-section={hasStart ? '' : undefined}
        data-end-section={hasEnd ? '' : undefined}
      >
        {hasStart ? (
          <ThemedComponent ref={startRef} theme={sectionTheme} data-side="start" {...sectionSize}>
            {startSection}
          </ThemedComponent>
        ) : null}
        <ThemedComponent ref={ref} theme={inputTheme} {...fieldProps} />
        {invalid ? (
          <ThemedComponent theme={errorIconTheme} aria-hidden="true" {...iconSize}>
            {errorIconTheme.themes.errorIconElement()}
          </ThemedComponent>
        ) : null}
        {hasEnd ? (
          <ThemedComponent ref={endRef} theme={sectionTheme} data-side="end" {...sectionSize}>
            {endSection}
          </ThemedComponent>
        ) : null}
      </ThemedComponent>
    );
  }
);

Input.displayName = 'Input';
