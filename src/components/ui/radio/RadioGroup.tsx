import { forwardRef, useId, useMemo } from 'react';
import type { RadioGroupProps } from './RadioGroupProps';
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { RadioGroupContext } from "./RadioGroupContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { defaultRadioGroupTheme } from "./defaultRadioGroupTheme";

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(props, ref) {
    const theme = useTheme();
    // name/value/defaultValue/onChange drive the child Radios, not the group element
    const { name, value, defaultValue, onChange, ...rest } = props;
    // radios are only mutually exclusive when they share a name, so fall back to a generated one
    const generatedName = useId();
    // only an explicit group size cascades — the group's own default must not outrank a nearer Label
    const size = pickFirstTruthyKeyByCategory(props as Record<string, unknown>, {}, 'size');
    const group = useMemo(
      () => ({ name: name ?? generatedName, value, defaultValue, onChange, size }),
      [name, generatedName, value, defaultValue, onChange, size]
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
