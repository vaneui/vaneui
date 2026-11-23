import { createContext, useContext, type ChangeEventHandler } from 'react';

/** What a segment takes from its SegmentedControl */
export interface SegmentedControlContextValue {
  /** Name shared by the radios, so the browser keeps one selected */
  name: string;
  /** Selected value when the control is controlled */
  value?: string;
  /** Value selected at first when the control is uncontrolled */
  defaultValue?: string;
  /** Called after the segment's own onChange */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Set on the control or by an enclosing Field; a segment's own `disabled` wins */
  disabled?: boolean;
  required?: boolean;
  /** The size, appearance, variant and shape the segments follow, by category; a segment's own prop wins */
  itemKeys: Readonly<Record<string, string>>;
}

export const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

export function useSegmentedControlContext(): SegmentedControlContextValue | null {
  return useContext(SegmentedControlContext);
}
