import { forwardRef, useMemo } from 'react';
import type { SelectProps } from "./SelectProps";
import type { SelectChevronProps } from "./SelectChevronProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useFieldControlProps } from "../field/FieldContext";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { defaultSelectTheme } from "./defaultSelectTheme";
import { defaultSelectChevronTheme } from "./defaultSelectChevronTheme";
import { defaultSelectWrapperTheme } from "./defaultSelectWrapperTheme";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(rawProps, ref) {
    const props = useFieldControlProps(rawProps);
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
    // the absolutely-positioned chevron would detach from the field's edge.
    const {
      className,
      wFull, wFit, wAuto, wScreen,
      mobileHide, tabletHide, desktopHide,
      disabled,
      ...rest
    } = props;

    // disabled stays on the field too, so the native attribute is still emitted
    const fieldProps = { ...rest, disabled };

    const wrapperProps = {
      className,
      wFull, wFit, wAuto, wScreen,
      mobileHide, tabletHide, desktopHide,
      disabled, // dims the chevron with the field; the field also keeps the native attribute
    };

    // the chevron always shows, so the field is always wrapped and the icon overlays its end edge
    return (
      <ThemedComponent theme={wrapperTheme} {...wrapperProps}>
        <ThemedComponent ref={ref} theme={selectTheme} {...fieldProps} data-shape={fieldShape} />
        <ThemedComponent theme={chevronTheme} aria-hidden="true" {...chevronSize}>
          {chevronTheme.themes.chevronElement()}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Select.displayName = 'Select';
