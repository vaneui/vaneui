import { forwardRef, useContext, useId, useMemo } from 'react';
import type { RadioGroupProps } from './RadioGroupProps';
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { RadioGroupContext } from "./RadioGroupContext";
import { FieldControlContext, useFieldGroupProps } from "../field/FieldContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { defaultRadioGroupTheme } from "./defaultRadioGroupTheme";

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(rawProps, ref) {
    // the group takes the Field wiring itself, so its Radios must not each claim the id
    const props = useFieldGroupProps(rawProps);
    // the group resets the Field context for its Radios, so it forwards the Field's control state itself
    const field = useContext(FieldControlContext);
    const theme = useTheme();
    // name/value/defaultValue/onChange and the control state drive the child Radios, not the group element
    const { name, value, defaultValue, onChange, disabled: ownDisabled, readOnly: ownReadOnly, required: ownRequired, invalid: ownInvalid, ...rest } = props;
    // the group's own state wins over the enclosing Field's
    const disabled = ownDisabled ?? field?.disabled;
    const readOnly = ownReadOnly ?? field?.readOnly;
    const required = ownRequired ?? field?.required;
    const invalid = ownInvalid ?? (field?.invalid || undefined);
    // radios are only mutually exclusive when they share a name, so fall back to a generated one
    const generatedName = useId();
    // only an explicit group size cascades — the group's own default must not outrank a nearer Label
    const size = pickFirstTruthyKeyByCategory(props as Record<string, unknown>, {}, 'size');
    const group = useMemo(
      () => ({ name: name ?? generatedName, value, defaultValue, onChange, size, disabled, readOnly, required, invalid }),
      [name, generatedName, value, defaultValue, onChange, size, disabled, readOnly, required, invalid]
    );

    return (
      <RadioGroupContext.Provider value={group}>
        <FieldControlContext.Provider value={null}>
          <ThemedComponent
            theme={theme?.radioGroup ?? defaultRadioGroupTheme}
            ref={ref}
            role="radiogroup"
            // radiogroup supports these states in ARIA 1.2; the radios carry the native attributes
            aria-disabled={disabled || undefined}
            aria-readonly={readOnly || undefined}
            aria-required={required || undefined}
            aria-invalid={invalid || undefined}
            {...rest}
          />
        </FieldControlContext.Provider>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
