import { createContext, useContext, type ChangeEventHandler } from 'react';

export interface RadioGroupContextValue {
  /** Name shared by every Radio in the group, so the browser enforces single selection. */
  name?: string;
  /** Selected value when the group is controlled. */
  value?: string;
  /** Initially selected value when the group is uncontrolled. */
  defaultValue?: string;
  /** Called after the Radio's own onChange whenever a Radio in the group changes. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

/* Group state consumed by descendant Radios — a scalar context like LabelSizeContext, so mounting a RadioGroup never forks the theme graph. */
export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}
