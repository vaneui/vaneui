import type React from 'react';
import type { ColProps } from "../col/ColProps";
import type { BaseProps, ControlProps } from "../props";
import type { CleanHTMLProps } from "../props/baseProps";

/** Which control a Field renders: a control kind, or a native input type. */
export type FieldControlType =
  | 'select' | 'textarea' | 'checkbox' | 'switch' | 'radiogroup'
  | 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'
  | 'date' | 'time' | 'datetime-local' | 'month' | 'week'
  | 'file' | 'range' | 'color';

// `size` is dropped: a numeric native size beside the xs-xl scale is a trap
type ControlAttributes =
  Omit<React.InputHTMLAttributes<HTMLInputElement>,
    'className' | 'children' | 'type' | 'size' | 'onChange' | 'onBlur' | 'onFocus'>
  & Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows' | 'cols'>
  & Pick<React.SelectHTMLAttributes<HTMLSelectElement>, 'multiple'>;

type ControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// ColProps also brings onChange/onBlur/onFocus + children/className; handle both like `type` above.
type CleanedColProps = CleanHTMLProps<ColProps, 'type' | 'onChange' | 'onBlur' | 'onFocus'>;

/** Field component props */
export type FieldProps = BaseProps & CleanedColProps & ControlProps & ControlAttributes & {
  /** Label text, associated with the control via htmlFor */
  label?: React.ReactNode;
  /** Help text below the control, linked with aria-describedby */
  description?: React.ReactNode;
  /** Error text below the control; its presence also marks the control invalid */
  error?: React.ReactNode;
  /** Which control to render; omit to pass the control as a child */
  type?: FieldControlType;
  /** Change handler for the rendered control */
  onChange?: React.ChangeEventHandler<ControlElement>;
  /** Blur handler for the rendered control */
  onBlur?: React.FocusEventHandler<ControlElement>;
  /** Focus handler for the rendered control */
  onFocus?: React.FocusEventHandler<ControlElement>;
};
