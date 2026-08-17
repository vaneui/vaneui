import { forwardRef, useMemo } from 'react';
import type { SelectProps } from "./SelectProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { defaultSelectTheme } from "./defaultSelectTheme";
import { defaultSelectChevronTheme } from "./defaultSelectChevronTheme";
import { defaultSelectWrapperTheme } from "./defaultSelectWrapperTheme";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    const theme = useTheme();
    const selectThemeBase = theme?.select ?? defaultSelectTheme;
    const chevronThemeBase = theme?.selectChevron ?? defaultSelectChevronTheme;
    const wrapperTheme = theme?.selectWrapper ?? defaultSelectWrapperTheme;
    // inside a Label, the Label's size becomes this control's size default; an explicit prop wins
    const labelSize = useLabelSizeContext();
    const selectTheme = useMemo(
      () => withLabelSizeDefault(selectThemeBase, labelSize),
      [selectThemeBase, labelSize]
    );
    // the chevron resolves the same size as the field, so its --fs/--gap scale tracks it
    const chevronTheme = useMemo(
      () => withLabelSizeDefault(chevronThemeBase, labelSize),
      [chevronThemeBase, labelSize]
    );

    // the chevron always shows, so the field is always wrapped and the icon overlays its end edge
    const { xs, sm, md, lg, xl } = props;
    const chevronSize = { xs, sm, md, lg, xl };

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

    return (
      <ThemedComponent theme={wrapperTheme} {...wrapperProps}>
        <ThemedComponent ref={ref} theme={selectTheme} {...fieldProps} />
        <ThemedComponent theme={chevronTheme} aria-hidden="true" {...chevronSize}>
          {chevronTheme.themes.chevronElement()}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Select.displayName = 'Select';
