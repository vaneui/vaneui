import { forwardRef, useCallback, useMemo, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import type { SelectProps } from "./SelectProps";
import type { SelectChevronProps } from "./SelectChevronProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useThemedFieldControlProps } from "../field/FieldContext";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { defaultSelectTheme } from "./defaultSelectTheme";
import { defaultSelectChevronTheme } from "./defaultSelectChevronTheme";
import { defaultSelectWrapperTheme } from "./defaultSelectWrapperTheme";

// Inline style that sizes the control or places it in its parent's layout. Like the width props,
// it belongs on the wrapper: on the field a width narrowed the <select> inside the full-width
// wrapper, and the chevron stayed at the wrapper's far edge. The rest of the style stays on the field.
const WRAPPER_STYLE_KEYS = new Set<string>([
  'width', 'minWidth', 'maxWidth', 'inlineSize', 'minInlineSize', 'maxInlineSize',
  'flex', 'flexBasis', 'flexGrow', 'flexShrink', 'alignSelf', 'justifySelf', 'order',
  'gridArea', 'gridColumn', 'gridColumnStart', 'gridColumnEnd', 'gridRow', 'gridRowStart', 'gridRowEnd',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'marginInline', 'marginInlineStart', 'marginInlineEnd', 'marginBlock', 'marginBlockStart', 'marginBlockEnd',
]);

function splitStyle(style: CSSProperties | undefined): { wrapperStyle?: CSSProperties; fieldStyle?: CSSProperties } {
  if (!style) return {};
  const wrapperStyle: Record<string, unknown> = {};
  const fieldStyle: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(style)) {
    (WRAPPER_STYLE_KEYS.has(key) ? wrapperStyle : fieldStyle)[key] = value;
  }
  return {
    wrapperStyle: Object.keys(wrapperStyle).length > 0 ? wrapperStyle : undefined,
    fieldStyle: Object.keys(fieldStyle).length > 0 ? fieldStyle : undefined,
  };
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(rawProps, ref) {
    const props = useThemedFieldControlProps(rawProps);
    const theme = useTheme();
    const selectThemeBase = theme?.select ?? defaultSelectTheme;
    const chevronTheme = theme?.selectChevron ?? defaultSelectChevronTheme;
    const wrapperTheme = theme?.selectWrapper ?? defaultSelectWrapperTheme;
    // inside a Label, the Label's size becomes this control's size default; an explicit prop wins
    const labelSize = useLabelSizeContext();
    const selectTheme = useMemo(
      () => withLabelSizeDefault(selectThemeBase, labelSize),
      [selectThemeBase, labelSize]
    );
    // chevron tracks the field's RESOLVED size (explicit prop > Label size > theme defaults)
    const fieldSize = pickFirstTruthyKeyByCategory(
      props as unknown as Record<string, unknown>,
      selectTheme.defaults as unknown as Record<string, unknown>,
      'size'
    );
    const chevronSize = (fieldSize ? { [fieldSize]: true } : {}) as Partial<SelectChevronProps>;

    // The dropdown is a pseudo-element, so it cannot take the shape prop's class; publish the
    // resolved shape as an attribute the picker rules can read.
    const fieldShape = pickFirstTruthyKeyByCategory(
      props as unknown as Record<string, unknown>,
      selectTheme.defaults as unknown as Record<string, unknown>,
      'shape'
    );

    // Width, visibility and className size and place the whole control, so they belong on the
    // wrapper: left on the field they would narrow it while the wrapper stayed full width, and
    // the absolutely-positioned chevron would detach from the field's edge. The same goes for
    // the sizing part of `style` (see WRAPPER_STYLE_KEYS).
    const {
      className, style,
      wFull, wFit, wAuto, wScreen,
      mobileWFull, tabletWFull, desktopWFull,
      mobileHide, tabletHide, desktopHide,
      mobileShow, tabletShow, desktopShow,
      noShrink,
      disabled,
      onMouseDown, onKeyDown,
      placeholder, children,
      ...rest
    } = props;

    // <select> has no placeholder attribute: the prompt is a first empty option, disabled so it can't be
    // picked again and hidden from the list. An uncontrolled select starts on it instead of the first real option.
    const showPlaceholder = placeholder !== undefined && !rest.multiple;
    const placeholderDefault = showPlaceholder && rest.value === undefined && rest.defaultValue === undefined
      ? { defaultValue: '' }
      : undefined;

    // <select> has no native readOnly, so block opening and keyboard changes (Tab still moves focus)
    const readOnly = (rest as { readOnly?: boolean }).readOnly;
    const handleMouseDown = useCallback((event: MouseEvent<HTMLSelectElement>) => {
      if (readOnly) event.preventDefault();
      onMouseDown?.(event);
    }, [readOnly, onMouseDown]);
    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLSelectElement>) => {
      if (readOnly && event.key !== 'Tab') event.preventDefault();
      onKeyDown?.(event);
    }, [readOnly, onKeyDown]);

    const { wrapperStyle, fieldStyle } = splitStyle(style);

    // disabled stays on the field too, so the native attribute is still emitted
    const fieldProps = { ...placeholderDefault, ...rest, style: fieldStyle, disabled, onMouseDown: handleMouseDown, onKeyDown: handleKeyDown };

    const wrapperProps = {
      className, style: wrapperStyle,
      wFull, wFit, wAuto, wScreen,
      mobileWFull, tabletWFull, desktopWFull,
      mobileHide, tabletHide, desktopHide,
      mobileShow, tabletShow, desktopShow,
      noShrink, // the wrapper is the flex item, so shrink belongs on it
      disabled, // dims the chevron with the field; the field also keeps the native attribute
    };

    // the chevron always shows, so the field is always wrapped and the icon overlays its end edge
    return (
      <ThemedComponent theme={wrapperTheme} {...wrapperProps}>
        <ThemedComponent ref={ref} theme={selectTheme} {...fieldProps} data-shape={fieldShape}>
          {showPlaceholder && <option value="" disabled hidden>{placeholder}</option>}
          {children}
        </ThemedComponent>
        <ThemedComponent theme={chevronTheme} aria-hidden="true" {...chevronSize}>
          {chevronTheme.themes.chevronElement()}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Select.displayName = 'Select';
