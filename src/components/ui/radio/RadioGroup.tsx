import { forwardRef, useId, useMemo } from 'react';
import type { RadioGroupProps } from './RadioGroupProps';
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { RadioGroupContext } from "./RadioGroupContext";
import { defaultRadioGroupTheme } from "./defaultRadioGroupTheme";

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(props, ref) {
    const theme = useTheme();
    // name/value/defaultValue/onChange drive the child Radios, not the group element
    const { name, value, defaultValue, onChange, ...rest } = props;
    // radios are only mutually exclusive when they share a name, so fall back to a generated one
    const generatedName = useId();
    const group = useMemo(
      () => ({ name: name ?? generatedName, value, defaultValue, onChange }),
      [name, generatedName, value, defaultValue, onChange]
    );

    return (
      <RadioGroupContext.Provider value={group}>
        <ThemedComponent
          theme={theme?.radioGroup ?? defaultRadioGroupTheme}
          ref={ref}
          role="radiogroup"
          {...rest}
        />
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
